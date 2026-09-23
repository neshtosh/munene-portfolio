import React, { useEffect, useRef } from 'react';

type ScrollHighlightWordsProps = {
  text: string;
  className?: string;
  as?: 'p' | 'h2' | 'h3' | 'div' | 'span';
};

type WordTarget = {
  els: HTMLSpanElement[];
};

const targets = new Set<WordTarget>();
let listening = false;
let rafId = 0;

const flush = () => {
  rafId = 0;
  const vh = window.innerHeight;
  const highlightLine = vh * 0.42;
  const fadeBand = vh * 0.12;

  targets.forEach(({ els }) => {
    for (let i = 0; i < els.length; i += 1) {
      const el = els[i];
      if (!el) continue;

      const { top, height } = el.getBoundingClientRect();
      const wordCenter = top + height / 2;

      let opacity = 0.3;
      if (wordCenter <= highlightLine) {
        opacity = 1;
      } else if (wordCenter < highlightLine + fadeBand) {
        const t = 1 - (wordCenter - highlightLine) / fadeBand;
        opacity = 0.3 + t * 0.7;
      }

      el.style.opacity = String(opacity);
    }
  });
};

const schedule = () => {
  if (rafId) return;
  rafId = window.requestAnimationFrame(flush);
};

const ensureListeners = () => {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
};

const teardownListenersIfEmpty = () => {
  if (targets.size > 0) return;
  listening = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
  if (rafId) {
    window.cancelAnimationFrame(rafId);
    rafId = 0;
  }
};

/**
 * Honey-style scroll highlight: words sit at ~30% opacity and light up
 * to full as they cross the upper-middle reading line.
 * Uses one shared rAF-throttled scroll listener for all instances.
 */
const ScrollHighlightWords: React.FC<ScrollHighlightWordsProps> = ({
  text,
  className = '',
  as = 'p',
}) => {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const words = text.trim().split(/\s+/).filter(Boolean);
  const Tag = as;

  useEffect(() => {
    const target: WordTarget = { els: [] };
    const syncEls = () => {
      target.els = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    };

    syncEls();
    targets.add(target);
    ensureListeners();
    schedule();

    return () => {
      targets.delete(target);
      teardownListenersIfEmpty();
    };
  }, [text]);

  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          ref={(el) => {
            wordRefs.current[index] = el;
          }}
          className="inline transition-opacity duration-200 ease-out"
          style={{ opacity: 0.3 }}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
};

export default ScrollHighlightWords;
