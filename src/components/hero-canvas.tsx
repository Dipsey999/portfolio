'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, Sphere } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

function Orb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t * 0.18) * 0.5 + pointer.y * 0.15;
    ref.current.rotation.y = t * 0.12 + pointer.x * 0.2;
    ref.current.position.x = pointer.x * 0.25;
    ref.current.position.y = pointer.y * 0.18;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.35, 6]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          resolution={512}
          transmission={1}
          roughness={0.08}
          thickness={1.4}
          ior={1.45}
          chromaticAberration={0.06}
          anisotropy={0.6}
          distortion={0.2}
          distortionScale={0.4}
          temporalDistortion={0.08}
          color={'#ffffff'}
          background={new THREE.Color('#FF5A1F')}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const points = useMemo(() => {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      const r = 3 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#FF8A5A" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 3, 4]} intensity={1.2} />
        <directionalLight position={[-3, -1, -2]} intensity={0.4} color="#FF8A5A" />
        <Orb />
        <Particles />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
