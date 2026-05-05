import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GlobeMesh: React.FC = () => {
  const globeRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Points>(null);

  const starPositions = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = 2.3 + Math.random() * 0.45;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0035;
      globeRef.current.rotation.x = Math.sin(t * 0.25) * 0.12;
    }

    if (starsRef.current) {
      starsRef.current.rotation.y -= 0.0009;
      starsRef.current.rotation.x += 0.00035;
    }
  });

  const gridColor = '#bfdbfe';
  const glowColor = '#93c5fd';

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.35}
          metalness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.004, 44, 44]} />
        <meshBasicMaterial
          color={gridColor}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.065, 52, 52]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.14}
          side={THREE.BackSide}
        />
      </mesh>

      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          sizeAttenuation
          color="#ffffff"
          transparent
          opacity={0.5}
        />
      </points>
    </group>
  );
};

const HeroGlobe3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
      <div className="h-[89.7vmin] w-[89.7vmin] min-h-[527px] min-w-[527px] max-h-[1151px] max-w-[1151px] opacity-70">
        <Canvas camera={{ position: [0, 0, 3.3], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2.4, 2.2, 2.5]} intensity={1.35} />
          <pointLight
            position={[-2.8, -2, -2]}
            intensity={0.45}
            color="#93c5fd"
          />
          <GlobeMesh />
        </Canvas>
      </div>
    </div>
  );
};

export default HeroGlobe3D;
