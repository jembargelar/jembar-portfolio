import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { personal } from "../data/portfolio";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section 
      id="hero" 
      className="bg-grid-pattern"
      style={{ 
        position: "relative",
        paddingTop: "130px", 
        paddingBottom: "80px", 
        paddingLeft: "20px",
        paddingRight: "20px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden"
      }}
    >
      {/* Background Aurora Glow */}
      <div className="aurora-glow-1" />
      <div className="aurora-glow-2" />

      <div style={{ maxWidth: "1150px", margin: "0 auto", width: "100%", zIndex: 1 }}>
        
        {/* LAYOUT GRID 60 : 40 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "48px",
          alignItems: "center"
        }}>
          
          {/* KOLOM KIRI: TEKS 60% */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge Status */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              padding: "6px 16px",
              borderRadius: "999px",
              fontSize: "0.82rem",
              fontWeight: "600",
              color: "#10b981",
              marginBottom: "24px"
            }}>
              <span style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                boxShadow: "0 0 10px #10b981"
              }} />
              <span>{t("available")}</span>
            </div>

            {/* Nama Raksasa Typography (Up to 72px) */}
            <h1 style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)",
              fontWeight: "900",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "18px"
            }}>
              JEMBAR <br />
              <span style={{
                background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #9333EA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                GELAR KUSUMAH
              </span> <br />
              WIBAWA
            </h1>

            {/* Roles */}
            <p style={{ 
              color: "#38bdf8", 
              fontWeight: "500", 
              fontSize: "1rem",
              marginBottom: "20px",
              lineHeight: "1.5"
            }}>
              {t("roles")}
            </p>

            {/* Description */}
            <p style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: "1.7",
              maxWidth: "540px",
              marginBottom: "36px"
            }}>
              {t("heroDesc")}
            </p>

            {/* Tombol Gradient & Outline */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="btn-gradient"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  textDecoration: "none",
                  fontSize: "1rem"
                }}
              >
                {t("hireMe")} ➔
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personal.cvUrl}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-primary)",
                  backgroundColor: "rgba(31, 41, 55, 0.5)",
                  border: "1px solid var(--card-border)",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  textDecoration: "none",
                  fontSize: "1rem"
                }}
              >
                📥 {t("downloadCv")}
              </motion.a>
            </div>

            {/* Stats Bar dengan Counter Animation */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              paddingTop: "24px",
              borderTop: "1px solid var(--card-border)"
            }}>
              <div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#60a5fa" }}>
                  <CountUp end={2} duration={2.5} suffix="+" />
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{t("yearsExp")}</p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#60a5fa" }}>
                  <CountUp end={20} duration={2.5} suffix="+" />
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{t("projectsDone")}</p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#10b981" }}>
                  <CountUp end={100} duration={2.5} suffix="%" />
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{t("commitment")}</p>
              </div>
            </div>

          </motion.div>

          {/* KOLOM KANAN: FOTO BESAR 420PX + GLOW AURA 40% */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: "360px",
              height: "420px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 0 80px rgba(59, 130, 246, 0.35)",
              zIndex: 1
            }}>
              <img
                src="/profile.jpg"
                alt={personal.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
              
              {/* Badge Social Proof */}
              <div style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                right: "16px",
                padding: "12px",
                backgroundColor: "rgba(3, 7, 18, 0.85)",
                backdropFilter: "blur(12px)",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <div style={{ fontSize: "1.2rem" }}>✨</div>
                <div>
                  <div style={{ color: "#f59e0b", fontSize: "0.8rem", marginBottom: "2px" }}>⭐⭐⭐⭐⭐</div>
                  <p style={{ fontSize: "0.8rem", color: "#e5e7eb", fontWeight: "600", margin: 0 }}>Trusted & High Quality Solutions</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

