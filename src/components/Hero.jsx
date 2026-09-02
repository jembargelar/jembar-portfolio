import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Play } from "lucide-react";
import { personal } from "../data/portfolio";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floating = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function Hero() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <section
      id="about"
      className="hero-v2"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "130px 20px 80px",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,.13), transparent 68%)",
          top: "-180px",
          left: "50%",
          transform: "translateX(-50%)",
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1050px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Status badge */}
        <motion.div variants={item}>
          <motion.div
            {...floating}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "rgba(15,23,42,.58)",
              border: "1px solid rgba(34,211,238,.24)",
              backdropFilter: "blur(16px)",
              color: "var(--accent)",
              fontSize: ".78rem",
              fontWeight: 700,
              letterSpacing: ".02em",
              boxShadow: "0 10px 35px rgba(34,211,238,.08)",
            }}
          >
            <Sparkles size={14} />
            {isEn ? "Available for opportunities" : "Terbuka untuk peluang baru"}
          </motion.div>
        </motion.div>

        {/* Profile */}
        <motion.div
          variants={item}
          style={{
            marginTop: "28px",
            position: "relative",
          }}
        >
          <motion.a
            href="/jem.webp"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.045 }}
            whileTap={{ scale: 0.97 }}
            style={{
              position: "relative",
              display: "block",
              width: "190px",
              height: "190px",
              borderRadius: "50%",
              padding: "5px",
              background:
                "linear-gradient(135deg, var(--accent), var(--primary), transparent)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,.06), 0 25px 70px rgba(34,211,238,.16)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "50%",
                border: "4px solid var(--bg-color)",
                background: "var(--card-bg)",
              }}
            >
              <img
                src="/jem.webp?v=3"
                alt={personal.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <span
              style={{
                position: "absolute",
                right: "-8px",
                bottom: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "7px 10px",
                borderRadius: "999px",
                background: "var(--accent)",
                color: "#fff",
                fontSize: ".68rem",
                fontWeight: 800,
                boxShadow: "0 8px 25px rgba(34,211,238,.3)",
              }}
            >
              <Play size={11} fill="currentColor" />
              VIEW
            </span>
          </motion.a>
        </motion.div>

        {/* Location */}
        <motion.div
          variants={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "25px",
            color: "var(--text-secondary)",
            fontSize: ".82rem",
          }}
        >
          <MapPin size={14} />
          {personal.location || "Indonesia"}
        </motion.div>

        {/* Heading */}
        <motion.div variants={item} style={{ marginTop: "12px" }}>
          <p
            style={{
              margin: 0,
              color: "var(--text-secondary)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              fontWeight: 500,
            }}
          >
            {isEn ? "Hello, I am" : "Halo, Saya"}
          </p>

          <h1
            className="glow-text"
            style={{
              margin: "8px 0 0",
              fontSize: "clamp(2.35rem, 7vw, 5.3rem)",
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: "-.055em",
              color: "var(--text-primary)",
            }}
          >
            Jembar Gelar
            <br />
            <span className="text-shimmer">
              Kusumah Wibawa
            </span>
            <span style={{ color: "var(--accent)" }}>.</span>
          </h1>
        </motion.div>

        {/* Roles */}
        <motion.div
          variants={item}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "9px",
            marginTop: "24px",
          }}
        >
          {[
            "Administrative Professional",
            "Web Developer",
            "Management Student",
          ].map((role) => (
            <span key={role} className="tech-pill">
              {role}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          style={{
            maxWidth: "760px",
            margin: "25px auto 0",
            color: "var(--text-secondary)",
            fontSize: "clamp(.9rem, 2vw, 1rem)",
            lineHeight: 1.85,
          }}
        >
          {isEn
            ? "Experienced in administration, manufacturing, and data processing. Currently developing expertise as a Web Developer focused on modern, responsive, and SEO-friendly digital experiences."
            : "Berpengalaman di bidang administrasi, manufaktur, dan pengolahan data. Saat ini mengembangkan keahlian sebagai Web Developer dengan fokus pada website modern, responsif, dan SEO Friendly."}
        </motion.p>

        {/* Video */}
        <motion.div
          variants={item}
          className="glass-premium image-hover"
          style={{
            width: "100%",
            maxWidth: "820px",
            marginTop: "38px",
            padding: "7px",
            borderRadius: "24px",
          }}
        >
          <video
            src=""
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls
            style={{
              width: "100%",
              display: "block",
              borderRadius: "18px",
              background: "#000",
            }}
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="glass-premium"
          style={{
            width: "100%",
            maxWidth: "650px",
            marginTop: "28px",
            padding: "6px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderRadius: "20px",
          }}
        >
          {[
            ["500+", "Project"],
            ["3+", "Experience"],
            ["100%", "Commitment"],
          ].map(([value, label], index) => (
            <div
              key={label}
              style={{
                padding: "18px 10px",
                borderRight:
                  index < 2
                    ? "1px solid var(--card-border)"
                    : "none",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.45rem, 4vw, 2rem)",
                  fontWeight: 800,
                  color: "var(--accent)",
                }}
              >
                {value}
              </div>

              <div
                style={{
                  marginTop: "4px",
                  fontSize: ".75rem",
                  color: "var(--text-secondary)",
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={item}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            marginTop: "30px",
          }}
        >
          <motion.a
            href="#projects"
            whileHover={{
              scale: 1.035,
              y: -3,
            }}
            whileTap={{ scale: 0.97 }}
            className="btn-gradient premium-button"
            style={{
              padding: "13px 22px",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
            }}
          >
            {isEn ? "View Projects" : "Lihat Proyek"}
            <ArrowRight size={17} />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.035,
              y: -3,
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "13px 22px",
              display: "inline-flex",
              alignItems: "center",
              borderRadius: "14px",
              background: "var(--btn-sec-bg)",
              border: "1px solid var(--card-border)",
              color: "var(--text-primary)",
              textDecoration: "none",
              fontWeight: 700,
              backdropFilter: "blur(14px)",
            }}
          >
            {isEn ? "Contact Me" : "Hubungi Saya"}
          </motion.a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={item}
          animate={{
            y: [0, 7, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            marginTop: "42px",
            fontSize: ".7rem",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          Scroll to explore
        </motion.div>
      </motion.div>
    </section>
  );
}
