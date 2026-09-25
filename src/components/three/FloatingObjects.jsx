import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function GlassPanel({ position, rotation, scale }) {
  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[1.6, 1, 0.06]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
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
        {geometry === "icosahedron" && <icosahedronGeometry args={[0.5, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.4, 0.15, 16, 32]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[0.5, 0]} />}
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
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    current.current.x += (target.current.x * 0.35 - current.current.x) * 0.045;
    current.current.y += (target.current.y * 0.25 - current.current.y) * 0.045;
    groupRef.current.rotation.y = current.current.x;
    groupRef.current.rotation.x = -current.current.y;
  });

  const objects = useMemo(
    () => [
      { type: "panel", position: [-1.8, 0.4, 0], rotation: [0.2, -0.4, 0.1], scale: 1 },
      { type: "panel", position: [1.9, -0.3, -0.5], rotation: [-0.2, 0.5, -0.1], scale: 0.85 },
      { type: "panel", position: [0.2, 1.2, -1], rotation: [0.3, 0.2, 0.15], scale: 0.7 },
      { type: "shape", position: [-1.2, -1.2, 0.5], color: "#7c3aed", speed: 1.4, geometry: "icosahedron" },
      { type: "shape", position: [1.4, 1.4, 0.3], color: "#06b6d4", speed: 1.0, geometry: "torus" },
      { type: "shape", position: [0, -0.8, 1], color: "#ec4899", speed: 1.6, geometry: "octahedron" },
    ],
    []
  );

  return (
    <group ref={groupRef}>
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
