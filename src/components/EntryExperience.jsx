import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "jembar-entry-seen";

export default function EntryExperience({ onEnter }) {
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener?.("change", update);

    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY);

      if (seen === "true") {
        setVisible(false);
        onEnter?.();
      }
    } catch {
      // sessionStorage can be unavailable in some browser contexts.
    }
  }, [onEnter]);

  const enter = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors.
    }

    setVisible(false);

    window.setTimeout(() => {
      onEnter?.();
    }, reducedMotion ? 0 : 450);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="entry"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: reducedMotion ? 0 : 0.45,
          ease: "easeInOut",
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          overflow: "hidden",
          background:
            "radial-gradient(circle at 50% 42%, rgba(34,211,238,.10), transparent 30%), #020617",
          color: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          isolation: "isolate",
        }}
      >
        {/* Background grid */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.18,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(circle at center, black 20%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 20%, transparent 78%)",
          }}
        />

        {/* Glow */}
        <motion.div
          aria-hidden="true"
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                  opacity: [0.25, 0.4, 0.25],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          style={{
            position: "absolute",
            width: "min(70vw, 520px)",
            height: "min(70vw, 520px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,211,238,.16), transparent 68%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />

        <motion.main
          initial={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 18, scale: 0.97 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "relative",
            zIndex: 2,
            width: "min(90vw, 760px)",
            textAlign: "center",
            padding: "32px 20px",
          }}
        >
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reducedMotion ? 0 : 0.15, duration: 0.5 }}
            style={{
              fontSize: "clamp(.7rem, 1.5vw, .85rem)",
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: "rgba(148,163,184,.9)",
              marginBottom: "22px",
            }}
          >
            Digital Portfolio
          </motion.div>

          <motion.h1
            initial={
              reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reducedMotion ? 0 : 0.25,
              duration: reducedMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              margin: 0,
              fontSize: "clamp(3rem, 11vw, 7rem)",
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: "-.06em",
            }}
          >
            JEMBAR
            <span
              style={{
                color: "#22d3ee",
                textShadow: "0 0 35px rgba(34,211,238,.35)",
              }}
            >
              .DEV
            </span>
          </motion.h1>

          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: reducedMotion ? 0 : 0.55,
              duration: reducedMotion ? 0 : 0.6,
            }}
            style={{
              margin: "22px auto 0",
              maxWidth: "520px",
              color: "rgba(203,213,225,.78)",
              fontSize: "clamp(.9rem, 2vw, 1.05rem)",
              lineHeight: 1.7,
            }}
          >
            Building digital solutions for modern business operations.
          </motion.p>

          <motion.button
            type="button"
            onClick={enter}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reducedMotion ? 0 : 0.75,
              duration: reducedMotion ? 0 : 0.6,
            }}
            whileHover={
              reducedMotion
                ? undefined
                : {
                    scale: 1.04,
                    boxShadow: "0 0 42px rgba(34,211,238,.28)",
                  }
            }
            whileTap={{ scale: 0.97 }}
            style={{
              marginTop: "38px",
              minWidth: "170px",
              minHeight: "54px",
              padding: "14px 28px",
              borderRadius: "999px",
              border: "1px solid rgba(34,211,238,.55)",
              background:
                "linear-gradient(135deg, rgba(34,211,238,.18), rgba(59,130,246,.14))",
              color: "#f8fafc",
              fontWeight: 800,
              fontSize: ".9rem",
              letterSpacing: ".16em",
              cursor: "pointer",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: "0 0 25px rgba(34,211,238,.10)",
            }}
          >
            ENTER
            <span style={{ marginLeft: "10px" }}>→</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: reducedMotion ? 0 : 1,
              duration: reducedMotion ? 0 : 0.5,
            }}
            style={{
              marginTop: "22px",
              fontSize: ".72rem",
              color: "rgba(100,116,139,.8)",
              letterSpacing: ".08em",
            }}
          >
            GARUT · INDONESIA
          </motion.div>
        </motion.main>
      </motion.div>
    </AnimatePresence>
  );
}
