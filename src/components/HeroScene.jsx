// HeroScene.jsx
// Realistic Solar System — drop this file in place of your old HeroScene.jsx
// See the TEXTURE SETUP comment at the bottom before running.

import { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture, useProgress, Stars, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const HERO_TEXTURES = [
  '/textures/2k_sun.jpg',
  '/textures/2k_mercury.jpg',
  '/textures/2k_venus_surface.jpg',
  '/textures/2k_earth_daymap.jpg',
  '/textures/2k_earth_normal_map.jpg',
  '/textures/2k_earth_clouds.jpg',
  '/textures/2k_mars.jpg',
  '/textures/2k_jupiter.jpg',
  '/textures/2k_saturn.jpg',
  '/textures/2k_saturn_ring_alpha.jpg',
  '/textures/2k_uranus.jpg',
]

HERO_TEXTURES.forEach((textureUrl) => useTexture.preload(textureUrl))

const HOME_CAMERA_POSITION = new THREE.Vector3(0, 19, 38)
const HOME_CAMERA_TARGET = new THREE.Vector3(0, 0, 0)

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
function Sun({ onFocus }) {
  const sunMap   = useTexture('/textures/2k_sun.jpg')
  const groupRef = useRef()
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
    <group ref={groupRef}>
      {/* Main body */}
      <mesh
        ref={bodyRef}
        onDoubleClick={(event) => {
          event.stopPropagation()
          onFocus?.(groupRef.current, 2.2, 'Sun')
        }}
      >
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
  name,
  textureUrl,
  radius,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  axialTilt    = 0,
  initialAngle = 0,
  roughness    = 0.85,
  metalness    = 0.04,
  paused,
  onFocus,
  children,
}) {
  const map      = useTexture(textureUrl)
  const orbitRef = useRef()
  const groupRef = useRef()
  const meshRef  = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (orbitRef.current && !paused) orbitRef.current.rotation.y = initialAngle + t * orbitSpeed
    if (meshRef.current)  meshRef.current.rotation.y  = t * rotationSpeed
  })

  return (
    <group ref={orbitRef}>
      <group ref={groupRef} position={[orbitRadius, 0, 0]} rotation={[0, 0, axialTilt]}>
        <mesh
          ref={meshRef}
          onDoubleClick={(event) => {
            event.stopPropagation()
            onFocus?.(groupRef.current, radius, name)
          }}
        >
          <sphereGeometry args={[radius, 64, 64]} />
          <meshStandardMaterial map={map} roughness={roughness} metalness={metalness} />
        </mesh>
        <mesh>
          <sphereGeometry args={[radius * 1.06, 32, 32]} />
          <meshBasicMaterial
            color="#7dd3fc"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
        {children}
      </group>
    </group>
  )
}

// ─────────────────────────────────────────────
//  Earth — day map + normal map + clouds + atm
// ─────────────────────────────────────────────
function Earth({ orbitRadius, orbitSpeed, initialAngle, paused, onFocus }) {
  const dayMap    = useTexture('/textures/2k_earth_daymap.jpg')
  const normalMap = useTexture('/textures/2k_earth_normal_map.jpg')
  const cloudMap  = useTexture('/textures/2k_earth_clouds.jpg')

  const orbitRef = useRef()
  const groupRef = useRef()
  const bodyRef  = useRef()
  const cloudRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (orbitRef.current && !paused) orbitRef.current.rotation.y = initialAngle + t * orbitSpeed
    if (bodyRef.current)  bodyRef.current.rotation.y  = t * 0.50
    if (cloudRef.current) cloudRef.current.rotation.y = t * 0.53
  })

  return (
    <group ref={orbitRef}>
      <group ref={groupRef} position={[orbitRadius, 0, 0]} rotation={[0, 0, 0.41]}>
        {/* Earth body */}
        <mesh
          ref={bodyRef}
          onDoubleClick={(event) => {
            event.stopPropagation()
            onFocus?.(groupRef.current, 0.40, 'Earth')
          }}
        >
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
            color="#60a5fa"
            transparent
            opacity={0.10}
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
function Saturn({ orbitRadius, orbitSpeed, initialAngle, paused, onFocus }) {
  const bodyMap = useTexture('/textures/2k_saturn.jpg')
  const ringMap = useTexture('/textures/2k_saturn_ring_alpha.jpg')

  const orbitRef = useRef()
  const groupRef = useRef()
  const bodyRef  = useRef()

  // Build ring geometry with correct UV mapping
  const ringGeo = useMemo(() => buildRingGeometry(1.28, 2.22, 160), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (orbitRef.current && !paused) orbitRef.current.rotation.y = initialAngle + t * orbitSpeed
    if (bodyRef.current)  bodyRef.current.rotation.y  = t * 0.40
  })

  return (
    <group ref={orbitRef}>
      <group ref={groupRef} position={[orbitRadius, 0, 0]} rotation={[0, 0, 0.47]}>
        {/* Saturn body */}
        <mesh
          ref={bodyRef}
          onDoubleClick={(event) => {
            event.stopPropagation()
            onFocus?.(groupRef.current, 0.92, 'Saturn')
          }}
        >
          <sphereGeometry args={[0.92, 64, 64]} />
          <meshStandardMaterial map={bodyMap} roughness={0.80} metalness={0.04} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.976, 32, 32]} />
          <meshBasicMaterial
            color="#fde68a"
            transparent
            opacity={0.075}
            side={THREE.BackSide}
          />
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
function Uranus({ orbitRadius, orbitSpeed, initialAngle, paused, onFocus }) {
  const bodyMap  = useTexture('/textures/2k_uranus.jpg')
  const orbitRef = useRef()
  const groupRef = useRef()
  const bodyRef  = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (orbitRef.current && !paused) orbitRef.current.rotation.y = initialAngle + t * orbitSpeed
    // Uranus spins on its side
    if (bodyRef.current)  bodyRef.current.rotation.z  = t * 0.35
  })

  return (
    <group ref={orbitRef}>
      {/* Axial tilt ~98° */}
      <group ref={groupRef} position={[orbitRadius, 0, 0]} rotation={[0, 0, 1.71]}>
        <mesh
          ref={bodyRef}
          onDoubleClick={(event) => {
            event.stopPropagation()
            onFocus?.(groupRef.current, 0.58, 'Uranus')
          }}
        >
          <sphereGeometry args={[0.58, 64, 64]} />
          <meshStandardMaterial map={bodyMap} roughness={0.88} metalness={0.02} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.615, 32, 32]} />
          <meshBasicMaterial
            color="#a5f3fc"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
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
function SolarSystem({ paused, onFocus }) {
  return (
    <>
      {/* Milky-way star field */}
      <Stars radius={200} depth={60} count={7000} factor={4.5} saturation={0.15} fade speed={0.25} />

      {/* Very dim ambient so planet dark sides aren't pure black */}
      <ambientLight intensity={0.055} />
      <hemisphereLight args={['#8fdcff', '#080014', 0.18]} />

      <group rotation={[0.18, -0.25, 0]}>
        <Sun onFocus={onFocus} />

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
          name="Mercury"
          textureUrl="/textures/2k_mercury.jpg"
          radius={0.18}
          orbitRadius={5.0}
          orbitSpeed={0.47}
          rotationSpeed={0.06}
          initialAngle={0.8}
          roughness={0.92}
          paused={paused}
          onFocus={onFocus}
        />

        {/* Venus */}
        <Planet
          name="Venus"
          textureUrl="/textures/2k_venus_surface.jpg"
          radius={0.32}
          orbitRadius={7.2}
          orbitSpeed={0.30}
          rotationSpeed={0.04}
          axialTilt={0.046}
          initialAngle={2.1}
          roughness={0.88}
          paused={paused}
          onFocus={onFocus}
        />

        {/* Earth */}
        <Earth orbitRadius={9.8} orbitSpeed={0.20} initialAngle={4.2} paused={paused} onFocus={onFocus} />

        {/* Mars */}
        <Planet
          name="Mars"
          textureUrl="/textures/2k_mars.jpg"
          radius={0.25}
          orbitRadius={12.8}
          orbitSpeed={0.14}
          rotationSpeed={0.50}
          axialTilt={0.44}
          initialAngle={1.5}
          roughness={0.92}
          paused={paused}
          onFocus={onFocus}
        />

        {/* Jupiter */}
        <Planet
          name="Jupiter"
          textureUrl="/textures/2k_jupiter.jpg"
          radius={1.18}
          orbitRadius={18.5}
          orbitSpeed={0.08}
          rotationSpeed={1.30}
          axialTilt={0.054}
          initialAngle={3.3}
          roughness={0.78}
          paused={paused}
          onFocus={onFocus}
        />

        {/* Saturn */}
        <Saturn orbitRadius={25.0} orbitSpeed={0.055} initialAngle={5.0} paused={paused} onFocus={onFocus} />

        {/* Uranus */}
        <Uranus orbitRadius={30.5} orbitSpeed={0.038} initialAngle={1.2} paused={paused} onFocus={onFocus} />
      </group>

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.18}
          luminanceSmoothing={0.92}
          height={400}
          intensity={1.35}
        />
      </EffectComposer>
    </>
  )
}

function FocusCamera({ focusTarget, isReturningHome, controlsRef, onFocusSettled, onReturnComplete }) {
  const targetPosition = useMemo(() => new THREE.Vector3(), [])
  const desiredPosition = useMemo(() => new THREE.Vector3(), [])
  const cameraOffset = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ camera }, delta) => {
    if (!controlsRef.current) return

    if (isReturningHome) {
      const smooth = 1 - Math.exp(-delta * 3.2)
      camera.position.lerp(HOME_CAMERA_POSITION, smooth)
      controlsRef.current.target.lerp(HOME_CAMERA_TARGET, smooth)
      controlsRef.current.update()

      if (
        camera.position.distanceTo(HOME_CAMERA_POSITION) < 0.04 &&
        controlsRef.current.target.distanceTo(HOME_CAMERA_TARGET) < 0.04
      ) {
        camera.position.copy(HOME_CAMERA_POSITION)
        controlsRef.current.target.copy(HOME_CAMERA_TARGET)
        controlsRef.current.update()
        onReturnComplete?.()
      }

      return
    }

    if (!focusTarget?.object) return

    focusTarget.object.getWorldPosition(targetPosition)

    if (focusTarget.settled) {
      controlsRef.current.target.copy(targetPosition)
      controlsRef.current.update()
      return
    }

    const radius = focusTarget.radius
    cameraOffset.set(0, Math.max(0.9, radius * 1.7), Math.max(2.2, radius * 4.2))
    desiredPosition.copy(targetPosition).add(cameraOffset)

    const smooth = 1 - Math.exp(-delta * 3.5)
    camera.position.lerp(desiredPosition, smooth)
    controlsRef.current.target.lerp(targetPosition, smooth)
    controlsRef.current.update()

    if (
      camera.position.distanceTo(desiredPosition) < 0.05 &&
      controlsRef.current.target.distanceTo(targetPosition) < 0.05
    ) {
      onFocusSettled?.()
    }
  })

  return null
}

function CanvasResizeStabilizer() {
  const { gl, camera, invalidate } = useThree()

  useEffect(() => {
    const resizeCanvas = () => {
      const container = gl.domElement.parentElement
      if (!container) return

      const width = container.clientWidth
      const height = container.clientHeight
      if (width <= 0 || height <= 0) return

      gl.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      invalidate()
    }

    const container = gl.domElement.parentElement
    const observer = container ? new ResizeObserver(resizeCanvas) : null

    if (container) observer?.observe(container)

    const animationFrame = window.requestAnimationFrame(resizeCanvas)
    const timeouts = [80, 180, 450, 900, 1400].map((delay) => window.setTimeout(resizeCanvas, delay))
    window.addEventListener('load', resizeCanvas)
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      observer?.disconnect()
      timeouts.forEach((timeout) => window.clearTimeout(timeout))
      window.removeEventListener('load', resizeCanvas)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [camera, gl, invalidate])

  return null
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

function SceneLoadingOverlay() {
  const { active, progress } = useProgress()
  const safeProgress = Math.round(progress)
  const visible = active || progress < 100

  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center rounded-[1.5rem] bg-slate-950/95 backdrop-blur-md transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex w-48 flex-col items-center gap-4">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border border-cyan-300/20" />
          <div className="absolute inset-2 rounded-full border border-fuchsia-300/15" />
          <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300 shadow-[0_0_34px_rgba(251,146,60,0.75)]" />
          <div className="absolute inset-0 animate-spin rounded-full border-t border-cyan-200/80" />
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.7)] transition-[width] duration-300"
            style={{ width: `${Math.min(100, safeProgress)}%` }}
          />
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-100">
          Loading system {Math.min(100, safeProgress)}%
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
//  Root export
// ─────────────────────────────────────────────
export default function HeroScene() {
  const controlsRef = useRef()
  const [focusTarget, setFocusTarget] = useState(null)
  const [isReturningHome, setIsReturningHome] = useState(false)

  const resetView = () => {
    setFocusTarget(null)
    setIsReturningHome(true)
  }

  return (
    <div className="hero-canvas relative h-[360px] min-h-[360px] w-full overflow-hidden rounded-[1.5rem] md:h-[520px] md:min-h-[520px]">
      <Canvas
        className="!absolute !inset-0 !h-full !w-full"
        style={{ height: '100%', width: '100%' }}
        camera={{ position: HOME_CAMERA_POSITION.toArray(), fov: 50 }}
        dpr={[1, 2]}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.80,
          antialias: true,
        }}
      >
        <color attach="background" args={['#00000e']} />

        <Suspense fallback={<Loader />}>
          <SolarSystem
            paused={Boolean(focusTarget)}
            onFocus={(object, radius, name) => {
              if (!object) return
              setIsReturningHome(false)
              setFocusTarget({ object, radius, name, settled: false })
            }}
          />
          <FocusCamera
            focusTarget={focusTarget}
            isReturningHome={isReturningHome}
            controlsRef={controlsRef}
            onFocusSettled={() => {
              setFocusTarget((current) => current ? { ...current, settled: true } : current)
            }}
            onReturnComplete={() => setIsReturningHome(false)}
          />
          <CanvasResizeStabilizer />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          autoRotate={!focusTarget && !isReturningHome}
          autoRotateSpeed={0.28}
          maxPolarAngle={focusTarget ? Math.PI : Math.PI / 2.2}
          minPolarAngle={focusTarget ? 0 : Math.PI / 5}
        />
      </Canvas>
      {(focusTarget || isReturningHome) && (
        <button
          type="button"
          onClick={resetView}
          disabled={isReturningHome}
          className="absolute right-4 top-4 rounded-full border border-cyan-300/25 bg-slate-950/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.16)] backdrop-blur-md transition hover:border-cyan-200/50 hover:bg-cyan-300/10"
        >
          Reset
        </button>
      )}
      {focusTarget && (
        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 shadow-[0_0_30px_rgba(34,211,238,0.14)] backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.32em] text-cyan-200">Focused body</p>
          <p className="mt-1 font-display text-2xl text-white">{focusTarget.name}</p>
          <div className="mt-2 h-px w-20 bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-transparent" />
        </div>
      )}
      <SceneLoadingOverlay />
    </div>
  )
}
