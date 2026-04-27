// HeroScene.jsx
// Realistic Solar System — drop this file in place of your old HeroScene.jsx
// See the TEXTURE SETUP comment at the bottom before running.

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, Stars, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// ─────────────────────────────────────────────
//  Utility – fix RingGeometry UVs so the ring
//  texture maps from inner edge → outer edge
// ─────────────────────────────────────────────
function buildRingGeometry(innerR, outerR, segments = 160) {
  const geo = new THREE.RingGeometry(innerR, outerR, segments)
  const pos = geo.attributes.position
  const uv  = geo.attributes.uv
  const v   = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    const u = (v.length() - innerR) / (outerR - innerR)
    uv.setXY(i, u, 1)
  }
  uv.needsUpdate = true
  return geo
}

// ─────────────────────────────────────────────
//  Sun — textured sphere + two corona halos
// ─────────────────────────────────────────────
function Sun() {
  const sunMap   = useTexture('/textures/2k_sun.jpg')
  const bodyRef  = useRef()
  const halo1Ref = useRef()
  const halo2Ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (bodyRef.current)  bodyRef.current.rotation.y = t * 0.04
    if (halo1Ref.current) halo1Ref.current.scale.setScalar(1 + Math.sin(t * 1.1) * 0.018)
    if (halo2Ref.current) halo2Ref.current.scale.setScalar(1 + Math.sin(t * 0.7 + 1) * 0.012)
  })

  return (
    <group>
      {/* Main body */}
      <mesh ref={bodyRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          map={sunMap}
          emissiveMap={sunMap}
          emissive={new THREE.Color('#ff9900')}
          emissiveIntensity={1.1}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Inner corona */}
      <mesh ref={halo1Ref}>
        <sphereGeometry args={[2.44, 32, 32]} />
        <meshBasicMaterial color="#ff8800" transparent opacity={0.10} side={THREE.BackSide} />
      </mesh>

      {/* Outer corona */}
      <mesh ref={halo2Ref}>
        <sphereGeometry args={[2.80, 32, 32]} />
        <meshBasicMaterial color="#ff5500" transparent opacity={0.045} side={THREE.BackSide} />
      </mesh>

      {/* The light source that illuminates all planets */}
      <pointLight color="#fff8e7" intensity={260} distance={170} decay={2} />
    </group>
  )
}

// ─────────────────────────────────────────────
//  Subtle dashed orbital path ring
// ─────────────────────────────────────────────
function OrbitalPath({ radius }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.013, radius + 0.013, 200]} />
      <meshBasicMaterial color="#7799bb" transparent opacity={0.09} side={THREE.DoubleSide} />
    </mesh>
  )
}

// ─────────────────────────────────────────────
//  Generic planet (Mercury, Venus, Mars, Jupiter)
// ─────────────────────────────────────────────
function Planet({
  textureUrl,
  radius,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  axialTilt    = 0,
  initialAngle = 0,
  roughness    = 0.85,
  metalness    = 0.04,
  children,
}) {
  const map      = useTexture(textureUrl)
  const orbitRef = useRef()
  const meshRef  = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (orbitRef.current) orbitRef.current.rotation.y = initialAngle + t * orbitSpeed
    if (meshRef.current)  meshRef.current.rotation.y  = t * rotationSpeed
  })

  return (
    <group ref={orbitRef}>
      <group position={[orbitRadius, 0, 0]} rotation={[0, 0, axialTilt]}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshStandardMaterial map={map} roughness={roughness} metalness={metalness} />
        </mesh>
        {children}
      </group>
    </group>
  )
}

// ─────────────────────────────────────────────
//  Earth — day map + normal map + clouds + atm
// ─────────────────────────────────────────────
function Earth({ orbitRadius, orbitSpeed, initialAngle }) {
  const dayMap    = useTexture('/textures/2k_earth_daymap.jpg')
  const normalMap = useTexture('/textures/2k_earth_normal_map.jpg')
  const cloudMap  = useTexture('/textures/2k_earth_clouds.jpg')

  const orbitRef = useRef()
  const bodyRef  = useRef()
  const cloudRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (orbitRef.current) orbitRef.current.rotation.y = initialAngle + t * orbitSpeed
    if (bodyRef.current)  bodyRef.current.rotation.y  = t * 0.50
    if (cloudRef.current) cloudRef.current.rotation.y = t * 0.53
  })

  return (
    <group ref={orbitRef}>
      <group position={[orbitRadius, 0, 0]} rotation={[0, 0, 0.41]}>
        {/* Earth body */}
        <mesh ref={bodyRef}>
          <sphereGeometry args={[0.40, 64, 64]} />
          <meshStandardMaterial
            map={dayMap}
            normalMap={normalMap}
            normalScale={new THREE.Vector2(0.8, 0.8)}
            roughness={0.72}
            metalness={0.05}
          />
        </mesh>

        {/* Cloud layer — slightly larger sphere on top */}
        <mesh ref={cloudRef}>
          <sphereGeometry args={[0.412, 64, 64]} />
          <meshStandardMaterial
            map={cloudMap}
            transparent
            opacity={0.38}
            roughness={1}
            metalness={0}
            depthWrite={false}
          />
        </mesh>

        {/* Atmosphere rim glow */}
        <mesh>
          <sphereGeometry args={[0.436, 32, 32]} />
          <meshBasicMaterial
            color="#2266ff"
            transparent
            opacity={0.07}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  )
}

// ─────────────────────────────────────────────
//  Saturn — body + UV-corrected ring texture
// ─────────────────────────────────────────────
function Saturn({ orbitRadius, orbitSpeed, initialAngle }) {
  const bodyMap = useTexture('/textures/2k_saturn.jpg')
  const ringMap = useTexture('/textures/2k_saturn_ring_alpha.jpg')

  const orbitRef = useRef()
  const bodyRef  = useRef()

  // Build ring geometry with correct UV mapping
  const ringGeo = useMemo(() => buildRingGeometry(1.28, 2.22, 160), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (orbitRef.current) orbitRef.current.rotation.y = initialAngle + t * orbitSpeed
    if (bodyRef.current)  bodyRef.current.rotation.y  = t * 0.40
  })

  return (
    <group ref={orbitRef}>
      <group position={[orbitRadius, 0, 0]} rotation={[0, 0, 0.47]}>
        {/* Saturn body */}
        <mesh ref={bodyRef}>
          <sphereGeometry args={[0.92, 64, 64]} />
          <meshStandardMaterial map={bodyMap} roughness={0.80} metalness={0.04} />
        </mesh>

        {/* Ring system in equatorial plane */}
        <mesh geometry={ringGeo} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial
            map={ringMap}
            transparent
            opacity={0.90}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}

// ─────────────────────────────────────────────
//  Uranus — pale blue, tilted, thin rings
// ─────────────────────────────────────────────
function Uranus({ orbitRadius, orbitSpeed, initialAngle }) {
  const bodyMap  = useTexture('/textures/2k_uranus.jpg')
  const orbitRef = useRef()
  const bodyRef  = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (orbitRef.current) orbitRef.current.rotation.y = initialAngle + t * orbitSpeed
    // Uranus spins on its side
    if (bodyRef.current)  bodyRef.current.rotation.z  = t * 0.35
  })

  return (
    <group ref={orbitRef}>
      {/* Axial tilt ~98° */}
      <group position={[orbitRadius, 0, 0]} rotation={[0, 0, 1.71]}>
        <mesh ref={bodyRef}>
          <sphereGeometry args={[0.58, 64, 64]} />
          <meshStandardMaterial map={bodyMap} roughness={0.88} metalness={0.02} />
        </mesh>

        {/* Thin rings perpendicular to the tilted equator */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <ringGeometry args={[0.76, 0.94, 80]} />
          <meshBasicMaterial
            color="#88cccc"
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  )
}

// ─────────────────────────────────────────────
//  Full scene — lives inside <Suspense>
// ─────────────────────────────────────────────
function SolarSystem() {
  return (
    <>
      {/* Milky-way star field */}
      <Stars radius={200} depth={60} count={7000} factor={4.5} saturation={0.15} fade speed={0.25} />

      {/* Very dim ambient so planet dark sides aren't pure black */}
      <ambientLight intensity={0.022} />

      <Sun />

      {/* Orbital path rings */}
      <OrbitalPath radius={5.0}  />
      <OrbitalPath radius={7.2}  />
      <OrbitalPath radius={9.8}  />
      <OrbitalPath radius={12.8} />
      <OrbitalPath radius={18.5} />
      <OrbitalPath radius={25.0} />
      <OrbitalPath radius={30.5} />

      {/* Mercury */}
      <Planet
        textureUrl="/textures/2k_mercury.jpg"
        radius={0.18}
        orbitRadius={5.0}
        orbitSpeed={0.47}
        rotationSpeed={0.06}
        initialAngle={0.8}
        roughness={0.92}
      />

      {/* Venus */}
      <Planet
        textureUrl="/textures/2k_venus_surface.jpg"
        radius={0.32}
        orbitRadius={7.2}
        orbitSpeed={0.30}
        rotationSpeed={0.04}
        axialTilt={0.046}
        initialAngle={2.1}
        roughness={0.88}
      />

      {/* Earth */}
      <Earth orbitRadius={9.8} orbitSpeed={0.20} initialAngle={4.2} />

      {/* Mars */}
      <Planet
        textureUrl="/textures/2k_mars.jpg"
        radius={0.25}
        orbitRadius={12.8}
        orbitSpeed={0.14}
        rotationSpeed={0.50}
        axialTilt={0.44}
        initialAngle={1.5}
        roughness={0.92}
      />

      {/* Jupiter */}
      <Planet
        textureUrl="/textures/2k_jupiter.jpg"
        radius={1.18}
        orbitRadius={18.5}
        orbitSpeed={0.08}
        rotationSpeed={1.30}
        axialTilt={0.054}
        initialAngle={3.3}
        roughness={0.78}
      />

      {/* Saturn */}
      <Saturn orbitRadius={25.0} orbitSpeed={0.055} initialAngle={5.0} />

      {/* Uranus */}
      <Uranus orbitRadius={30.5} orbitSpeed={0.038} initialAngle={1.2} />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.08}
          luminanceSmoothing={0.92}
          height={400}
          intensity={2.5}
        />
      </EffectComposer>
    </>
  )
}

// ─────────────────────────────────────────────
//  Loading fallback while textures stream in
// ─────────────────────────────────────────────
function Loader() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.8
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshBasicMaterial color="#5ffbff" wireframe />
    </mesh>
  )
}

// ─────────────────────────────────────────────
//  Root export
// ─────────────────────────────────────────────
export default function HeroScene() {
  return (
    <div className="hero-canvas h-[360px] w-full md:h-[520px]">
      <Canvas
        camera={{ position: [0, 22, 48], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.80,
          antialias: true,
        }}
      >
        <color attach="background" args={['#00000e']} />

        <Suspense fallback={<Loader />}>
          <SolarSystem />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.28}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 5}
        />
      </Canvas>
    </div>
  )
}
