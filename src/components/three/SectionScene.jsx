import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Lighting from "./Lighting";
import Spiderman from "./Spiderman";

/**
 * Minimal shape fallback — icosahedron kecil.
 */
function MiniShape({ color = "#06b6d4" }) {
  return (
    <mesh>
      <icosahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color={color}
        roughness={0.25}
        metalness={0.6}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

/**
 * Canvas mini untuk section. Auto-pause saat out-of-view atau tab inactive.
 *
 * Props:
 *  - object: "spiderman" | "shape" | "none"
 *  - position: "left" | "right" | "center"
 *  - scale: number
 *  - opacity: number (0-1)
 *  - color: warna shape
 */
export default function SectionScene({
  object = "spiderman",
  position = "right",
  scale = 1,
  opacity = 0.55,
  color = "#06b6d4",
  cameraZ = 5,
}) {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [tabActive, setTabActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Cek prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMqChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", onMqChange);

    // IntersectionObserver — pause saat out-of-view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );
    observer.observe(el);

    // Tab visibility
    const onVis = () => setTabActive(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener?.("change", onMqChange);
    };
  }, []);

  const shouldRender = isVisible && tabActive && !reducedMotion;

  // Position: CSS horizontal offset
  const positionStyle =
    position === "left"
      ? { left: "5%", right: "auto" }
      : position === "right"
      ? { right: "5%", left: "auto" }
      : { left: "50%", transform: "translateX(-50%)" };

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "min(360px, 40vw)",
        zIndex: 0,
        pointerEvents: "none",
        opacity: opacity,
        ...positionStyle,
      }}
    >
      <Canvas
        dpr={[1, 1]}
        frameloop={shouldRender ? "always" : "demand"}
        camera={{ position: [0, 0, cameraZ], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <group scale={scale}>
            {object === "spiderman" && <Spiderman position={[0, -0.3, 0]} scale={1} />}
            {object === "shape" && <MiniShape color={color} />}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
