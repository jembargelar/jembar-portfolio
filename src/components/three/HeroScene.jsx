import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Lighting from "./Lighting";
import FloatingObjects from "./FloatingObjects";

export default function HeroScene({ cameraZ = 6, fov = 45 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1]}
        camera={{ position: [0, 0, cameraZ], fov }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <FloatingObjects />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
