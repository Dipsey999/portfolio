'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export type Theme = 'particles' | 'space' | 'ocean';

type MouseRef = React.MutableRefObject<{ x: number; y: number }>;

// ──────────────────────────────────────────────────────────────────────────
// Shared full-screen plane vertex shader — used by every backdrop.
// ──────────────────────────────────────────────────────────────────────────

const FULL_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Tiny noise lib reused across the three backdrops.
const NOISE = /* glsl */ `
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
`;

// ──────────────────────────────────────────────────────────────────────────
// PARTICLES theme (formerly "Studio") — warm charcoal field + soft embers
// ──────────────────────────────────────────────────────────────────────────

const PARTICLES_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  varying vec2 vUv;
  ${NOISE}

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float t = uTime * 0.025;
    p += uMouse * 0.06;

    float n = fbm(p * 1.3 + vec2(t, -t * 0.7));
    vec2 warped = p + 0.6 * vec2(
      fbm(p * 1.6 + n + t),
      fbm(p * 1.6 - n - t * 0.8)
    );
    float field = fbm(warped * 1.05);

    vec3 charcoal = vec3(0.040, 0.034, 0.032);
    vec3 ember    = vec3(0.110, 0.060, 0.030);
    vec3 rose     = vec3(0.180, 0.060, 0.085);
    vec3 col = mix(charcoal, ember, smoothstep(0.20, 0.85, field));
    col = mix(col, rose, smoothstep(0.55, 0.95, field) * 0.45);

    float mouseDist = length(p - uMouse * 0.5);
    float aura = exp(-mouseDist * 2.6) * 0.12;
    col += vec3(0.95, 0.55, 0.35) * aura;

    float vig = smoothstep(1.4, 0.45, length(p));
    col *= mix(0.78, 1.0, vig);

    float grain = (hash(gl_FragCoord.xy + t) - 0.5) * 0.03;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function ParticlesBackdrop({ mouseRef }: { mouseRef: MouseRef }) {
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
    m.uniforms.uMouse.value.x += (mouseRef.current.x - m.uniforms.uMouse.value.x) * 0.05;
    m.uniforms.uMouse.value.y += (mouseRef.current.y - m.uniforms.uMouse.value.y) * 0.05;
    const { width, height } = state.size;
    m.uniforms.uResolution.value.set(width, height);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={FULL_VERT}
        fragmentShader={PARTICLES_FRAG}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function ParticlesEmbers({ mouseRef }: { mouseRef: MouseRef }) {
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
    ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
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

function ParticlesScene({ mouseRef }: { mouseRef: MouseRef }) {
  return (
    <>
      <ParticlesBackdrop mouseRef={mouseRef} />
      <ParticlesEmbers mouseRef={mouseRef} />
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// SPACE theme — deep cosmos with stars, a spiral galaxy, a slow planet,
// and an occasional comet. All slow and low-contrast on purpose.
// ──────────────────────────────────────────────────────────────────────────

const SPACE_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  varying vec2 vUv;
  ${NOISE}

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float t = uTime * 0.018;
    p += uMouse * 0.05;

    // Slow-drift nebula via warped fbm
    float n = fbm(p * 1.4 + vec2(t * 0.6, -t * 0.4));
    vec2 warped = p + 0.5 * vec2(fbm(p * 1.2 + n + t), fbm(p * 1.2 - n - t));
    float field = fbm(warped * 0.9);

    // Deep space palette — almost-black with violet + indigo whispers
    vec3 bg     = vec3(0.012, 0.014, 0.025);
    vec3 violet = vec3(0.130, 0.060, 0.180);
    vec3 indigo = vec3(0.040, 0.075, 0.220);
    vec3 col = mix(bg, indigo, smoothstep(0.15, 0.85, field) * 0.55);
    col = mix(col, violet, smoothstep(0.55, 0.95, field) * 0.45);

    // Milky-way diagonal band: extra brightness along a 30° tilt
    float band = abs(p.y * 0.85 - p.x * 0.35);
    float milky = smoothstep(0.55, 0.0, band) * 0.35;
    milky *= 0.6 + 0.5 * fbm(p * 4.0 + t);
    col += vec3(0.42, 0.45, 0.65) * milky * 0.40;

    // Subtle mouse aura, cool blue
    float mouseDist = length(p - uMouse * 0.5);
    float aura = exp(-mouseDist * 3.0) * 0.10;
    col += vec3(0.45, 0.55, 1.0) * aura;

    float vig = smoothstep(1.5, 0.45, length(p));
    col *= mix(0.65, 1.0, vig);

    float grain = (hash(gl_FragCoord.xy + t) - 0.5) * 0.025;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function SpaceBackdrop({ mouseRef }: { mouseRef: MouseRef }) {
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
    m.uniforms.uMouse.value.x += (mouseRef.current.x - m.uniforms.uMouse.value.x) * 0.04;
    m.uniforms.uMouse.value.y += (mouseRef.current.y - m.uniforms.uMouse.value.y) * 0.04;
    const { width, height } = state.size;
    m.uniforms.uResolution.value.set(width, height);
  });
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={FULL_VERT}
        fragmentShader={SPACE_FRAG}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function SpaceStars({ mouseRef }: { mouseRef: MouseRef }) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 1400;
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      // 70% white, 20% pale blue, 10% pale gold — natural star colour mix
      const r = Math.random();
      if (r < 0.7) {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 1.0;
      } else if (r < 0.9) {
        colors[i * 3] = 0.78; colors[i * 3 + 1] = 0.86; colors[i * 3 + 2] = 1.0;
      } else {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.92; colors[i * 3 + 2] = 0.72;
      }
      sizes[i] = 0.005 + Math.random() * 0.012;
    }
    return { positions, colors, sizes };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.005;
    ref.current.position.x = mouseRef.current.x * 0.10;
    ref.current.position.y = mouseRef.current.y * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.014}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function SpaceGalaxy({ mouseRef }: { mouseRef: MouseRef }) {
  // Logarithmic-spiral particle disk — placed slightly off-centre, behind the stars
  const ref = useRef<THREE.Points>(null);
  const COUNT = 2400;
  const BRANCHES = 5;
  const RADIUS = 2.4;
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const inner = new THREE.Color('#b07bff');
    const outer = new THREE.Color('#2a3a8a');
    for (let i = 0; i < COUNT; i++) {
      const r = Math.pow(Math.random(), 1.7) * RADIUS;
      const branch = i % BRANCHES;
      const branchAngle = (branch / BRANCHES) * Math.PI * 2;
      const spin = r * 1.6;
      const wobbleX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.45;
      const wobbleY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.12;
      const wobbleZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.45;
      positions[i * 3]     = Math.cos(branchAngle + spin) * r + wobbleX;
      positions[i * 3 + 1] = wobbleY;
      positions[i * 3 + 2] = Math.sin(branchAngle + spin) * r + wobbleZ;
      const mix = r / RADIUS;
      const c = inner.clone().lerp(outer, mix);
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.030;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.10;
    // Slight parallax + always offscreen-toward-right, large but dim
    ref.current.position.x = 2.2 + mouseRef.current.x * 0.05;
    ref.current.position.y = -0.4 + mouseRef.current.y * 0.03;
  });

  return (
    <points ref={ref} rotation={[Math.PI * 0.18, 0, 0]} position={[2.2, -0.4, -1.5]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        vertexColors
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SpacePlanet() {
  // Single distant planet — slow self-rotation, parked off-left
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.05;
  });
  return (
    <mesh ref={ref} position={[-2.4, 0.6, -1]} scale={0.42}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshStandardMaterial
        color={'#3b2a52'}
        emissive={'#1a1230'}
        emissiveIntensity={0.4}
        roughness={0.95}
        metalness={0.0}
      />
    </mesh>
  );
}

function SpaceComet() {
  // A streak that crosses the canvas every ~22 seconds, varying altitude.
  const ref = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Mesh>(null);
  const t0Ref = useRef(0);
  const yOffRef = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const period = 22;
    const local = (t - t0Ref.current) % period;
    if (local < 0.05) {
      yOffRef.current = (Math.random() - 0.5) * 2.6;
      t0Ref.current = t;
    }
    if (!ref.current || !lineRef.current) return;
    const k = local / 6; // 6s travel, then offscreen for the rest
    if (k > 1) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    const x = -4 + k * 8;
    const y = yOffRef.current + k * -0.6;
    ref.current.position.set(x, y, 0.2);
    const fade = Math.sin(k * Math.PI);
    (lineRef.current.material as THREE.MeshBasicMaterial).opacity = 0.85 * fade;
  });

  return (
    <group ref={ref} rotation={[0, 0, -0.32]}>
      {/* The streak — a thin tapered plane */}
      <mesh ref={lineRef}>
        <planeGeometry args={[0.8, 0.012]} />
        <meshBasicMaterial color="#e6f0ff" transparent opacity={0.0} depthWrite={false} />
      </mesh>
      {/* Bright head */}
      <mesh position={[0.4, 0, 0]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.95} depthWrite={false} />
      </mesh>
    </group>
  );
}

function SpaceScene({ mouseRef }: { mouseRef: MouseRef }) {
  return (
    <>
      <SpaceBackdrop mouseRef={mouseRef} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 2, 4]} intensity={0.7} color={'#bcd2ff'} />
      <SpaceGalaxy mouseRef={mouseRef} />
      <SpaceStars mouseRef={mouseRef} />
      <SpacePlanet />
      <SpaceComet />
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// OCEAN theme — deep water with marine snow, plankton flickers,
// a slow drifting creature silhouette, and a small school of fish.
// ──────────────────────────────────────────────────────────────────────────

const OCEAN_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  varying vec2 vUv;
  ${NOISE}

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float t = uTime * 0.03;
    p += uMouse * 0.04;

    // Vertical gradient — light teal at top fading to near-black at the bottom
    float vGrad = smoothstep(-0.8, 0.9, p.y);
    vec3 deep   = vec3(0.010, 0.030, 0.045);
    vec3 mid    = vec3(0.020, 0.080, 0.120);
    vec3 shallow= vec3(0.045, 0.155, 0.205);
    vec3 col = mix(deep, mid, vGrad);
    col = mix(col, shallow, smoothstep(0.55, 1.0, vGrad) * 0.6);

    // Caustic-like moving stripes near the top
    float caustic = fbm(vec2(p.x * 4.0 + t, p.y * 4.0 - t * 0.6));
    caustic *= smoothstep(-0.3, 0.9, p.y);
    col += vec3(0.45, 0.70, 0.85) * (caustic - 0.35) * 0.10;

    // Volumetric murk away from centre
    float murk = fbm(p * 1.6 + vec2(t * 0.3, t * 0.2));
    col = mix(col, deep * 1.5, smoothstep(0.55, 0.95, murk) * 0.30);

    // Subtle cyan aura at the cursor
    float mouseDist = length(p - uMouse * 0.5);
    float aura = exp(-mouseDist * 2.8) * 0.10;
    col += vec3(0.45, 0.85, 0.95) * aura;

    float vig = smoothstep(1.5, 0.45, length(p));
    col *= mix(0.65, 1.0, vig);

    float grain = (hash(gl_FragCoord.xy + t) - 0.5) * 0.020;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function OceanBackdrop({ mouseRef }: { mouseRef: MouseRef }) {
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
    m.uniforms.uMouse.value.x += (mouseRef.current.x - m.uniforms.uMouse.value.x) * 0.04;
    m.uniforms.uMouse.value.y += (mouseRef.current.y - m.uniforms.uMouse.value.y) * 0.04;
    const { width, height } = state.size;
    m.uniforms.uResolution.value.set(width, height);
  });
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={FULL_VERT}
        fragmentShader={OCEAN_FRAG}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function OceanSnow({ mouseRef }: { mouseRef: MouseRef }) {
  // Marine snow drifts downward and slowly sideways — recycle particles
  // that fall past the bottom back to the top.
  const ref = useRef<THREE.Points>(null);
  const COUNT = 900;
  const data = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT); // per-particle vy
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      velocities[i] = 0.04 + Math.random() * 0.06;
    }
    return { positions, velocities };
  }, []);

  useFrame((state, delta) => {
    const p = ref.current;
    if (!p) return;
    const attr = p.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      arr[ix + 1] -= data.velocities[i] * delta;
      // gentle horizontal sway
      arr[ix] += Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.0005;
      if (arr[ix + 1] < -2.6) {
        arr[ix + 1] = 2.6;
        arr[ix] = (Math.random() - 0.5) * 8;
      }
    }
    attr.needsUpdate = true;
    p.position.x = mouseRef.current.x * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.013}
        color="#bfeaff"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function OceanPlankton({ mouseRef }: { mouseRef: MouseRef }) {
  // Smaller, brighter, pulsing bioluminescent particles
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const COUNT = 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return arr;
  }, []);
  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    const t = state.clock.elapsedTime;
    matRef.current.opacity = 0.55 + Math.sin(t * 0.8) * 0.20;
    ref.current.position.x = mouseRef.current.x * 0.12;
    ref.current.position.y = mouseRef.current.y * 0.08;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.018}
        color="#9be8d8"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function OceanCreature() {
  // A wide low-opacity ellipsoid that drifts across — reads as a passing
  // silhouette (whale / manta) without competing with the foreground.
  const ref = useRef<THREE.Mesh>(null);
  const t0Ref = useRef(0);
  const yRef = useRef(0);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const period = 32;
    const local = (t - t0Ref.current) % period;
    if (local < 0.05) {
      yRef.current = -0.6 + Math.random() * 1.0;
      t0Ref.current = t;
    }
    if (!ref.current) return;
    const k = local / 18; // 18s drift, hide the rest of the period
    if (k > 1) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    const x = -4.5 + k * 9;
    const y = yRef.current + Math.sin(t * 0.4) * 0.05;
    ref.current.position.set(x, y, -0.5);
    const fade = Math.sin(k * Math.PI);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.18 * fade;
  });
  return (
    <mesh ref={ref} scale={[1.6, 0.42, 1]}>
      <sphereGeometry args={[0.7, 24, 12]} />
      <meshBasicMaterial color="#0a2030" transparent opacity={0.0} depthWrite={false} />
    </mesh>
  );
}

function OceanFishSchool() {
  // Small school of triangular fish bobbing along a cosine path,
  // re-using the same plane geometry but offset per fish.
  const groupRef = useRef<THREE.Group>(null);
  const FISH = 7;
  const offsets = useMemo(
    () =>
      Array.from({ length: FISH }, (_, i) => ({
        x: (i - FISH / 2) * 0.18,
        y: (Math.random() - 0.5) * 0.08,
        phase: Math.random() * Math.PI * 2,
      })),
    [],
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;
    // The whole school drifts along a slow cosine across the canvas
    groupRef.current.position.x = Math.cos(t * 0.07) * 2.5;
    groupRef.current.position.y = -1.2 + Math.sin(t * 0.13) * 0.3;
    groupRef.current.rotation.y = -Math.sin(t * 0.07) * 0.35;
    // Each fish bobs slightly
    groupRef.current.children.forEach((c, i) => {
      const o = offsets[i];
      if (o) c.position.y = o.y + Math.sin(t * 1.6 + o.phase) * 0.025;
    });
  });
  return (
    <group ref={groupRef}>
      {offsets.map((o, i) => (
        <mesh key={i} position={[o.x, o.y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.03, 0.08, 4]} />
          <meshBasicMaterial color="#7eb8b0" transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function OceanScene({ mouseRef }: { mouseRef: MouseRef }) {
  return (
    <>
      <OceanBackdrop mouseRef={mouseRef} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 5, 2]} intensity={0.5} color="#9ce0ff" />
      <OceanSnow mouseRef={mouseRef} />
      <OceanPlankton mouseRef={mouseRef} />
      <OceanCreature />
      <OceanFishSchool />
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Main HeroScene — single Canvas, routes children by theme.
// ──────────────────────────────────────────────────────────────────────────

export function HeroScene({ theme }: { theme: Theme }) {
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
      {theme === 'particles' && <ParticlesScene mouseRef={mouseRef} />}
      {theme === 'space' && <SpaceScene mouseRef={mouseRef} />}
      {theme === 'ocean' && <OceanScene mouseRef={mouseRef} />}
    </Canvas>
  );
}
