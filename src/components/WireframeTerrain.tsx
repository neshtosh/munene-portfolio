import React, { useEffect, useRef } from 'react';

const COLS = 72;
const ROWS = 38;

const perm = new Uint8Array(512);
(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let seed = 20240924;
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
})();

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function grad(hash: number, x: number, y: number) {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return (h & 1 ? -u : u) + (h & 2 ? -v : v);
}

function noise2(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = fade(xf);
  const v = fade(yf);
  const X = xi & 255;
  const Y = yi & 255;
  const aa = perm[perm[X] + Y];
  const ab = perm[perm[X] + Y + 1];
  const ba = perm[perm[X + 1] + Y];
  const bb = perm[perm[X + 1] + Y + 1];
  return lerp(
    lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
    lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
    v
  );
}

function fbm(x: number, y: number) {
  let value = 0;
  let amp = 0.55;
  let freq = 1;
  for (let i = 0; i < 5; i++) {
    value += amp * noise2(x * freq, y * freq);
    freq *= 2.03;
    amp *= 0.5;
  }
  return value;
}

function terrainHeight(x: number, z: number) {
  const n = fbm(x * 0.11 + 1.4, z * 0.13);
  const detail = fbm(x * 0.27 + 6.2, z * 0.22 + 2.1);
  let h = n * 1.35 + detail * 0.28;
  h = Math.sign(h) * Math.pow(Math.abs(h), 0.78);
  const edge = 1 - Math.pow(Math.abs(x) / 9.2, 2.2);
  return h * Math.max(0.15, edge);
}

type Point = { x: number; y: number };

const WireframeTerrain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const points: Point[] = new Array(COLS * ROWS);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      const near = 3.1;
      const far = 15.5;
      const span = 16.5;
      const amplitude = 2.15;
      const focal = h * 1.45;
      const base = h * 0.78;

      for (let row = 0; row < ROWS; row++) {
        const t = row / (ROWS - 1);
        const z = near + t * t * (far - near);
        const jitterScale = (1 - t) * 0.22;
        for (let col = 0; col < COLS; col++) {
          const u = col / (COLS - 1);
          const n = noise2(col * 0.37, row * 0.41);
          const worldX = (u - 0.5) * span;
          const atEdge = col === 0 || col === COLS - 1;
          const lifted = terrainHeight(worldX, z) * amplitude;
          const scale = focal / z;
          points[row * COLS + col] = {
            x: u * w + (atEdge ? 0 : n * jitterScale * w * 0.012),
            y: base - lifted * scale - (1 - t) * h * 0.06,
          };
        }
      }

      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = Math.max(0.55, h / 1100);

      const edge = (x1: number, y1: number, x2: number, y2: number, alpha: number) => {
        ctx.strokeStyle = `rgba(92, 94, 98, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      };

      for (let row = 0; row < ROWS - 1; row++) {
        const depth = row / (ROWS - 1);
        const step = depth > 0.72 ? 3 : depth > 0.45 ? 2 : 1;
        const alpha = 0.22 + (1 - depth) * 0.34;
        for (let col = 0; col < COLS - step; col += step) {
          const a = points[row * COLS + col];
          const b = points[row * COLS + col + step];
          const c = points[(row + 1) * COLS + col];
          const d = points[(row + 1) * COLS + Math.min(COLS - 1, col + step)];
          edge(a.x, a.y, b.x, b.y, alpha);
          edge(a.x, a.y, c.x, c.y, alpha * 0.85);
          edge(a.x, a.y, d.x, d.y, alpha * 0.7);
          edge(b.x, b.y, d.x, d.y, alpha * 0.85);
          edge(c.x, c.y, d.x, d.y, alpha);
        }
      }

      const fade = ctx.createLinearGradient(0, h * 0.42, 0, h);
      fade.addColorStop(0, 'rgba(5, 5, 5, 0)');
      fade.addColorStop(0.55, 'rgba(5, 5, 5, 0.45)');
      fade.addColorStop(1, 'rgba(5, 5, 5, 1)');
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      draw();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full"
      role="img"
      aria-label="Wireframe terrain mesh"
    />
  );
};

export default WireframeTerrain;
