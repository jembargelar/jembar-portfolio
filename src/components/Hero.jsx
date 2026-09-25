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
import HeroScene from "./three/HeroScene";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const photoReveal = {
  hidden: { opacity: 0, scale: 0.92, y: 14 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fallbackHero = {
  name: "Jembar Gelar Kusumah Wibawa",
  role_id: "Administrative Professional × Web Developer",
  role_en: "Administrative Professional × Web Developer",
  tagline_id: "Membangun solusi digital untuk operasional bisnis modern.",
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
  secondary_cta_id: "Unduh CV",
  secondary_cta_en: "Download CV",
};

export default function Hero() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const [hero, setHero] = useState(fallbackHero);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data, error } = await getHeroContent();
      if (error) {
        console.error("Failed to load hero content:", error);
        return;
      }
      if (data && mounted) setHero({ ...fallbackHero, ...data });
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const pick = (idKey, enKey) =>
    isEn
      ? hero[enKey] || hero[idKey] || fallbackHero[enKey]
      : hero[idKey] || hero[enKey] || fallbackHero[idKey];

  const name = hero.name || fallbackHero.name;
  const role = pick("role_id", "role_en");
  const tagline = isEn
    ? "Building practical digital systems for modern operations."
    : "Membangun sistem digital yang praktis untuk operasional modern.";
  const description = pick("description_id", "description_en");
  const location = pick("location_id", "location_en");
  const primaryCta = pick("primary_cta_id", "primary_cta_en");
  const secondaryCta = pick("secondary_cta_id", "secondary_cta_en");
  const profileImageUrl =
    hero.profile_image_url || fallbackHero.profile_image_url;
  const cvUrl = hero.cv_url || fallbackHero.cv_url;

  const roleParts = role.split("×").map((p) => p.trim());

  return (
    <section id="home" className="jembar-hero">
      <style>{`
        .jembar-hero {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background:
            radial-gradient(circle at 30% 20%, rgba(34,211,238,.08), transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(124,58,237,.06), transparent 55%);
        }
        @media (min-width: 1024px) {
          .jembar-hero { min-height: 100vh; }
        }

        .jembar-hero-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: .5;
          filter: saturate(.75);
        }
        .jembar-hero-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(to bottom, rgba(2,6,23,.55), transparent 40%, transparent 60%, rgba(2,6,23,.6));
        }
        .jembar-hero-watermark {
          position: absolute;
          left: 0; right: 0;
          bottom: 7rem;
          z-index: 1;
          text-align: center;
          font-weight: 800;
          line-height: 1;
          font-size: clamp(5rem, 14vw, 11rem);
          letter-spacing: -.05em;
          color: rgba(34,211,238,.05);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
          font-family: inherit;
          display: none;
        }
        @media (min-width: 1024px) {
          .jembar-hero-watermark { display: block; }
        }

        .jembar-hero-shell {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          max-width: 84rem;
          width: 100%;
          margin: 0 auto;
          padding: 92px 20px 40px;
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          .jembar-hero-shell { padding-left: 32px; padding-right: 32px; }
        }
        @media (min-width: 1024px) {
          .jembar-hero-shell {
            flex: 1;
            padding-top: 120px;
            padding-bottom: 40px;
          }
        }

        .jembar-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .jembar-hero-grid {
            flex: 1;
            align-items: center;
            gap: 56px;
            grid-template-columns: 7fr 5fr;
          }
        }

        /* ==== TEXT ==== */
        .jembar-hero-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 1024px) {
          .jembar-hero-text {
            align-items: flex-start;
            text-align: left;
          }
        }

        .jembar-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 13px;
          border-radius: 999px;
          background: rgba(15,23,42,.55);
          border: 1px solid rgba(34,211,238,.22);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: var(--accent-blue, #22d3ee);
          font-size: .78rem;
          font-weight: 700;
          letter-spacing: .02em;
        }
        .light-mode .jembar-hero-eyebrow {
          background: rgba(255,255,255,.7);
          border-color: rgba(8,145,178,.3);
        }
        .jembar-hero-eyebrow .dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent-blue, #22d3ee);
          box-shadow: 0 0 10px var(--accent-blue, #22d3ee);
          animation: jembarPulse 2s ease-in-out infinite;
        }
        @keyframes jembarPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .4; transform: scale(1.4); }
        }

        .jembar-hero-h1 {
          margin: 16px 0 0;
          font-size: clamp(1.85rem, 6.8vw, 4rem);
          font-weight: 800;
          letter-spacing: -.04em;
          line-height: 1.08;
          color: var(--text-primary);
          max-width: 620px;
        }
        .jembar-hero-h1 .accent {
          background: linear-gradient(135deg, #22d3ee, #3b82f6);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .light-mode .jembar-hero-h1 .accent {
          background: linear-gradient(135deg, #0E7490, #1D4ED8);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .jembar-hero-role {
          margin-top: 14px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        @media (min-width: 1024px) {
          .jembar-hero-role { justify-content: flex-start; }
        }
        .jembar-hero-role-part {
          font-size: clamp(.82rem, 2.4vw, 1.05rem);
          font-weight: 700;
          color: var(--text-primary);
        }
        .jembar-hero-role-part + .jembar-hero-role-part::before {
          content: "×";
          color: var(--accent-blue);
          font-weight: 800;
          margin-right: 8px;
        }

        .jembar-hero-rating {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        @media (min-width: 1024px) {
          .jembar-hero-rating { justify-content: flex-start; }
        }
        .jembar-hero-stars {
          display: inline-flex;
          gap: 2px;
          color: var(--accent-blue);
        }
        .jembar-hero-stars svg { width: 12px; height: 12px; }
        .jembar-hero-rating-text {
          color: var(--text-secondary);
          font-size: .85rem;
        }

        .jembar-hero-tagline {
          margin: 14px 0 0;
          max-width: 560px;
          font-size: clamp(.95rem, 2.5vw, 1.08rem);
          line-height: 1.65;
          color: var(--text-secondary);
        }
        .jembar-hero-desc {
          margin: 10px 0 0;
          max-width: 580px;
          font-size: clamp(.88rem, 2.2vw, .95rem);
          line-height: 1.7;
          color: var(--text-secondary);
          opacity: .82;
        }
        .jembar-hero-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          color: var(--text-secondary);
          font-size: .85rem;
        }

        .jembar-hero-cta {
          margin-top: 22px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }
        @media (min-width: 1024px) {
          .jembar-hero-cta { justify-content: flex-start; }
        }
        .jembar-pill {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 22px;
          border-radius: 999px;
          font-size: .9rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          border: 1px solid transparent;
          font-family: inherit;
          transition: transform .3s cubic-bezier(.22,.9,.32,1), box-shadow .35s ease, border-color .3s ease;
        }
        .jembar-pill:hover { transform: translateY(-2px); }
        .jembar-pill-dark {
          background: linear-gradient(135deg, #22d3ee, #3b82f6);
          color: #020617;
        }
        .jembar-pill-dark:hover { box-shadow: 0 14px 40px rgba(34,211,238,.25); }
        .jembar-pill-outline {
          background: rgba(15,23,42,.55);
          border-color: rgba(34,211,238,.35);
          color: var(--accent-blue, #22d3ee);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .light-mode .jembar-pill-outline {
          background: rgba(255,255,255,.7);
          border-color: rgba(8,145,178,.4);
          color: #0E7490;
        }
        .jembar-pill-outline:hover { background: rgba(34,211,238,.05); }
        .jembar-pill-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px; height: 20px;
          border-radius: 50%;
        }
        .jembar-pill-arrow svg { width: 12px; height: 12px; }
        .jembar-pill-dark .jembar-pill-arrow { background: #020617; color: #22d3ee; }

        /* ==== PHOTO ==== */
        .jembar-hero-photo-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          order: -1;
        }
        @media (min-width: 1024px) {
          .jembar-hero-photo-wrap { order: 0; }
        }
        .jembar-hero-photo {
          position: relative;
          display: block;
          width: min(46vw, 180px);
          aspect-ratio: 1 / 1;
          padding: 3px;
          border-radius: 22px;
          text-decoration: none;
          background: linear-gradient(145deg, rgba(34,211,238,.7), rgba(59,130,246,.45), rgba(255,255,255,.06));
          box-shadow: 0 14px 44px rgba(34,211,238,.1), 0 0 0 1px rgba(255,255,255,.05);
          transition: transform .35s cubic-bezier(.22,.9,.32,1), box-shadow .35s ease;
        }
        @media (min-width: 1024px) {
          .jembar-hero-photo {
            width: min(22vw, 280px);
            padding: 4px;
            border-radius: 28px;
            box-shadow: 0 20px 70px rgba(34,211,238,.12), 0 0 0 1px rgba(255,255,255,.05);
          }
        }
        .jembar-hero-photo:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 26px 80px rgba(34,211,238,.18), 0 0 0 1px rgba(34,211,238,.25);
        }
        .jembar-hero-photo-inner {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 19px;
          background: var(--card-bg);
          border: 1px solid rgba(255,255,255,.08);
        }
        @media (min-width: 1024px) {
          .jembar-hero-photo-inner { border-radius: 24px; }
        }
        .jembar-hero-photo-img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
        }
        .jembar-hero-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 60%, rgba(2,6,23,.45));
          pointer-events: none;
        }
        .jembar-hero-photo-badge {
          position: absolute;
          left: 7px; right: 7px; bottom: 7px;
          padding: 6px 8px;
          border-radius: 9px;
          background: rgba(2,6,23,.55);
          border: 1px solid rgba(255,255,255,.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
        }
        .jembar-hero-photo-badge .kicker {
          font-size: .62rem;
          color: rgba(255,255,255,.7);
          margin-bottom: 1px;
          letter-spacing: .04em;
        }
        .jembar-hero-photo-badge .title {
          font-size: .78rem;
          font-weight: 700;
        }
        @media (min-width: 1024px) {
          .jembar-hero-photo-badge {
            left: 12px; right: 12px; bottom: 12px;
            padding: 9px 11px;
            border-radius: 12px;
          }
          .jembar-hero-photo-badge .kicker { font-size: .62rem; }
          .jembar-hero-photo-badge .title { font-size: .8rem; }
        }

        /* ==== STATUS BAR ==== */
        .jembar-hero-status {
          position: relative;
          z-index: 2;
          margin-top: 32px;
          padding-top: 16px;
          border-top: 1px solid rgba(148,163,184,.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
          color: var(--text-secondary);
          font-size: .75rem;
          text-transform: uppercase;
          letter-spacing: .08em;
          opacity: .6;
        }
        @media (min-width: 640px) {
          .jembar-hero-status {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
            font-size: .78rem;
          }
        }
        @media (min-width: 1024px) {
          .jembar-hero-status {
            margin-top: auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jembar-hero *,
          .jembar-hero *::before,
          .jembar-hero *::after {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Light mode: HeroScene off, watermark soft */
        .light-mode .jembar-hero-canvas {
          display: none;
        }
        .light-mode .jembar-hero-vignette {
          background: linear-gradient(to bottom, rgba(248,250,252,.6), transparent 40%, transparent 60%, rgba(248,250,252,.7));
        }
        .light-mode .jembar-hero-watermark {
          color: rgba(15, 23, 42, .035);
        }
      `}</style>

      <div className="jembar-hero-canvas">
        <HeroScene />
      </div>
      <div className="jembar-hero-vignette" />
      <div className="jembar-hero-watermark" aria-hidden="true">JEMBAR</div>

      <div className="jembar-hero-shell">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="jembar-hero-grid"
        >
          {/* TEXT */}
          <div className="jembar-hero-text">
            <motion.div variants={item} className="jembar-hero-eyebrow">
              <span className="dot" aria-hidden="true" />
              <Sparkles size={12} />
              {isEn ? "Available for opportunities" : "Terbuka untuk peluang baru"}
            </motion.div>

            <motion.h1 variants={item} className="jembar-hero-h1">
              {isEn ? (
                <>
                  Clean systems.{" "}
                  <span className="accent">Calm business.</span>
                </>
              ) : (
                <>
                  Sistem yang rapi.{" "}
                  <span className="accent">Bisnis yang tenang.</span>
                </>
              )}
            </motion.h1>

            <motion.div variants={item} className="jembar-hero-role">
              {roleParts.map((part, i) => (
                <span key={`${part}-${i}`} className="jembar-hero-role-part">
                  {part}
                </span>
              ))}
            </motion.div>

            <motion.div variants={item} className="jembar-hero-rating">
              <span className="jembar-hero-stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
                  </svg>
                ))}
              </span>
              <span className="jembar-hero-rating-text">
                {isEn ? "200+ projects shipped" : "200+ proyek terkirim"}
              </span>
            </motion.div>

            <motion.p variants={item} className="jembar-hero-tagline">
              {tagline}
            </motion.p>

            <motion.p variants={item} className="jembar-hero-desc">
              {description}
            </motion.p>

            <motion.div variants={item} className="jembar-hero-location">
              <MapPin size={13} />
              <span>{location}</span>
            </motion.div>

            <motion.div variants={item} className="jembar-hero-cta">
              <a href="#projects" className="jembar-pill jembar-pill-dark">
                {primaryCta}
                <span className="jembar-pill-arrow">
                  <ArrowRight />
                </span>
              </a>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="jembar-pill jembar-pill-outline"
              >
                <Download size={14} />
                {secondaryCta}
              </a>
            </motion.div>
          </div>

          {/* PHOTO */}
          <motion.div variants={photoReveal} className="jembar-hero-photo-wrap">
            <a
              href={profileImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="jembar-hero-photo"
              aria-label={isEn ? "Open profile photo" : "Buka foto profil"}
            >
              <div className="jembar-hero-photo-inner">
                <img
                  src={profileImageUrl}
                  alt={name}
                  loading="eager"
                  decoding="async"
                  className="jembar-hero-photo-img"
                />
                <div className="jembar-hero-photo-overlay" aria-hidden="true" />
                <div className="jembar-hero-photo-badge">
                  <div>
                    <div className="kicker">JEMBAR.DEV</div>
                    <div className="title">Digital Portfolio</div>
                  </div>
                  <ExternalLink size={12} />
                </div>
              </div>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="jembar-hero-status"
        >
          <span>{isEn ? "Active since 2020" : "Aktif sejak 2020"}</span>
          <span>{location} · Remote-first</span>
          <span>{isEn ? "Scroll to explore ↓" : "Scroll untuk jelajah ↓"}</span>
        </motion.div>
      </div>
    </section>
  );
}
