'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useTimeMachine } from './context';

// Six era palette anchors (A=primary, B=secondary)
// Linearly interpolated based on uProgress (0 → 1).
const ERA_PALETTES: Array<{ a: [number, number, number]; b: [number, number, number] }> = [
  { a: [0.91, 0.91, 0.88], b: [0.07, 0.07, 0.06] }, // 1984: bone & black
  { a: [0.18, 0.16, 0.14], b: [0.45, 0.32, 0.20] }, // 2007: leather warmth
  { a: [0.97, 0.97, 0.96], b: [1.00, 0.18, 0.33] }, // 2013: white + iOS pink
  { a: [0.78, 0.85, 0.96], b: [0.62, 0.55, 0.95] }, // 2018: glass periwinkle
  { a: [1.00, 0.88, 0.00], b: [0.07, 0.06, 0.05] }, // 2022: caution yellow
  { a: [0.04, 0.03, 0.03], b: [0.80, 1.00, 0.00] }, // 2026: black & acid lime
];

const FRAG = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uProgress;     // 0..1 across full scroll
uniform vec2  uResolution;
uniform vec2  uMouse;        // -1..1
uniform vec3  uColorA[6];
uniform vec3  uColorB[6];

varying vec2 vUv;

// Hash + 2D simplex-ish noise
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
    u.y
  );
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

// Bayer 4x4 ordered dithering
float bayer4(vec2 p) {
  int x = int(mod(p.x, 4.0));
  int y = int(mod(p.y, 4.0));
  int idx = x + y * 4;
  float m[16];
  m[0]=0.0; m[1]=8.0; m[2]=2.0; m[3]=10.0;
  m[4]=12.0; m[5]=4.0; m[6]=14.0; m[7]=6.0;
  m[8]=3.0; m[9]=11.0; m[10]=1.0; m[11]=9.0;
  m[12]=15.0; m[13]=7.0; m[14]=13.0; m[15]=5.0;
  return m[idx] / 16.0;
}

// Get the era pair for the current progress.
// Eras are spaced 0, .2, .4, .6, .8, 1.0 — scroll moves through 5 transitions.
struct Era { vec3 a; vec3 b; float intra; int idx; };

Era getEra(float p) {
  float t = clamp(p, 0.0, 1.0) * 5.0;          // 0..5
  int i = int(floor(t));
  if (i > 4) i = 4;
  float intra = fract(t);
  Era e;
  e.idx = i;
  e.intra = intra;
  e.a = mix(uColorA[i], uColorA[i + 1], intra);
  e.b = mix(uColorB[i], uColorB[i + 1], intra);
  return e;
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;

  Era era = getEra(uProgress);
  float t = uTime * 0.04;

  // Mouse parallax
  p += uMouse * 0.05;

  // Distortion strength dialed up at the AI end
  float distort = 0.4 + uProgress * 0.9;

  // FBM warp — the "living" gradient
  float n = fbm(p * (1.4 + uProgress * 1.4) + vec2(t, -t * 0.7));
  vec2 warped = p + distort * vec2(
    fbm(p * 1.7 + n + t),
    fbm(p * 1.7 - n - t)
  );
  float field = fbm(warped * 1.1);

  // Mix the two palette anchors by the field
  vec3 col = mix(era.a, era.b, smoothstep(0.25, 0.85, field));

  // Era-specific signature treatments
  // 1984 (idx 0): heavy 1-bit ordered dither
  if (era.idx == 0 && era.intra < 0.92) {
    float dither = bayer4(gl_FragCoord.xy);
    float lum = dot(col, vec3(0.3, 0.59, 0.11));
    float bw = step(dither, lum);
    vec3 dithered = mix(era.b, era.a, bw);
    col = mix(dithered, col, era.intra);
  }

  // 2022 (idx 4): hard pixelated / harsh banding
  if (era.idx == 4 && era.intra > 0.05) {
    vec2 px = floor(uv * 80.0) / 80.0;
    float band = step(0.5, fract((px.x + px.y) * 8.0 + t * 4.0));
    col = mix(col, mix(era.a, era.b, band), 0.35);
  }

  // 2026 (idx 4 going toward 5 / fully there): chromatic shimmer
  float aiBlend = smoothstep(0.7, 1.0, uProgress);
  if (aiBlend > 0.01) {
    float shimmer = fbm(p * 3.0 + t * 1.5);
    vec3 acid = vec3(0.80, 1.00, 0.0) * shimmer * 0.18;
    col += acid * aiBlend;
  }

  // Soft vignette
  float vig = smoothstep(1.4, 0.4, length(p));
  col *= mix(0.85, 1.0, vig);

  // Subtle film grain
  float grain = (hash(gl_FragCoord.xy + t) - 0.5) * 0.04;
  col += grain;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

function ShaderPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { progressRef, mouseRef } = useTimeMachine();

  const uniforms = useMemo(() => {
    const colorA = ERA_PALETTES.map((e) => new THREE.Vector3(...e.a));
    const colorB = ERA_PALETTES.map((e) => new THREE.Vector3(...e.b));
    return {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: colorA },
      uColorB: { value: colorB },
    };
  }, []);

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    // Smoothed lerp toward target progress for buttery transitions
    const target = progressRef.current;
    m.uniforms.uProgress.value += (target - m.uniforms.uProgress.value) * 0.08;
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

export function ShaderCanvas() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
        dpr={[1, 1.5]}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
