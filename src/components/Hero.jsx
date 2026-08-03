import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { personal } from "../data/portfolio";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section 
      id="hero" 
      className="bg-grid-pattern"
      style={{ 
        position: "relative",
        paddingTop: "120px", 
        paddingBottom: "60px", 
        paddingLeft: "20px",
        paddingRight: "20px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden"
      }}
    >
      {/* Background Glow */}
      <div className="aurora-glow-1" />
      <div className="aurora-glow-2" />

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", zIndex: 1 }}>
        
        {/* LAYOUT RESPONSIVE GRID (60:40 di Desktop, Stack ke bawah di HP) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "40px",
          alignItems: "center"
        }}>
          
          {/* KOLOM KIRI: TEKS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge Status */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: "600",
              color: "#10b981",
              marginBottom: "20px"
            }}>
              <span style={{
                width: "7px",
                height: "7px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                boxShadow: "0 0 8px #10b981"
              }} />
              <span>AVAILABLE FOR WORK</span>
            </div>

            {/* Nama Raksasa Responsive */}
            <h1 style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: "900",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              color: "#f9fafb",
              marginBottom: "14px"
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
              fontSize: "0.95rem",
              marginBottom: "16px",
              lineHeight: "1.5"
            }}>
              Administrative Professional • Frontend Web Developer • Data Management Specialist
            </p>

            {/* Description */}
            <p style={{
              fontSize: "1rem",
              color: "#9ca3af",
              lineHeight: "1.6",
              marginBottom: "30px"
            }}>
              Saya membantu perusahaan mengelola administrasi, mengembangkan website modern, dan mengubah data menjadi keputusan yang lebih cepat.
            </p>

            {/* Tombol Aksi */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="btn-gradient"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  textDecoration: "none",
                  fontSize: "0.95rem"
                }}
              >
                Hire Me ➔
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={personal.cvUrl}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f3f4f6",
                  backgroundColor: "rgba(31, 41, 55, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  textDecoration: "none",
                  fontSize: "0.95rem"
                }}
              >
                📥 Download CV
              </motion.a>
            </div>

            {/* Stats Bar */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "15px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)"
            }}>
              <div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#60a5fa" }}>2+</h3>
                <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>Years Experience</p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#60a5fa" }}>20+</h3>
                <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>Projects Done</p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#10b981" }}>100%</h3>
                <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>Commitment</p>
              </div>
            </div>

          </motion.div>

          {/* KOLOM KANAN: FOTO PROFIL RESPONSIF */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: "340px",
              height: "400px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 0 60px rgba(59, 130, 246, 0.3)"
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
              
              <div style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                right: "12px",
                padding: "10px 14px",
                backgroundColor: "rgba(3, 7, 18, 0.85)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <div style={{ fontSize: "1.1rem" }}>✨</div>
                <div>
                  <div style={{ color: "#f59e0b", fontSize: "0.75rem", marginBottom: "1px" }}>⭐⭐⭐⭐⭐</div>
                  <p style={{ fontSize: "0.75rem", color: "#e5e7eb", fontWeight: "600", margin: 0 }}>Trusted Administrative & Web Solutions</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

