'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { KernelSize, BlendFunction } from 'postprocessing';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export type Theme = 'particles' | 'aurora';

type MouseRef = React.MutableRefObject<{ x: number; y: number }>;

// ──────────────────────────────────────────────────────────────────────────
// Shared fragments
// ──────────────────────────────────────────────────────────────────────────

const FULL_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const NOISE_2D = /* glsl */ `
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

// 3D simplex noise — Stefan Gustavson / Ian McEwan, public domain
const SIMPLEX_3D = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
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
  ${NOISE_2D}

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;
    float t = uTime * 0.025;
    p += uMouse * 0.06;
    float n = fbm(p * 1.3 + vec2(t, -t * 0.7));
    vec2 warped = p + 0.6 * vec2(fbm(p * 1.6 + n + t), fbm(p * 1.6 - n - t * 0.8));
    float field = fbm(warped * 1.05);
    vec3 charcoal = vec3(0.040, 0.034, 0.032);
    vec3 ember    = vec3(0.110, 0.060, 0.030);
    vec3 rose     = vec3(0.180, 0.060, 0.085);
    vec3 col = mix(charcoal, ember, smoothstep(0.20, 0.85, field));
    col = mix(col, rose, smoothstep(0.55, 0.95, field) * 0.45);
    float mouseDist = length(p - uMouse * 0.5);
    col += vec3(0.95, 0.55, 0.35) * exp(-mouseDist * 2.6) * 0.12;
    float vig = smoothstep(1.4, 0.45, length(p));
    col *= mix(0.78, 1.0, vig);
    col += (hash(gl_FragCoord.xy + t) - 0.5) * 0.03;
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
// AURORA — one iridescent form, slowly undulating, against deep space.
// A high-subdivision sphere is displaced by 3D simplex noise in the
// vertex shader; the fragment shader paints it with an oil-slick
// thin-film interference palette modulated by the view angle. Bloom
// catches the rainbow rim. The whole shape rotates slowly on two axes.
// ──────────────────────────────────────────────────────────────────────────

const AURORA_BG_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  varying vec2 vUv;
  ${NOISE_2D}

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;
    p += uMouse * 0.025;

    // Almost-black void with a very subtle violet bias toward the form's
    // position so the iridescent edges have something to bloom against.
    vec3 col = vec3(0.008, 0.006, 0.014);

    float t = uTime * 0.012;
    float n = fbm(p * 0.9 + vec2(t, -t * 0.5));
    vec3 violet = vec3(0.05, 0.025, 0.075);
    vec3 teal   = vec3(0.015, 0.040, 0.055);
    col = mix(col, violet, smoothstep(0.35, 0.85, n) * 0.55);
    col = mix(col, teal, smoothstep(0.55, 0.95, fbm(p * 1.5 - t)) * 0.30);

    // Very subtle cursor warmth
    float mouseDist = length(p - uMouse * 0.5);
    col += vec3(0.25, 0.18, 0.45) * exp(-mouseDist * 3.4) * 0.05;

    float vig = smoothstep(1.55, 0.45, length(p));
    col *= mix(0.55, 1.0, vig);

    col += (hash(gl_FragCoord.xy + t) - 0.5) * 0.012;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function AuroraBackdrop({ mouseRef }: { mouseRef: MouseRef }) {
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
    m.uniforms.uMouse.value.x += (mouseRef.current.x - m.uniforms.uMouse.value.x) * 0.035;
    m.uniforms.uMouse.value.y += (mouseRef.current.y - m.uniforms.uMouse.value.y) * 0.035;
    const { width, height } = state.size;
    m.uniforms.uResolution.value.set(width, height);
  });
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={FULL_VERT}
        fragmentShader={AURORA_BG_FRAG}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

const AURORA_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uDisp;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;

  ${SIMPLEX_3D}

  void main() {
    vec3 pos = position;
    // 4D-ish: combine 3D simplex sampled at offset positions to morph
    // over time. Two octaves, the second faster + finer.
    float n1 = snoise(pos * 1.2 + vec3(uTime * 0.18, uTime * 0.13, uTime * 0.10));
    float n2 = snoise(pos * 2.6 + vec3(-uTime * 0.10, uTime * 0.22, -uTime * 0.16));
    float n = n1 * 0.75 + n2 * 0.25;

    // Displace along the original normal
    pos += normal * n * uDisp;

    // Approximate the new surface normal by sampling slightly along
    // tangent + bitangent and recomputing.  Cheap and works for the
    // displacement scale we use.
    vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0001)));
    if (length(tangent) < 0.001) tangent = vec3(1.0, 0.0, 0.0);
    vec3 bitangent = normalize(cross(normal, tangent));
    float eps = 0.02;
    vec3 pT = position + tangent * eps;
    vec3 pB = position + bitangent * eps;
    float nT = snoise(pT * 1.2 + vec3(uTime * 0.18, uTime * 0.13, uTime * 0.10)) * 0.75
             + snoise(pT * 2.6 + vec3(-uTime * 0.10, uTime * 0.22, -uTime * 0.16)) * 0.25;
    float nB = snoise(pB * 1.2 + vec3(uTime * 0.18, uTime * 0.13, uTime * 0.10)) * 0.75
             + snoise(pB * 2.6 + vec3(-uTime * 0.10, uTime * 0.22, -uTime * 0.16)) * 0.25;
    vec3 dT = (pT + normal * nT * uDisp) - pos;
    vec3 dB = (pB + normal * nB * uDisp) - pos;
    vec3 newNormal = normalize(cross(dT, dB));

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vNormal = normalize(mat3(modelMatrix) * newNormal);
    vView = normalize(cameraPosition - worldPos.xyz);
    vNoise = n;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const AURORA_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;

  // Thin-film interference palette — three sine waves out of phase
  // give a smooth oil-slick rainbow.  Brighter than 0..1 on purpose so
  // bloom has something to catch.
  vec3 iris(float t) {
    return vec3(
      0.5 + 0.5 * sin(t * 6.283 + 0.0),
      0.5 + 0.5 * sin(t * 6.283 + 2.094),
      0.5 + 0.5 * sin(t * 6.283 + 4.188)
    );
  }

  void main() {
    float ndv = clamp(dot(vNormal, vView), 0.0, 1.0);
    float fresnel = pow(1.0 - ndv, 1.6);

    // Phase shift the interference colour by the noise + time so the
    // rainbow drifts across the surface as it undulates.
    float phase = fresnel * 1.25 + vNoise * 0.45 + uTime * 0.04;
    vec3 sheen = iris(phase);

    // Inside body: deep, slightly purple — almost-black for contrast
    vec3 body = vec3(0.018, 0.012, 0.040);

    // Mix: the more grazing the angle, the more sheen
    vec3 col = mix(body, sheen * 1.05, smoothstep(0.0, 0.85, fresnel));

    // A sharper rim light that bloom will catch
    float rim = pow(1.0 - ndv, 4.0);
    col += iris(phase + 0.12) * rim * 0.85;

    // Tiny inner self-illumination so the body isn't totally dark
    col += body * 1.6;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function AuroraForm({ mouseRef }: { mouseRef: MouseRef }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDisp: { value: 0.16 },
    }),
    [],
  );
  useFrame((state, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (!meshRef.current) return;
    // Slow rotation on two axes — never the same silhouette twice
    meshRef.current.rotation.y += delta * 0.10;
    meshRef.current.rotation.x += delta * 0.045;
    // Subtle position parallax to the cursor
    meshRef.current.position.x = 0.4 + mouseRef.current.x * 0.20;
    meshRef.current.position.y = -0.1 + mouseRef.current.y * 0.12;
  });
  return (
    <mesh ref={meshRef} position={[0.4, -0.1, 0]} scale={1.7}>
      {/* High-subdivision icosphere — smooth displacement, no facets */}
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={AURORA_VERT}
        fragmentShader={AURORA_FRAG}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function AuroraScene({ mouseRef }: { mouseRef: MouseRef }) {
  return (
    <>
      <AuroraBackdrop mouseRef={mouseRef} />
      <AuroraForm mouseRef={mouseRef} />
      <EffectComposer multisampling={0} disableNormalPass>
        <Bloom
          intensity={0.95}
          kernelSize={KernelSize.LARGE}
          luminanceThreshold={0.32}
          luminanceSmoothing={0.45}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.22} darkness={0.55} />
        <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
      </EffectComposer>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Main HeroScene
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
      {theme === 'aurora' && <AuroraScene mouseRef={mouseRef} />}
    </Canvas>
  );
}
