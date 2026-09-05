import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  MapPin,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { getHeroContent } from "../api/publicData";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const photoReveal = {
  hidden: {
    opacity: 0,
    scale: 0.88,
    y: 18,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fallbackHero = {
  name: "Jembar Gelar Kusumah Wibawa",
  role_id: "Administrative Professional × Web Developer",
  role_en: "Administrative Professional × Web Developer",
  tagline_id: "Building digital solutions for modern business operations.",
  tagline_en: "Building digital solutions for modern business operations.",
  description_id:
    "Saya menggabungkan pengalaman administrasi, pengelolaan data, dan teknologi untuk membangun solusi digital yang praktis dan dapat digunakan oleh bisnis.",
  description_en:
    "I combine administrative experience, data management, and technology to build practical digital solutions for modern businesses.",
  location_id: "Garut, Indonesia",
  location_en: "Garut, Indonesia",
  profile_image_url: "/jem.webp",
  cv_url: "/Jembar_CV.pdf",
  primary_cta_id: "Lihat Proyek",
  primary_cta_en: "View Projects",
  secondary_cta_id: "Download CV",
  secondary_cta_en: "Download CV",
};

export default function Hero() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [hero, setHero] = useState(fallbackHero);

  useEffect(() => {
    let mounted = true;

    const loadHero = async () => {
      const { data, error } = await getHeroContent();

      if (error) {
        console.error("Failed to load hero content:", error);
        return;
      }

      if (data && mounted) {
        setHero({
          ...fallbackHero,
          ...data,
        });
      }
    };

    loadHero();

    return () => {
      mounted = false;
    };
  }, []);

  const name = hero.name || fallbackHero.name;

  const role = isEn
    ? hero.role_en || hero.role_id || fallbackHero.role_en
    : hero.role_id || hero.role_en || fallbackHero.role_id;

  const tagline = isEn
    ? hero.tagline_en || hero.tagline_id || fallbackHero.tagline_en
    : hero.tagline_id || hero.tagline_en || fallbackHero.tagline_id;

  const description = isEn
    ? hero.description_en ||
      hero.description_id ||
      fallbackHero.description_en
    : hero.description_id ||
      hero.description_en ||
      fallbackHero.description_id;

  const location = isEn
    ? hero.location_en || hero.location_id || fallbackHero.location_en
    : hero.location_id || hero.location_en || fallbackHero.location_id;

  const profileImageUrl =
    hero.profile_image_url || fallbackHero.profile_image_url;

  const cvUrl = hero.cv_url || fallbackHero.cv_url;

  const primaryCta = isEn
    ? hero.primary_cta_en || hero.primary_cta_id || fallbackHero.primary_cta_en
    : hero.primary_cta_id || hero.primary_cta_en || fallbackHero.primary_cta_id;

  const secondaryCta = isEn
    ? hero.secondary_cta_en ||
      hero.secondary_cta_id ||
      fallbackHero.secondary_cta_en
    : hero.secondary_cta_id ||
      hero.secondary_cta_en ||
      fallbackHero.secondary_cta_id;

  const roleParts = role.split("×").map((part) => part.trim());

  return (
    <section
      id="home"
      className="hero-v2"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 20px 90px",
        overflow: "hidden",
      }}
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "min(75vw, 720px)",
            height: "min(75vw, 720px)",
            top: "-25%",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,211,238,.12), transparent 68%)",
            filter: "blur(20px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "360px",
            height: "360px",
            right: "-180px",
            bottom: "-120px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,.10), transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.13,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(circle at center, black 10%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 10%, transparent 78%)",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1120px",
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1.15fr) minmax(300px, .85fr)",
          alignItems: "center",
          gap: "70px",
        }}
      >
        {/* Content */}
        <div>
          {/* Availability */}
          <motion.div variants={item}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "8px 13px",
                borderRadius: "999px",
                background: "rgba(15,23,42,.5)",
                border: "1px solid rgba(34,211,238,.22)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                color: "var(--accent)",
                fontSize: ".76rem",
                fontWeight: 700,
                letterSpacing: ".02em",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 12px rgba(34,211,238,.7)",
                }}
              />
              <Sparkles size={14} />
              {isEn
                ? "Available for opportunities"
                : "Terbuka untuk peluang baru"}
            </div>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={item}
            style={{
              margin: "28px 0 0",
              color: "var(--text-secondary)",
              fontSize: "clamp(.95rem, 2vw, 1.1rem)",
              fontWeight: 500,
            }}
          >
            {isEn ? "Hello, I'm" : "Halo, saya"}
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={item}
            className="glow-text"
            style={{
              margin: "10px 0 0",
              fontSize: "clamp(2.8rem, 6.2vw, 5.8rem)",
              lineHeight: 0.98,
              fontWeight: 850,
              letterSpacing: "-.065em",
              color: "var(--text-primary)",
            }}
          >
            {name.split(" ").slice(0, 2).join(" ")}
            <br />
            <span
              className="text-shimmer"
              style={{
                display: "inline-block",
              }}
            >
              {name.split(" ").slice(2).join(" ") || name}
            </span>
            <span style={{ color: "var(--accent)" }}>.</span>
          </motion.h1>

          {/* Role */}
          <motion.div
            variants={item}
            style={{
              marginTop: "22px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {roleParts.map((part, index) => (
              <span
                key={`${part}-${index}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    style={{
                      color: "var(--accent)",
                      fontWeight: 800,
                    }}
                  >
                    ×
                  </span>
                )}
                {part}
              </span>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            style={{
              margin: "20px 0 0",
              maxWidth: "680px",
              fontSize: "clamp(1rem, 2vw, 1.18rem)",
              lineHeight: 1.75,
              color: "var(--text-secondary)",
            }}
          >
            {tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={item}
            style={{
              margin: "15px 0 0",
              maxWidth: "700px",
              fontSize: "clamp(.9rem, 1.8vw, 1rem)",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              opacity: 0.86,
            }}
          >
            {description}
          </motion.p>

          {/* Location */}
          <motion.div
            variants={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              marginTop: "20px",
              color: "var(--text-secondary)",
              fontSize: ".84rem",
            }}
          >
            <MapPin size={15} />
            <span>{location}</span>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={item}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "30px",
            }}
          >
            <motion.a
              href="#projects"
              whileHover={{
                y: -3,
                scale: 1.025,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="btn-gradient premium-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "9px",
                padding: "14px 21px",
                borderRadius: "14px",
                textDecoration: "none",
              }}
            >
              {primaryCta}
              <ArrowRight size={17} />
            </motion.a>

            <motion.a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -3,
                scale: 1.025,
              }}
              whileTap={{
                scale: 0.97,
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "9px",
                padding: "14px 21px",
                borderRadius: "14px",
                textDecoration: "none",
                background: "var(--btn-sec-bg)",
                border: "1px solid var(--card-border)",
                color: "var(--text-primary)",
                fontWeight: 700,
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              <Download size={17} />
              {secondaryCta}
            </motion.a>
          </motion.div>
        </div>

        {/* Profile visual */}
        <motion.div
          variants={photoReveal}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.a
            href={profileImageUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              isEn ? "Open profile photo" : "Buka foto profil"
            }
            whileHover={{
              scale: 1.025,
              y: -5,
            }}
            whileTap={{
              scale: 0.98,
            }}
            style={{
              position: "relative",
              display: "block",
              width: "min(72vw, 390px)",
              aspectRatio: "1 / 1",
              padding: "6px",
              borderRadius: "34px",
              textDecoration: "none",
              background:
                "linear-gradient(145deg, rgba(34,211,238,.8), rgba(59,130,246,.55), rgba(255,255,255,.08))",
              boxShadow:
                "0 30px 100px rgba(34,211,238,.13), 0 0 0 1px rgba(255,255,255,.05)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "29px",
                background: "var(--card-bg)",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <img
                src={profileImageUrl}
                alt={name}
                loading="eager"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />

              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(2,6,23,.48))",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: "18px",
                  right: "18px",
                  bottom: "18px",
                  padding: "12px 14px",
                  borderRadius: "15px",
                  background: "rgba(2,6,23,.58)",
                  border: "1px solid rgba(255,255,255,.1)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: ".75rem",
                        color: "rgba(255,255,255,.62)",
                        marginBottom: "3px",
                      }}
                    >
                      JEMBAR.DEV
                    </div>

                    <div
                      style={{
                        fontSize: ".9rem",
                        fontWeight: 750,
                      }}
                    >
                      Digital Portfolio
                    </div>
                  </div>

                  <ExternalLink size={17} />
                </div>
              </div>
            </div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "7px",
          color: "var(--text-secondary)",
          fontSize: ".68rem",
          letterSpacing: ".14em",
          textTransform: "uppercase",
        }}
      >
        <span>
          {isEn ? "Scroll to explore" : "Scroll untuk menjelajah"}
        </span>

        <motion.span
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: "1px",
            height: "28px",
            background:
              "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
      </motion.div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 820px) {
          .hero-v2 > div {
            grid-template-columns: 1fr !important;
            gap: 42px !important;
            text-align: center;
          }

          .hero-v2 > div > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-v2 {
            padding-top: 110px !important;
            padding-bottom: 80px !important;
          }
        }

        @media (max-width: 520px) {
          .hero-v2 {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-v2 *,
          .hero-v2 *::before,
          .hero-v2 *::after {
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
