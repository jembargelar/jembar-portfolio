import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { personal } from "../data/portfolio";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="about" style={{ padding: "120px 20px 80px 20px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "90vh" }}>
      <div style={{ maxWidth: "920px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "30px" }}>

        {/* Foto Profil Interaktif (Bisa diklik & ada efek hover) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: "relative",
            cursor: "pointer"
          }}
        >
          <a 
            href="/jem.webp" 
            target="_blank" 
            rel="noopener noreferrer"
            title={isEn ? "Click to view full image" : "Klik untuk melihat foto ukuran penuh"}
            style={{ display: "block", position: "relative" }}
          >
            {/* Efek Lingkaran Bercahaya di Luar */}
            <div style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent), transparent)",
              zIndex: 0,
              filter: "blur(8px)",
              opacity: 0.7
            }} />

            {/* Kontainer Foto Utama */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "190px",
                height: "190px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid var(--accent)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
                backgroundColor: "var(--card-bg)"
              }}
            >
              <img
                src="/jem.webp?v=2"
                alt={personal.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Badge kecil petunjuk "Klik" */}
            <span style={{
              position: "absolute",
              bottom: "5px",
              right: "5px",
              zIndex: 2,
              backgroundColor: "var(--accent)",
              color: "#fff",
              fontSize: "0.7rem",
              padding: "4px 8px",
              borderRadius: "20px",
              fontWeight: "600",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
            }}>
              🔍 View
            </span>
          </a>
        </motion.div>

        {/* Teks Perkenalan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "800", color: "var(--text-primary)", marginBottom: "12px" }}>
            {personal.name} <span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--accent)", fontWeight: "600", marginBottom: "16px" }}>
            {isEn ? personal.roleEn : personal.roleId}
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            {isEn ? personal.aboutEn : personal.aboutId}
          </p>
        </motion.div>

        {/* Tombol Aksi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <a
            href="#projects"
            style={{
              backgroundColor: "var(--accent)",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: "700",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <span>{isEn ? "View Projects" : "Lihat Proyek"}</span>
            <ArrowRight size={16} />
          </a>

          <a
            href="#contact"
            style={{
              backgroundColor: "var(--btn-sec-bg)",
              color: "var(--text-primary)",
              border: "1px solid var(--card-border)",
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: "700",
              textDecoration: "none"
            }}
          >
            {isEn ? "Contact Me" : "Hubungi Saya"}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
