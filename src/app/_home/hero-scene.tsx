'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse; // -1..1
  varying vec2 vUv;

  // Hash + value noise
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float t = uTime * 0.025;
    p += uMouse * 0.06;

    // Domain-warped FBM produces the soft fluid gradient
    float n = fbm(p * 1.3 + vec2(t, -t * 0.7));
    vec2 warped = p + 0.6 * vec2(
      fbm(p * 1.6 + n + t),
      fbm(p * 1.6 - n - t * 0.8)
    );
    float field = fbm(warped * 1.05);

    // Two warm anchors with a faint pink ribbon, against deep charcoal
    vec3 charcoal = vec3(0.040, 0.034, 0.032);
    vec3 ember    = vec3(0.110, 0.060, 0.030);
    vec3 rose     = vec3(0.180, 0.060, 0.085);
    vec3 col = mix(charcoal, ember, smoothstep(0.20, 0.85, field));
    col = mix(col, rose,            smoothstep(0.55, 0.95, field) * 0.45);

    // A soft warm aura that follows the cursor (subtle)
    float mouseDist = length(p - uMouse * 0.5);
    float aura = exp(-mouseDist * 2.6) * 0.12;
    col += vec3(0.95, 0.55, 0.35) * aura;

    // Gentle vignette
    float vig = smoothstep(1.4, 0.45, length(p));
    col *= mix(0.78, 1.0, vig);

    // Film grain
    float grain = (hash(gl_FragCoord.xy + t) - 0.5) * 0.03;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function ShaderPlane({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    m.uniforms.uMouse.value.x +=
      (mouseRef.current.x - m.uniforms.uMouse.value.x) * 0.05;
    m.uniforms.uMouse.value.y +=
      (mouseRef.current.y - m.uniforms.uMouse.value.y) * 0.05;
    const { width, height } = state.size;
    m.uniforms.uResolution.value.set(width, height);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function Particles({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 220;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.015;
    ref.current.position.x = mouseRef.current.x * 0.18;
    ref.current.position.y = mouseRef.current.y * 0.12;
    // Gentle vertical drift
    const time = state.clock.elapsedTime;
    ref.current.position.z = Math.sin(time * 0.2) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#ffd6ad"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function HeroScene() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  if (!enabled) return null;

  return (
    <Canvas
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 60 }}
    >
      <ShaderPlane mouseRef={mouseRef} />
      <Particles mouseRef={mouseRef} />
    </Canvas>
  );
}
