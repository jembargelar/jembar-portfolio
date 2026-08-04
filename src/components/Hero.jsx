import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { personal } from "../data/portfolio";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="about" style={{ padding: "120px 20px 80px 20px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "90vh" }}>
      <div style={{ maxWidth: "920px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "30px" }}>
        
        {/* Foto Profil Lingkaran */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid var(--accent)",
            boxShadow: "0 10px 30px var(--shadow-color)"
          }}
        >
          <img 
            src="/jem.jpg" 
            alt={personal.name} 
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
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
