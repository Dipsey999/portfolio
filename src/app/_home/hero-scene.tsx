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
// PARTICLES theme — warm charcoal field + soft embers (unchanged).
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
// SPACE theme — stars-that-look-like-stars (custom shader with glow,
// twinkle, and a 4-point cross flare), denser spiral galaxy with bright
// core, a soft nebula cloud, a Saturn-like ringed planet, and a comet.
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
    p += uMouse * 0.04;

    // Far-darker bg — stars should pop
    vec3 col = vec3(0.005, 0.006, 0.014);

    // Soft nebula on the lower-right quadrant (purple/blue clouds)
    float n1 = fbm(p * 1.1 + vec2(t * 0.5, -t * 0.3));
    float n2 = fbm(p * 2.2 - vec2(t * 0.3, t * 0.6));
    float nebula = smoothstep(0.45, 0.95, n1 * 0.6 + n2 * 0.4);
    float distFromCloudCentre = length(p - vec2(0.6, -0.3));
    nebula *= exp(-distFromCloudCentre * 1.1);
    col = mix(col, vec3(0.32, 0.10, 0.40), nebula * 0.50);
    col = mix(col, vec3(0.06, 0.10, 0.32), nebula * nebula * 0.55);

    // Milky-way diagonal band — denser, fainter
    float band = abs(p.y * 0.85 - p.x * 0.35);
    float milky = smoothstep(0.55, 0.0, band) * 0.40;
    milky *= 0.5 + 0.6 * fbm(p * 5.0 + t);
    col += vec3(0.36, 0.40, 0.62) * milky * 0.35;

    // Mouse aura
    float mouseDist = length(p - uMouse * 0.5);
    col += vec3(0.30, 0.38, 0.85) * exp(-mouseDist * 3.2) * 0.07;

    float vig = smoothstep(1.6, 0.45, length(p));
    col *= mix(0.55, 1.0, vig);

    float grain = (hash(gl_FragCoord.xy + t) - 0.5) * 0.020;
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

// Custom star material: each point is a glowing star with a core, halo,
// 4-point cross flare, and a per-star twinkle.
const STAR_VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aRand;
  varying vec3 vColor;
  varying float vTwinkle;
  uniform float uTime;
  uniform float uPixelRatio;
  void main() {
    vColor = aColor;
    vTwinkle = 0.65 + 0.35 * sin(uTime * (0.4 + aRand * 1.6) + aRand * 31.0);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (1.0 + vTwinkle * 0.55) * (200.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const STAR_FRAG = /* glsl */ `
  precision highp float;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    // Core: bright tight dot
    float core = exp(-r * 28.0);
    // Halo: soft surrounding glow
    float halo = exp(-r * 7.0) * 0.35;
    // Cross flare: a 4-point lens flare for the brightest stars
    float crossH = max(0.0, 1.0 - abs(uv.y) * 22.0) * exp(-abs(uv.x) * 9.0);
    float crossV = max(0.0, 1.0 - abs(uv.x) * 22.0) * exp(-abs(uv.y) * 9.0);
    float flare = (crossH + crossV) * 0.30 * vTwinkle;
    float intensity = (core * 1.4 + halo + flare) * vTwinkle;
    if (intensity < 0.012) discard;
    gl_FragColor = vec4(vColor * intensity, intensity);
  }
`;

function SpaceStars({ mouseRef }: { mouseRef: MouseRef }) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const COUNT = 1800;

  const data = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const rand = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      // Star colour distribution — real-ish: mostly white, a bit of blue and gold
      const r = Math.random();
      if (r < 0.62) {
        colors[i * 3] = 1.0;   colors[i * 3 + 1] = 1.0;  colors[i * 3 + 2] = 1.0;
      } else if (r < 0.78) {
        colors[i * 3] = 0.74;  colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 1.0;
      } else if (r < 0.90) {
        colors[i * 3] = 1.0;   colors[i * 3 + 1] = 0.92; colors[i * 3 + 2] = 0.66;
      } else {
        colors[i * 3] = 1.0;   colors[i * 3 + 1] = 0.78; colors[i * 3 + 2] = 0.66;
      }
      // Size tiers: most stars tiny, a few bright anchors
      const t = Math.random();
      let size;
      if (t < 0.92) size = 0.45 + Math.random() * 0.55;
      else if (t < 0.985) size = 1.2 + Math.random() * 1.1;
      else size = 3.0 + Math.random() * 2.0;  // ~1.5% of stars are "anchor" stars
      sizes[i] = size;
      rand[i] = Math.random();
    }
    return { positions, colors, sizes, rand };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1.0 },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.004;
    ref.current.position.x = mouseRef.current.x * 0.10;
    ref.current.position.y = mouseRef.current.y * 0.07;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
        <bufferAttribute attach="attributes-aRand" args={[data.rand, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={STAR_VERT}
        fragmentShader={STAR_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SpaceGalaxy({ mouseRef }: { mouseRef: MouseRef }) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 5500;
  const BRANCHES = 5;
  const RADIUS = 2.6;
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const inner = new THREE.Color('#ffd58a');
    const mid = new THREE.Color('#c878ff');
    const outer = new THREE.Color('#1a2a8a');
    for (let i = 0; i < COUNT; i++) {
      const r = Math.pow(Math.random(), 2.1) * RADIUS;
      const branch = i % BRANCHES;
      const branchAngle = (branch / BRANCHES) * Math.PI * 2;
      const spin = r * 1.8;
      const wobbleScale = 0.18 + r * 0.10;
      const wobbleX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * wobbleScale;
      const wobbleY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.06;
      const wobbleZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * wobbleScale;
      positions[i * 3]     = Math.cos(branchAngle + spin) * r + wobbleX;
      positions[i * 3 + 1] = wobbleY;
      positions[i * 3 + 2] = Math.sin(branchAngle + spin) * r + wobbleZ;
      const k = r / RADIUS;
      const c =
        k < 0.30
          ? inner.clone().lerp(mid, k / 0.30)
          : mid.clone().lerp(outer, (k - 0.30) / 0.70);
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.022;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.04) * 0.10;
    ref.current.position.x = 2.5 + mouseRef.current.x * 0.04;
    ref.current.position.y = -0.5 + mouseRef.current.y * 0.025;
  });

  return (
    <points ref={ref} rotation={[Math.PI * 0.16, 0, 0]} position={[2.5, -0.5, -1.5]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.020}
        vertexColors
        transparent
        opacity={0.62}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SpacePlanet() {
  // Saturn-like — sphere with a flat ring disc, slow rotation
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (sphereRef.current) sphereRef.current.rotation.y += delta * 0.06;
    if (groupRef.current) groupRef.current.rotation.z = Math.sin(_.clock.elapsedTime * 0.05) * 0.04;
  });
  return (
    <group ref={groupRef} position={[-2.6, 0.7, -1]} scale={0.50}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color={'#caa37a'}
          emissive={'#3a2a1a'}
          emissiveIntensity={0.35}
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>
      {/* Ring: a flat torus tilted */}
      <mesh rotation={[Math.PI * 0.42, 0, 0]}>
        <ringGeometry args={[1.25, 1.85, 96]} />
        <meshBasicMaterial
          color={'#d6b48a'}
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Inner thinner ring */}
      <mesh rotation={[Math.PI * 0.42, 0, 0]}>
        <ringGeometry args={[1.92, 2.10, 96]} />
        <meshBasicMaterial
          color={'#a88a64'}
          transparent
          opacity={0.32}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function SpaceComet() {
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
    const k = local / 6;
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
      <mesh ref={lineRef}>
        <planeGeometry args={[0.9, 0.012]} />
        <meshBasicMaterial color="#e6f0ff" transparent opacity={0.0} depthWrite={false} />
      </mesh>
      <mesh position={[0.45, 0, 0]}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.95} depthWrite={false} />
      </mesh>
    </group>
  );
}

function SpaceScene({ mouseRef }: { mouseRef: MouseRef }) {
  return (
    <>
      <SpaceBackdrop mouseRef={mouseRef} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 2, 4]} intensity={0.6} color={'#bcd2ff'} />
      <SpaceGalaxy mouseRef={mouseRef} />
      <SpaceStars mouseRef={mouseRef} />
      <SpacePlanet />
      <SpaceComet />
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// OCEAN theme — caustic-lit deep water, varied marine snow, a manta-ray
// silhouette gliding across, a small fish school, and rising bubbles.
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

    float vGrad = smoothstep(-0.8, 0.9, p.y);
    vec3 deep    = vec3(0.006, 0.020, 0.035);
    vec3 mid     = vec3(0.018, 0.070, 0.110);
    vec3 shallow = vec3(0.040, 0.150, 0.205);
    vec3 col = mix(deep, mid, vGrad);
    col = mix(col, shallow, smoothstep(0.55, 1.0, vGrad) * 0.55);

    // Caustic light rays from above (stronger near the top)
    float top = smoothstep(-0.2, 0.95, p.y);
    float caustic = fbm(vec2(p.x * 4.5 + t * 1.2, p.y * 6.0 - t * 0.8));
    caustic = smoothstep(0.55, 0.95, caustic);
    col += vec3(0.55, 0.85, 0.95) * caustic * top * 0.15;

    // Vertical sun-ray streaks (more obvious at the top)
    float rays = fbm(vec2(p.x * 1.8 + t * 0.4, p.y * 0.9));
    rays = pow(rays, 2.0);
    col += vec3(0.50, 0.80, 0.95) * rays * top * 0.08;

    // Murk
    float murk = fbm(p * 1.6 + vec2(t * 0.3, t * 0.2));
    col = mix(col, deep * 1.4, smoothstep(0.55, 0.95, murk) * 0.30);

    // Mouse aura
    float mouseDist = length(p - uMouse * 0.5);
    col += vec3(0.45, 0.85, 0.95) * exp(-mouseDist * 2.8) * 0.08;

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

// Marine-snow custom shader: each particle has its own size + opacity so
// the snow looks like irregular flecks, not uniform dots.
const SNOW_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aRand;
  varying float vRand;
  uniform float uPixelRatio;
  void main() {
    vRand = aRand;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (140.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const SNOW_FRAG = /* glsl */ `
  precision highp float;
  varying float vRand;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    float core = exp(-r * 9.0);
    float halo = exp(-r * 3.5) * 0.20;
    float alpha = (core + halo) * (0.25 + 0.55 * vRand);
    if (alpha < 0.015) discard;
    gl_FragColor = vec4(vec3(0.78, 0.92, 1.0), alpha);
  }
`;

function OceanSnow({ mouseRef }: { mouseRef: MouseRef }) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 1100;
  const data = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);
    const rand = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      velocities[i] = 0.025 + Math.random() * 0.075;
      sizes[i] = 1.2 + Math.random() * 3.0;
      rand[i] = Math.random();
    }
    return { positions, velocities, sizes, rand };
  }, []);

  const uniforms = useMemo(
    () => ({
      uPixelRatio: {
        value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1.0,
      },
    }),
    [],
  );

  useFrame((state, delta) => {
    const p = ref.current;
    if (!p) return;
    const attr = p.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      arr[ix + 1] -= data.velocities[i] * delta;
      arr[ix] += Math.sin(t * 0.4 + i) * 0.0004;
      if (arr[ix + 1] < -3.2) {
        arr[ix + 1] = 3.2;
        arr[ix] = (Math.random() - 0.5) * 9;
      }
    }
    attr.needsUpdate = true;
    p.position.x = mouseRef.current.x * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
        <bufferAttribute attach="attributes-aRand" args={[data.rand, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={SNOW_VERT}
        fragmentShader={SNOW_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

function OceanPlankton({ mouseRef }: { mouseRef: MouseRef }) {
  // Brighter, fewer, additive — reads as bioluminescent specks
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const COUNT = 55;
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
    matRef.current.opacity = 0.55 + Math.sin(t * 1.1) * 0.35;
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
        size={0.030}
        color="#a8f0d8"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Manta-ray silhouette — a 2D Shape extruded as a flat mesh, gliding
// slowly across the screen.  Reads as a passing creature, not a blob.
function OceanManta() {
  const ref = useRef<THREE.Mesh>(null);
  const t0Ref = useRef(0);
  const yRef = useRef(-0.3);
  const directionRef = useRef(1);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Manta-ray outline traced clockwise, body at origin, wings flared.
    // X is horizontal, Y is vertical. Approximate 2:1 wing-span to body.
    shape.moveTo(-1.00, 0.00);
    shape.bezierCurveTo(-0.90,  0.20, -0.60,  0.35, -0.25,  0.18);  // left wing top
    shape.bezierCurveTo(-0.12,  0.10,  0.12,  0.10,  0.25,  0.18);  // body top
    shape.bezierCurveTo( 0.60,  0.35,  0.90,  0.20,  1.00,  0.00);  // right wing top
    shape.bezierCurveTo( 0.92, -0.04,  0.62, -0.08,  0.32, -0.05);  // right wing under
    shape.bezierCurveTo( 0.22, -0.06,  0.18, -0.18,  0.10, -0.22);  // tail base right
    shape.bezierCurveTo( 0.08, -0.42,  0.04, -0.55,  0.00, -0.40);  // tail tip
    shape.bezierCurveTo(-0.04, -0.55, -0.08, -0.42, -0.10, -0.22);  // tail base left
    shape.bezierCurveTo(-0.18, -0.18, -0.22, -0.06, -0.32, -0.05);  // left wing under
    shape.bezierCurveTo(-0.62, -0.08, -0.92, -0.04, -1.00,  0.00);  // close
    return new THREE.ShapeGeometry(shape, 32);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const period = 34;
    const local = (t - t0Ref.current) % period;
    if (local < 0.05) {
      yRef.current = -0.8 + Math.random() * 1.4;
      directionRef.current = Math.random() < 0.5 ? 1 : -1;
      t0Ref.current = t;
    }
    if (!ref.current) return;
    const travel = 20; // seconds across the canvas
    const k = local / travel;
    if (k > 1) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    const dir = directionRef.current;
    const x = dir * (-5.0 + k * 10);
    // Slow undulating Y like a swim cycle
    const y = yRef.current + Math.sin(t * 0.8) * 0.05;
    ref.current.position.set(x, y, -0.6);
    // Slight roll while moving — wings tilt up and down
    ref.current.rotation.z = Math.sin(t * 0.7) * 0.04;
    // Face into travel direction
    ref.current.rotation.y = dir < 0 ? Math.PI : 0;
    const fade = Math.sin(k * Math.PI);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.42 * fade;
  });

  return (
    <mesh ref={ref} geometry={geometry} scale={1.7}>
      <meshBasicMaterial
        color="#0c2230"
        transparent
        opacity={0.0}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function OceanFishSchool() {
  const groupRef = useRef<THREE.Group>(null);
  const FISH = 9;
  const offsets = useMemo(
    () =>
      Array.from({ length: FISH }, (_, i) => ({
        x: (i - FISH / 2) * 0.18 + (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.08,
        z: (Math.random() - 0.5) * 0.12,
        phase: Math.random() * Math.PI * 2,
      })),
    [],
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;
    groupRef.current.position.x = Math.cos(t * 0.08) * 2.5;
    groupRef.current.position.y = -1.4 + Math.sin(t * 0.13) * 0.3;
    groupRef.current.rotation.y = -Math.sin(t * 0.08) * 0.45;
    groupRef.current.children.forEach((c, i) => {
      const o = offsets[i];
      if (o) c.position.y = o.y + Math.sin(t * 1.8 + o.phase) * 0.03;
    });
  });
  return (
    <group ref={groupRef}>
      {offsets.map((o, i) => (
        <mesh key={i} position={[o.x, o.y, o.z]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.032, 0.085, 4]} />
          <meshBasicMaterial color="#7eb8b0" transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

// Rising bubbles — small bright spheres that drift upward at varied speeds
function OceanBubbles({ mouseRef }: { mouseRef: MouseRef }) {
  const groupRef = useRef<THREE.Group>(null);
  const COUNT = 18;
  const bubbles = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: (Math.random() - 0.5) * 9,
        y: -3.0 - Math.random() * 3.0,
        z: (Math.random() - 0.5) * 1.5,
        speed: 0.18 + Math.random() * 0.32,
        size: 0.014 + Math.random() * 0.036,
        sway: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      })),
    [],
  );
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((c, i) => {
      const b = bubbles[i];
      if (!b) return;
      b.y += b.speed * delta;
      if (b.y > 3.2) {
        b.y = -3.2;
        b.x = (Math.random() - 0.5) * 9;
      }
      c.position.set(
        b.x + Math.sin(t * b.sway + b.phase) * 0.04,
        b.y,
        b.z,
      );
      // Bigger as they rise — pressure release
      const scale = 0.6 + ((b.y + 3.2) / 6.4) * 0.6;
      c.scale.setScalar(scale);
    });
    groupRef.current.position.x = mouseRef.current.x * 0.05;
  });
  return (
    <group ref={groupRef}>
      {bubbles.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, b.z]}>
          <sphereGeometry args={[b.size, 10, 8]} />
          <meshBasicMaterial
            color="#bff0ff"
            transparent
            opacity={0.45}
            depthWrite={false}
          />
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
      <OceanManta />
      <OceanFishSchool />
      <OceanBubbles mouseRef={mouseRef} />
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
