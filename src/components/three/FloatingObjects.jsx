import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import Spiderman from "./Spiderman";

function GlassPanel({ position, rotation, scale }) {
  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[1.6, 1, 0.06]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.12}
          roughness={0.1}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </Float>
  );
}

function Shape({ position, color, speed, geometry = "icosahedron" }) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh position={position}>
        {geometry === "icosahedron" && <icosahedronGeometry args={[0.35, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.28, 0.1, 16, 32]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[0.35, 0]} />}
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.6}
          emissive={color}
          emissiveIntensity={0.18}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingObjects() {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });
  const smoothed = useRef({ x: 0, y: 0 });
  const tilt = useRef({ x: 0, y: 0 });
  const seen = useRef(false);

  useEffect(() => {
    const handle = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      target.current.x = nx;
      target.current.y = ny;

      // First cursor event is a discovery, snap so there's no animation from origin
      if (!seen.current) {
        seen.current = true;
        smoothed.current.x = nx;
        smoothed.current.y = ny;
      }
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Cascade 1: smooth the raw pointer
    const LERP1 = 0.08;
    smoothed.current.x += (target.current.x - smoothed.current.x) * LERP1;
    smoothed.current.y += (target.current.y - smoothed.current.y) * LERP1;

    // Cascade 2: second filter for a lean rather than a snap
    const LERP2 = 0.12;
    tilt.current.x += (smoothed.current.x - tilt.current.x) * LERP2;
    tilt.current.y += (smoothed.current.y - tilt.current.y) * LERP2;

    // Yaw (y) and pitch (x) at ~2 degrees each, matching Kimi's small/linear turn
    const MAX_YAW = 0.04;   // ~2.3 degrees
    const MAX_PITCH = 0.045;

    groupRef.current.rotation.y = tilt.current.x * MAX_YAW;
    groupRef.current.rotation.x = -tilt.current.y * MAX_PITCH;

    // Subtle parallax of the whole group
    const PARALLAX = 0.06;
    groupRef.current.position.x = smoothed.current.x * PARALLAX;
    groupRef.current.position.y = smoothed.current.y * PARALLAX * 0.6;
  });

  const objects = useMemo(
    () => [
      { type: "panel", position: [-2.2, 0.6, -1], rotation: [0.2, -0.4, 0.1], scale: 0.7 },
      { type: "panel", position: [2.1, -0.5, -1.5], rotation: [-0.2, 0.5, -0.1], scale: 0.6 },
      { type: "shape", position: [-1.8, -1.3, 0.5], color: "#7c3aed", speed: 1.4, geometry: "icosahedron" },
      { type: "shape", position: [1.9, 1.4, 0.3], color: "#06b6d4", speed: 1.0, geometry: "torus" },
      { type: "shape", position: [-1.6, 1.5, 0], color: "#ec4899", speed: 1.6, geometry: "octahedron" },
    ],
    []
  );

  return (
    <group ref={groupRef}>
      <Spiderman position={[0, -0.3, 0]} scale={1.1} />
      {objects.map((o, i) =>
        o.type === "panel" ? (
          <GlassPanel key={i} {...o} />
        ) : (
          <Shape key={i} {...o} />
        )
      )}
    </group>
  );
}
