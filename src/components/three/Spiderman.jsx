import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

export default function Spiderman({ position = [0, 0, 0], scale = 1, reducedMotion = false }) {
  const groupRef = useRef();
  const headRef = useRef();
  const armLeftRef = useRef();
  const armRightRef = useRef();

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;

    // Idle — bobbing + sway + breathe
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.25;
      groupRef.current.rotation.z = Math.sin(t * 0.35) * 0.08;
      groupRef.current.rotation.y = Math.sin(t * 0.28) * 0.15;
      // Subtle scale breathe
      const s = 1 + Math.sin(t * 0.6) * 0.02;
      groupRef.current.scale.set(s, s, s);
    }

    // Head — scanning lebih jelas + nod
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.45) * 0.7;
      headRef.current.rotation.z = Math.sin(t * 0.6) * 0.15;
      headRef.current.rotation.x = Math.sin(t * 0.3) * 0.12;
    }

    // Arms — swing lebar + raise/lower
    if (armLeftRef.current) {
      armLeftRef.current.rotation.x = Math.sin(t * 0.55) * 0.6 - 0.2;
      armLeftRef.current.rotation.z = Math.sin(t * 0.4) * 0.25;
    }
    if (armRightRef.current) {
      armRightRef.current.rotation.x = -Math.sin(t * 0.55) * 0.6 - 0.2;
      armRightRef.current.rotation.z = -Math.sin(t * 0.4) * 0.25;
    }
  });

  // Spiderman colors
  const RED = "#dc2626";
  const RED_DARK = "#991b1b";
  const BLUE = "#1d4ed8";
  const BLUE_DARK = "#1e3a8a";
  const BLACK = "#0a0a0a";
  const WEB = "#1f1f1f";

  return (
    <Float
      speed={reducedMotion ? 0 : 1.2}
      rotationIntensity={reducedMotion ? 0 : 0.2}
      floatIntensity={reducedMotion ? 0 : 0.5}
    >
      <group ref={groupRef} position={position} scale={scale}>
        {/* ===== HEAD / MASK ===== */}
        <group ref={headRef} position={[0, 0.95, 0]}>
          {/* Mask base — red sphere */}
          <mesh>
            <sphereGeometry args={[0.42, 32, 32]} />
            <meshStandardMaterial
              color={RED}
              roughness={0.35}
              metalness={0.2}
              emissive={RED}
              emissiveIntensity={0.35}
            />
          </mesh>

          {/* Web pattern — wireframe overlay sphere slightly bigger */}
          <mesh scale={1.005}>
            <sphereGeometry args={[0.42, 16, 16]} />
            <meshBasicMaterial
              color={WEB}
              wireframe
              transparent
              opacity={0.5}
            />
          </mesh>

          {/* Web lines — vertical bands around head (torus rings) */}
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh
              key={i}
              position={[0, (i - 2) * 0.15, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <torusGeometry args={[0.42 * Math.cos((i - 2) * 0.35), 0.005, 8, 48]} />
              <meshBasicMaterial color={BLACK} />
            </mesh>
          ))}

          {/* LEFT eye — white lens with black outline */}
          <group position={[-0.17, 0.02, 0.36]} rotation={[0, -0.25, 0.15]}>
            <mesh>
              <sphereGeometry args={[0.11, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
              <meshStandardMaterial
                color="#f8fafc"
                roughness={0.05}
                metalness={0.3}
                emissive="#ffffff"
                emissiveIntensity={0.5}
              />
            </mesh>
            {/* Black outline */}
            <mesh position={[0, 0, -0.005]} scale={1.08}>
              <sphereGeometry args={[0.11, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
              <meshBasicMaterial color={BLACK} side={2} />
            </mesh>
          </group>

          {/* RIGHT eye */}
          <group position={[0.17, 0.02, 0.36]} rotation={[0, 0.25, -0.15]}>
            <mesh>
              <sphereGeometry args={[0.11, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
              <meshStandardMaterial
                color="#f8fafc"
                roughness={0.05}
                metalness={0.3}
                emissive="#ffffff"
                emissiveIntensity={0.5}
              />
            </mesh>
            <mesh position={[0, 0, -0.005]} scale={1.08}>
              <sphereGeometry args={[0.11, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
              <meshBasicMaterial color={BLACK} side={2} />
            </mesh>
          </group>

          {/* Spider emblem on forehead — tiny */}
          <mesh position={[0, 0.3, 0.3]} rotation={[0.6, 0, 0]}>
            <circleGeometry args={[0.025, 12]} />
            <meshBasicMaterial color={BLACK} />
          </mesh>
        </group>

        {/* ===== NECK ===== */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.12, 0.13, 0.1, 16]} />
          <meshStandardMaterial color={RED_DARK} roughness={0.5} metalness={0.2} />
        </mesh>

        {/* ===== BODY / TORSO ===== */}
        {/* Upper chest — red */}
        <mesh position={[0, 0.2, 0]}>
          <capsuleGeometry args={[0.38, 0.3, 8, 24]} />
          <meshStandardMaterial color={RED} roughness={0.4} metalness={0.15} emissive={RED} emissiveIntensity={0.25} />
        </mesh>

        {/* Chest web pattern */}
        <mesh position={[0, 0.2, 0.38]} rotation={[0, 0, 0]}>
          <circleGeometry args={[0.22, 24]} />
          <meshBasicMaterial color={WEB} wireframe transparent opacity={0.6} />
        </mesh>

        {/* Spider emblem on chest — bigger version */}
        <group position={[0, 0.22, 0.39]}>
          {/* Body of spider */}
          <mesh>
            <capsuleGeometry args={[0.018, 0.06, 4, 8]} />
            <meshBasicMaterial color={BLACK} />
          </mesh>
          {/* 8 legs — 4 each side */}
          {[0, 1, 2, 3].map((i) => (
            <group key={i}>
              <mesh
                position={[-0.05 - i * 0.015, 0.02 + i * 0.015, 0]}
                rotation={[0, 0, Math.PI / 3 + i * 0.15]}
              >
                <capsuleGeometry args={[0.006, 0.05, 4, 6]} />
                <meshBasicMaterial color={BLACK} />
              </mesh>
              <mesh
                position={[0.05 + i * 0.015, 0.02 + i * 0.015, 0]}
                rotation={[0, 0, -Math.PI / 3 - i * 0.15]}
              >
                <capsuleGeometry args={[0.006, 0.05, 4, 6]} />
                <meshBasicMaterial color={BLACK} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Lower torso — blue */}
        <mesh position={[0, -0.35, 0]}>
          <capsuleGeometry args={[0.36, 0.35, 8, 24]} />
          <meshStandardMaterial color={BLUE} roughness={0.4} metalness={0.15} emissive={BLUE} emissiveIntensity={0.2} />
        </mesh>

        {/* Belt */}
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[0.37, 0.37, 0.08, 24]} />
          <meshStandardMaterial color={RED_DARK} roughness={0.5} metalness={0.2} />
        </mesh>

        {/* ===== LEFT ARM ===== */}
        <group ref={armLeftRef} position={[-0.5, 0.2, 0]}>
          {/* Upper arm — red */}
          <mesh position={[0, -0.15, 0]}>
            <capsuleGeometry args={[0.1, 0.3, 6, 16]} />
            <meshStandardMaterial color={RED} roughness={0.4} metalness={0.15} emissive={RED} emissiveIntensity={0.25} />
          </mesh>
          {/* Forearm — blue */}
          <mesh position={[0, -0.55, 0]}>
            <capsuleGeometry args={[0.09, 0.28, 6, 16]} />
            <meshStandardMaterial color={BLUE} roughness={0.4} metalness={0.15} emissive={BLUE} emissiveIntensity={0.2} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.8, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={RED_DARK} roughness={0.4} metalness={0.2} />
          </mesh>
        </group>

        {/* ===== RIGHT ARM ===== */}
        <group ref={armRightRef} position={[0.5, 0.2, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <capsuleGeometry args={[0.1, 0.3, 6, 16]} />
            <meshStandardMaterial color={RED} roughness={0.4} metalness={0.15} emissive={RED} emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[0, -0.55, 0]}>
            <capsuleGeometry args={[0.09, 0.28, 6, 16]} />
            <meshStandardMaterial color={BLUE} roughness={0.4} metalness={0.15} emissive={BLUE} emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0, -0.8, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={RED_DARK} roughness={0.4} metalness={0.2} />
          </mesh>
        </group>

        {/* ===== LEFT LEG ===== */}
        {/* Thigh — blue */}
        <mesh position={[-0.17, -0.95, 0]}>
          <capsuleGeometry args={[0.14, 0.35, 6, 16]} />
          <meshStandardMaterial color={BLUE} roughness={0.4} metalness={0.15} emissive={BLUE} emissiveIntensity={0.2} />
        </mesh>
        {/* Shin — blue */}
        <mesh position={[-0.17, -1.4, 0]}>
          <capsuleGeometry args={[0.12, 0.28, 6, 16]} />
          <meshStandardMaterial color={BLUE} roughness={0.4} metalness={0.15} emissive={BLUE} emissiveIntensity={0.2} />
        </mesh>
        {/* Boot — red */}
        <mesh position={[-0.17, -1.7, 0.05]}>
          <boxGeometry args={[0.22, 0.16, 0.32]} />
          <meshStandardMaterial color={RED} roughness={0.4} metalness={0.2} />
        </mesh>

        {/* ===== RIGHT LEG ===== */}
        <mesh position={[0.17, -0.95, 0]}>
          <capsuleGeometry args={[0.14, 0.35, 6, 16]} />
          <meshStandardMaterial color={BLUE} roughness={0.4} metalness={0.15} emissive={BLUE} emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.17, -1.4, 0]}>
          <capsuleGeometry args={[0.12, 0.28, 6, 16]} />
          <meshStandardMaterial color={BLUE} roughness={0.4} metalness={0.15} emissive={BLUE} emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.17, -1.7, 0.05]}>
          <boxGeometry args={[0.22, 0.16, 0.32]} />
          <meshStandardMaterial color={RED} roughness={0.4} metalness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}
