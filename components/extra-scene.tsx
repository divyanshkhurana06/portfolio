"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useTheme } from "next-themes";
import { Suspense, useMemo, useRef } from "react";
import {
  Color,
  type InstancedMesh,
  Object3D,
  Plane,
  Vector3,
} from "three";

/* -------------------------------------------------------------------------- */
/*  A field of instanced columns. Each column reads its world-space distance */
/*  from the cursor's raycast hit on the ground plane and rides a damped     */
/*  sine wave radiating outward, so the surface ripples wherever you point.  */
/*  When the cursor goes idle, two slow drift waves fade in so the field    */
/*  never sits perfectly still.                                              */
/* -------------------------------------------------------------------------- */

const COLS = 38;
const ROWS = 38;
const SPACING = 0.2;
const COUNT = COLS * ROWS;

function CursorField({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<InstancedMesh>(null);

  // Cheap reused scratch objects — never re-allocate in the frame loop.
  const dummy = useMemo(() => new Object3D(), []);
  const plane = useMemo(() => new Plane(new Vector3(0, 1, 0), 0), []);
  const hit = useMemo(() => new Vector3(), []);
  const target = useMemo(() => new Vector3(), []);
  const mouse = useMemo(() => new Vector3(), []);
  const tmpColor = useMemo(() => new Color(), []);

  // Two-stop gradient. Peaks ride toward the accent; troughs stay quiet.
  const baseColor = useMemo(
    () => new Color(isDark ? "#1f1c1a" : "#d6cfc1"),
    [isDark]
  );
  const accentColor = useMemo(() => new Color("#f59e0b"), []);

  const lastMoveAtRef = useRef(-10);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const { raycaster, camera, pointer, clock } = useThree();

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Project the 2D pointer onto the ground plane in world space. We
    // only update the wave's source when the pointer actually moves —
    // gives us a clean "idle" signal a few hundred ms after the user
    // stops moving the mouse, so the ambient drift can fade in.
    const moved =
      pointer.x !== lastPointerRef.current.x ||
      pointer.y !== lastPointerRef.current.y;
    if (moved) {
      lastPointerRef.current = { x: pointer.x, y: pointer.y };
      raycaster.setFromCamera(pointer, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        target.copy(hit);
        lastMoveAtRef.current = clock.elapsedTime;
      }
    }

    // Smooth pointer chase so quick cursor jumps don't snap the ripple.
    mouse.lerp(target, 0.18);

    const t = clock.elapsedTime;
    const sinceMove = t - lastMoveAtRef.current;
    // Idle waves ease in over ~600ms after the cursor goes quiet.
    const idleMix = clamp01((sinceMove - 0.3) * 1.6);

    let i = 0;
    for (let cx = 0; cx < COLS; cx++) {
      for (let cz = 0; cz < ROWS; cz++) {
        const x = (cx - (COLS - 1) / 2) * SPACING;
        const z = (cz - (ROWS - 1) / 2) * SPACING;

        const dx = x - mouse.x;
        const dz = z - mouse.z;
        const d = Math.sqrt(dx * dx + dz * dz);

        // Damped sine radiating out from the cursor hit point.
        const ripple = Math.sin(d * 4.5 - t * 3.4) * Math.exp(-d * 0.55) * 0.85;

        // Two crossing drifts so the idle motion never looks like a grid.
        const driftA = Math.sin(t * 0.55 + cx * 0.28 + cz * 0.21) * 0.18;
        const driftB = Math.cos(t * 0.4 - cx * 0.18 + cz * 0.32) * 0.14;
        const idle = (driftA + driftB) * idleMix;

        const wave = ripple + idle;
        const intensity = clamp01(Math.abs(wave) * 1.6);

        dummy.position.set(x, wave * 0.45, z);
        dummy.scale.set(1, 1 + intensity * 5.5, 1);
        // Tilt each column slightly with the wave for a more tactile feel.
        dummy.rotation.set(wave * 0.18, 0, wave * -0.18);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        tmpColor.copy(baseColor).lerp(accentColor, intensity);
        mesh.setColorAt(i, tmpColor);

        i++;
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, COUNT]}
      castShadow
      receiveShadow
      // Bounds change every frame; let the renderer keep us in view.
      frustumCulled={false}
    >
      <boxGeometry args={[0.085, 0.45, 0.085]} />
      <meshStandardMaterial roughness={0.38} metalness={0.42} />
    </instancedMesh>
  );
}

function GroundPlane({ color }: { color: string }) {
  return (
    <mesh
      rotation-x={-Math.PI / 2}
      position-y={-0.35}
      receiveShadow
    >
      <planeGeometry args={[24, 24]} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}

function Loader() {
  return (
    <Html center>
      <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
        warming up…
      </p>
    </Html>
  );
}

export function ExtraScene() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const bg = isDark ? "#0c0b0a" : "#eeeae0";
  const groundColor = isDark ? "#141211" : "#e2dbcb";

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 3.2, 5.4], fov: 38 }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, 5.5, 13]} />

      <ambientLight intensity={isDark ? 0.35 : 0.55} />
      <directionalLight
        position={[3, 8, 4]}
        intensity={isDark ? 1.1 : 1.45}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      {/* Warm accent rim from the back-left so the column tops catch fire. */}
      <pointLight position={[-4, 1.5, -3]} intensity={1.4} color="#f59e0b" />
      {/* Cool fill so the field isn't entirely amber. */}
      <pointLight position={[4, 1, 3]} intensity={0.5} color="#3b82f6" />

      <Suspense fallback={<Loader />}>
        <GroundPlane color={groundColor} />
        <CursorField isDark={isDark} />
      </Suspense>

      {/* Drag to rotate. Zoom is off so the page can still scroll past
          this canvas without it stealing the wheel. */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.15}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
