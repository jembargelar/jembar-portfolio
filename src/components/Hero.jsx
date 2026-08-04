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

        {/* Foto Profil Interaktif (Bisa diklik, bentuk lingkaran, ada efek glow) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <a 
            href="/jem.webp" 
            target="_blank" 
            rel="noopener noreferrer"
            title={isEn ? "Click to view full image" : "Klik untuk melihat foto ukuran penuh"}
            style={{ display: "block", position: "relative" }}
          >
            {/* Efek Lingkaran Bercahaya */}
            <div style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent), transparent)",
              zIndex: 0,
              filter: "blur(8px)",
              opacity: 0.7
            }} />

            {/* Kontainer Foto Lingkaran */}
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

            {/* Badge View */}
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

        {/* Teks Perkenalan Lengkap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}
        >
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", fontWeight: "500", margin: 0 }}>
            {isEn ? "Hello, I am" : "Halo, Saya"}
          </p>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "800", color: "var(--text-primary)", margin: 0 }}>
            {personal.name} <span style={{ color: "var(--accent)" }}>.</span>
          </h1>

          {/* Badge Peran / Keahlian */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginTop: "4px" }}>
            <span style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "6px 14px", borderRadius: "20px", fontSize: "0.85rem", color: "var(--accent)", fontWeight: "600" }}>Administrative Professional</span>
            <span style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "6px 14px", borderRadius: "20px", fontSize: "0.85rem", color: "var(--accent)", fontWeight: "600" }}>Web Developer</span>
            <span style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "6px 14px", borderRadius: "20px", fontSize: "0.85rem", color: "var(--accent)", fontWeight: "600" }}>Management Student</span>
          </div>

          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "700px", margin: "10px auto 0 auto", lineHeight: "1.7", textAlign: "center" }}>
            {isEn 
              ? "Experienced in administration, manufacturing, and data processing through PT Syahrendra Megawatt Indonesia, PT Garyman Kreasi Indonesia, and UD Sinar Soccer Industries. Currently developing expertise as a Web Developer focusing on modern, responsive, and SEO-friendly websites." 
              : "Memiliki pengalaman di bidang administrasi, manufaktur, dan pengolahan data melalui PT Syahrendra Megawatt Indonesia, PT Garyman Kreasi Indonesia, serta UD Sinar Soccer Industries. Saat ini saya juga mengembangkan keahlian sebagai Web Developer dengan fokus pada website modern, responsif, dan SEO Friendly."
            }
          </p>
        </motion.div>

        {/* Statistik / Counter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            width: "100%",
            maxWidth: "600px",
            margin: "10px 0",
            padding: "20px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "16px",
            boxShadow: "0 10px 30px var(--shadow-color)"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--accent)", margin: "0 0 4px 0" }}>500+</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, fontWeight: "600" }}>Project</p>
          </div>
          <div style={{ textAlign: "center", borderLeft: "1px solid var(--card-border)", borderRight: "1px solid var(--card-border)" }}>
            <h3 style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--accent)", margin: "0 0 4px 0" }}>3+</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, fontWeight: "600" }}>Experience</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--accent)", margin: "0 0 4px 0" }}>100%</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, fontWeight: "600" }}>Commitment</p>
          </div>
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
