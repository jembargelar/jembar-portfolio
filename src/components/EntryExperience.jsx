import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getSiteSettings } from "../api/publicData";

const STORAGE_KEY = "jembar-entry-seen";
const ENTRY_VIDEO_SRC = "/welcome-web.mp4";

const fallbackSettings = {
  entry_enabled: true,
  entry_kicker_id: "Digital Portfolio",
  entry_kicker_en: "Digital Portfolio",
  entry_title: "JEMBAR.DEV",
  entry_tagline_id:
    "Membangun solusi digital untuk operasional bisnis modern.",
  entry_tagline_en:
    "Building digital solutions for modern business operations.",
  entry_location_id: "GARUT · INDONESIA",
  entry_location_en: "GARUT · INDONESIA",
  entry_button_id: "MASUK",
  entry_button_en: "ENTER",
  entry_skip_returning: true,
  entry_transition_ms: 450,
};

export default function EntryExperience({ onEnter, language = "id" }) {
  const [settings, setSettings] = useState(fallbackSettings);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      try {
        const data = await getSiteSettings();

        if (mounted && data) {
          setSettings({
            ...fallbackSettings,
            ...data,
          });
        }
      } catch (error) {
        console.error("Failed to load Entry Experience settings:", error);
      } finally {
        if (mounted) {
          setSettingsLoaded(true);
        }
      }
    }

    loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener?.("change", update);

    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!settingsLoaded) return;

    if (!settings.entry_enabled) {
      onEnter?.();
      return;
    }

    if (settings.entry_skip_returning) {
      try {
        const seen = sessionStorage.getItem(STORAGE_KEY);

        if (seen === "true") {
          onEnter?.();
          return;
        }
      } catch {
        // sessionStorage can be unavailable in some browser contexts.
      }
    }

    setVisible(true);
  }, [
    settingsLoaded,
    settings.entry_enabled,
    settings.entry_skip_returning,
    onEnter,
  ]);

  const enter = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors.
    }

    const transitionMs = Number(settings.entry_transition_ms) || 450;

    if (reducedMotion || transitionMs <= 0) {
      setVisible(false);
      onEnter?.();
      return;
    }

    setVisible(false);

    window.setTimeout(() => {
      onEnter?.();
    }, transitionMs);
  };

  if (!settingsLoaded) return null;

  const isEnglish = language === "en";

  const tagline = isEnglish
    ? settings.entry_tagline_en
    : settings.entry_tagline_id;

  const location = isEnglish
    ? settings.entry_location_en
    : settings.entry_location_id;

  const button = isEnglish
    ? settings.entry_button_en
    : settings.entry_button_id;

  const transitionMs = Number(settings.entry_transition_ms) || 450;
  const transitionSeconds = transitionMs / 1000;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="entry"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0 : transitionSeconds,
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
          <style>{`
            .entry-video-blur {
              display: none;
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
              filter: blur(80px) brightness(0.28) saturate(1.3);
              transform: scale(1.25);
              pointer-events: none;
            }
            .entry-video-main {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
              filter: brightness(0.72) saturate(1.1) contrast(0.95);
              pointer-events: none;
            }
            @media (max-aspect-ratio: 1/1) {
              .entry-video-blur { display: block; }
              .entry-video-main { object-fit: contain; }
            }
          `}</style>

          {!reducedMotion && (
            <>
              <video
                className="entry-video-blur"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              >
                <source src={ENTRY_VIDEO_SRC} type="video/mp4" />
              </video>

              <video
                className="entry-video-main"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              >
                <source src={ENTRY_VIDEO_SRC} type="video/mp4" />
              </video>
            </>
          )}

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(2,6,23,.55) 0%, rgba(2,6,23,.30) 45%, rgba(2,6,23,.68) 100%)",
              pointerEvents: "none",
            }}
          />

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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <motion.button
              type="button"
              onClick={enter}
              initial={
                reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reducedMotion ? 0 : 0.3,
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
              {button}
              <span style={{ marginLeft: "10px" }}>→</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: reducedMotion ? 0 : 0.55,
                duration: reducedMotion ? 0 : 0.5,
              }}
              style={{
                marginTop: "28px",
                fontSize: ".78rem",
                fontWeight: 700,
                color: "var(--accent, #22d3ee)",
                letterSpacing: ".18em",
                textTransform: "uppercase",
              }}
            >
              {location}
            </motion.div>

            <motion.p
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: reducedMotion ? 0 : 0.75,
                duration: reducedMotion ? 0 : 0.6,
              }}
              style={{
                margin: "14px auto 0",
                maxWidth: "520px",
                color: "rgba(203,213,225,.78)",
                fontSize: "clamp(.88rem, 2vw, 1rem)",
                lineHeight: 1.7,
              }}
            >
              {tagline}
            </motion.p>
          </motion.main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
