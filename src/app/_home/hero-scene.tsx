'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { KernelSize, BlendFunction } from 'postprocessing';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export type Theme = 'particles' | 'space' | 'ocean';

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
// PARTICLES theme — unchanged
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
// SPACE — "The slow sky"
// One soft nebula drifting on the right. A field of stars. The whole sky
// rotates so gently you only notice if you sit with it. That's it.
// Bloom on the stars does the heavy lifting.
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
    p += uMouse * 0.03;

    float t = uTime * 0.008;          // very slow drift

    // Base: almost black, a hint of cool blue toward the centre
    vec3 base = vec3(0.005, 0.006, 0.014);
    float centreLift = exp(-length(p) * 0.6) * 0.06;
    vec3 col = base + vec3(0.05, 0.06, 0.12) * centreLift;

    // ONE soft nebula. Sits low-right, drifts barely. Warm magenta tinted
    // with deeper indigo where it's thickest.
    vec2 nebCentre = vec2(0.55 + sin(t * 0.5) * 0.04, -0.20 + cos(t * 0.4) * 0.03);
    vec2 nq = p - nebCentre;
    float n1 = fbm(nq * 1.1 + vec2(t, -t * 0.6));
    float n2 = fbm(nq * 2.2 - vec2(t * 0.4, t * 0.3));
    float cloud = smoothstep(0.40, 0.95, n1 * 0.65 + n2 * 0.35);
    float falloff = exp(-length(nq) * 1.45);
    cloud *= falloff;
    // Mauve outer → deeper indigo core
    vec3 nebOuter = vec3(0.36, 0.16, 0.42);
    vec3 nebCore  = vec3(0.09, 0.08, 0.30);
    col = mix(col, nebOuter, cloud * 0.55);
    col = mix(col, nebCore, cloud * cloud * 0.55);

    // Subtle cyan mouse glow — only when you move the cursor close
    float mouseDist = length(p - uMouse * 0.5);
    col += vec3(0.30, 0.45, 0.85) * exp(-mouseDist * 3.4) * 0.05;

    // Soft vignette — pulls focus inward, never harsh
    float vig = smoothstep(1.6, 0.50, length(p));
    col *= mix(0.55, 1.0, vig);

    // Light grain — anti-banding more than texture
    col += (hash(gl_FragCoord.xy + t) - 0.5) * 0.016;

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
        fragmentShader={SPACE_FRAG}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function SpaceSlowSky({ mouseRef }: { mouseRef: MouseRef }) {
  // Wraps the drei <Stars> in a group that rotates almost imperceptibly.
  // Adding a couple of <Sparkles> as bright accent stars that bloom hard.
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.008;
    ref.current.position.x = mouseRef.current.x * 0.05;
    ref.current.position.y = mouseRef.current.y * 0.03;
  });
  return (
    <group ref={ref}>
      <Stars
        radius={50}
        depth={28}
        count={3500}
        factor={3}
        saturation={0.05}
        fade
        speed={0.3}
      />
      {/* A handful of standout bright stars that pull bloom — concentrated
          on the left, away from the nebula so the visual weight balances. */}
      <Sparkles
        count={26}
        scale={[8, 4.5, 3]}
        position={[-1.8, 0.4, -1.5]}
        size={9}
        speed={0.18}
        color="#dde8ff"
        opacity={0.95}
      />
      {/* A second, dimmer cluster nearer centre */}
      <Sparkles
        count={12}
        scale={[6, 3.5, 2]}
        position={[0.3, -0.2, -1]}
        size={5}
        speed={0.12}
        color="#ffe2c5"
        opacity={0.7}
      />
    </group>
  );
}

function SpaceScene({ mouseRef }: { mouseRef: MouseRef }) {
  return (
    <>
      <SpaceBackdrop mouseRef={mouseRef} />
      <SpaceSlowSky mouseRef={mouseRef} />
      <EffectComposer multisampling={0} disableNormalPass>
        <Bloom
          intensity={0.55}
          kernelSize={KernelSize.LARGE}
          luminanceThreshold={0.20}
          luminanceSmoothing={0.35}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.20} darkness={0.55} />
      </EffectComposer>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// OCEAN — "The quiet deep"
// Volumetric god rays from above is the surprise. Sparse marine snow.
// Distant bioluminescence. A manta passes rarely. That's it.
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
    p += uMouse * 0.03;

    float t = uTime * 0.025;

    // Vertical gradient — slightly brighter near the top suggesting "up
    // is the surface", fading to near-black at the bottom.
    float vGrad = smoothstep(-0.95, 0.95, p.y);
    vec3 deep    = vec3(0.005, 0.022, 0.040);
    vec3 mid     = vec3(0.012, 0.060, 0.105);
    vec3 shallow = vec3(0.025, 0.130, 0.185);
    vec3 col = mix(deep, mid, vGrad);
    col = mix(col, shallow, smoothstep(0.55, 1.0, vGrad) * 0.55);

    // VOLUMETRIC GOD RAYS — the surprise.
    // Rays emanate from a "sun" point above and to the right, just off-screen.
    // We compute the angle from that point, generate striped brightness
    // using sin(angle*N + t), then attenuate by distance and depth.
    vec2 sunPos = vec2(0.25, 1.5);
    vec2 toSun = sunPos - p;
    float angle = atan(toSun.x, toSun.y);  // sky-down angle
    // Add a low-frequency wobble so the rays "breathe"
    float wobble = sin(t * 0.6) * 0.04;
    float beam = sin(angle * 18.0 + t * 0.5 + wobble) * 0.5 + 0.5;
    beam = pow(beam, 4.0);
    // Distance falloff from the sun
    float distFalloff = exp(-length(toSun) * 0.50);
    // Fade out at the bottom (rays don't reach the deep)
    float topFade = smoothstep(-0.4, 0.95, p.y);
    // Soft FBM mask so beams aren't ruler-straight — gives volumetric feel
    float volume = 0.5 + 0.5 * fbm(p * 1.8 + vec2(t * 0.4, t * 0.2));
    float godRays = beam * distFalloff * topFade * volume;
    col += vec3(0.55, 0.85, 0.95) * godRays * 0.35;

    // Subtle caustics dancing on the "ceiling" of the water
    float caustic = fbm(vec2(p.x * 4.0 + t * 1.4, p.y * 5.5 - t));
    caustic = smoothstep(0.55, 0.95, caustic);
    col += vec3(0.45, 0.80, 0.95) * caustic * topFade * 0.10;

    // Murk — soft variation in density
    float murk = fbm(p * 1.4 + vec2(t * 0.2, t * 0.15));
    col = mix(col, deep * 1.3, smoothstep(0.55, 0.95, murk) * 0.25);

    // Mouse aura
    float mouseDist = length(p - uMouse * 0.5);
    col += vec3(0.45, 0.85, 0.95) * exp(-mouseDist * 3.0) * 0.06;

    float vig = smoothstep(1.55, 0.45, length(p));
    col *= mix(0.55, 1.0, vig);

    col += (hash(gl_FragCoord.xy + t) - 0.5) * 0.014;

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
        fragmentShader={OCEAN_FRAG}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// Marine snow — sparse, slow, varied via a tiny custom shader.
const SNOW_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aRand;
  varying float vRand;
  uniform float uPixelRatio;
  void main() {
    vRand = aRand;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (130.0 / -mv.z);
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
    float halo = exp(-r * 3.5) * 0.18;
    float alpha = (core + halo) * (0.18 + 0.45 * vRand);
    if (alpha < 0.012) discard;
    gl_FragColor = vec4(vec3(0.82, 0.93, 1.0), alpha);
  }
`;

function OceanMarineSnow({ mouseRef }: { mouseRef: MouseRef }) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 220;
  const data = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);
    const rand = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      velocities[i] = 0.018 + Math.random() * 0.045;
      sizes[i] = 1.2 + Math.random() * 2.6;
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
      arr[ix] += Math.sin(t * 0.3 + i) * 0.0003;
      if (arr[ix + 1] < -3.2) {
        arr[ix + 1] = 3.2;
        arr[ix] = (Math.random() - 0.5) * 9;
      }
    }
    attr.needsUpdate = true;
    p.position.x = mouseRef.current.x * 0.04;
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

function OceanManta() {
  // A bezier-traced manta-ray silhouette that crosses the canvas every ~58s.
  // Low opacity, very slow, faces its direction of travel. Reads as a real
  // creature gliding past in the murk, not a blob.
  const ref = useRef<THREE.Mesh>(null);
  const t0Ref = useRef(0);
  const yRef = useRef(-0.4);
  const dirRef = useRef(1);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.00, 0.00);
    shape.bezierCurveTo(-0.90,  0.22, -0.55,  0.40, -0.25,  0.16);
    shape.bezierCurveTo(-0.12,  0.10,  0.12,  0.10,  0.25,  0.16);
    shape.bezierCurveTo( 0.55,  0.40,  0.90,  0.22,  1.00,  0.00);
    shape.bezierCurveTo( 0.94, -0.05,  0.60, -0.10,  0.30, -0.06);
    shape.bezierCurveTo( 0.22, -0.06,  0.18, -0.18,  0.10, -0.22);
    shape.bezierCurveTo( 0.08, -0.45,  0.04, -0.58,  0.00, -0.42);
    shape.bezierCurveTo(-0.04, -0.58, -0.08, -0.45, -0.10, -0.22);
    shape.bezierCurveTo(-0.18, -0.18, -0.22, -0.06, -0.30, -0.06);
    shape.bezierCurveTo(-0.60, -0.10, -0.94, -0.05, -1.00,  0.00);
    return new THREE.ShapeGeometry(shape, 32);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const period = 58;
    const local = (t - t0Ref.current) % period;
    if (local < 0.05) {
      yRef.current = -0.7 + Math.random() * 1.2;
      dirRef.current = Math.random() < 0.5 ? 1 : -1;
      t0Ref.current = t;
    }
    if (!ref.current) return;
    const travel = 28;
    const k = local / travel;
    if (k > 1) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    const dir = dirRef.current;
    const x = dir * (-5.6 + k * 11.2);
    const y = yRef.current + Math.sin(t * 0.5) * 0.04;
    ref.current.position.set(x, y, -0.8);
    ref.current.rotation.z = Math.sin(t * 0.45) * 0.035;
    ref.current.rotation.y = dir < 0 ? Math.PI : 0;
    const fade = Math.sin(k * Math.PI);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.30 * fade;
  });

  return (
    <mesh ref={ref} geometry={geometry} scale={1.9}>
      <meshBasicMaterial
        color="#0a1c28"
        transparent
        opacity={0.0}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function OceanScene({ mouseRef }: { mouseRef: MouseRef }) {
  return (
    <>
      <OceanBackdrop mouseRef={mouseRef} />
      <OceanMarineSnow mouseRef={mouseRef} />
      <OceanManta />
      {/* Distant bioluminescence — sparse, far away, additive bloom does
          the rest. Two pockets so the eye finds variety. */}
      <Sparkles
        count={18}
        scale={[6, 4, 2]}
        position={[-1.6, -1.0, -1.2]}
        size={5}
        speed={0.20}
        color="#9be6cf"
        opacity={0.85}
      />
      <Sparkles
        count={12}
        scale={[5, 3, 2]}
        position={[1.5, 0.4, -1.0]}
        size={4}
        speed={0.15}
        color="#a8e0ff"
        opacity={0.75}
      />
      <EffectComposer multisampling={0} disableNormalPass>
        <Bloom
          intensity={0.65}
          kernelSize={KernelSize.LARGE}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.40}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.18} darkness={0.55} />
        <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} />
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
      {theme === 'space' && <SpaceScene mouseRef={mouseRef} />}
      {theme === 'ocean' && <OceanScene mouseRef={mouseRef} />}
    </Canvas>
  );
}
