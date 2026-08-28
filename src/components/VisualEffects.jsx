import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VisualEffects() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: -200, y: -200 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(
        window.matchMedia("(pointer: fine)").matches &&
        window.innerWidth > 768
      );
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const height =
            document.documentElement.scrollHeight - window.innerHeight;

          setScrollProgress(
            height > 0 ? (scrollTop / height) * 100 : 0
          );

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    updateProgress();

    return () =>
      window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let frame;

    const handleMouseMove = (event) => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        setMouse({
          x: event.clientX,
          y: event.clientY,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDesktop]);

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
        }

        .visual-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .visual-grid {
          position: absolute;
          inset: 0;
          opacity: .18;
          background-image:
            linear-gradient(
              rgba(255,255,255,.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.035) 1px,
              transparent 1px
            );
          background-size: 55px 55px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 85%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            black,
            transparent 85%
          );
        }

        .visual-noise {
          position: absolute;
          inset: 0;
          opacity: .025;
          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }

        .visual-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: .13;
          will-change: transform;
        }

        .visual-orb-one {
          width: 380px;
          height: 380px;
          top: 8%;
          left: -140px;
          background: var(--accent-blue);
        }

        .visual-orb-two {
          width: 420px;
          height: 420px;
          top: 45%;
          right: -180px;
          background: var(--accent);
        }

        .visual-orb-three {
          width: 280px;
          height: 280px;
          bottom: 4%;
          left: 38%;
          background: #8b5cf6;
          opacity: .08;
        }

        .scroll-progress-track {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          z-index: 1000;
          background: transparent;
          pointer-events: none;
        }

        .scroll-progress-bar {
          height: 100%;
          transform-origin: left;
          background: linear-gradient(
            90deg,
            var(--accent-blue),
            var(--accent),
            #a78bfa
          );
          box-shadow:
            0 0 10px var(--accent-blue),
            0 0 20px var(--accent-blue);
        }

        .cursor-glow {
          position: fixed;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            rgba(34,211,238,.08),
            rgba(34,211,238,.025) 35%,
            transparent 70%
          );
          filter: blur(4px);
          will-change: left, top;
        }

        @media (max-width: 768px) {
          .visual-grid {
            background-size: 42px 42px;
          }

          .visual-orb {
            filter: blur(70px);
            opacity: .08;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .visual-orb {
            display: none;
          }
        }
      `}</style>

      <div className="visual-background" aria-hidden="true">
        <div className="visual-grid" />

        <motion.div
          className="visual-orb visual-orb-one"
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="visual-orb visual-orb-two"
          animate={{
            x: [0, -70, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="visual-orb visual-orb-three"
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="visual-noise" />
      </div>

      <div className="scroll-progress-track">
        <motion.div
          className="scroll-progress-bar"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      {isDesktop && (
        <motion.div
          className="cursor-glow"
          animate={{
            left: mouse.x,
            top: mouse.y,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 28,
            mass: 0.35,
          }}
        />
      )}
    </>
  );
}
