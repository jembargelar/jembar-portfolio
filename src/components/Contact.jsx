import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { personal } from "../data/portfolio";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        {/* Judul Section Hubungi Saya */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "2rem", fontWeight: "800", color: "#f9fafb", marginBottom: "40px" }}
        >
          {t("sectionContact")} <span style={{ color: "#3B82F6" }}>.</span>
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{ padding: "48px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#f9fafb", marginBottom: "16px" }}>
            Let's Build Something Amazing Together.
          </h3>

          <p style={{ color: "#9ca3af", fontSize: "1rem", maxWidth: "540px", margin: "0 auto 32px auto", lineHeight: "1.6" }}>
            Saya terbuka untuk peluang karir, kolaborasi proyek, maupun diskusi mengenai administrasi dan pengembangan web.
          </p>

          {/* Tombol Kirim Email */}
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`mailto:${personal.email}`}
            className="btn-gradient"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              color: "#ffffff",
              padding: "14px 32px",
              borderRadius: "12px",
              fontWeight: "700",
              textDecoration: "none",
              fontSize: "1rem",
              marginBottom: "32px"
            }}
          >
            ✉️ Kirim Email ({personal.email})
          </motion.a>

          {/* Social Links */}
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", fontSize: "0.95rem" }}>
            <a href={personal.github} target="_blank" rel="noreferrer" style={{ color: "#60a5fa", textDecoration: "none", fontWeight: "600" }}>GitHub ↗</a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" style={{ color: "#60a5fa", textDecoration: "none", fontWeight: "600" }}>LinkedIn ↗</a>
          </div>
        </motion.div>

        {/* Footer */}
        <footer style={{ marginTop: "60px", textAlign: "center", color: "#6b7280", fontSize: "0.85rem" }}>
          <p>© {new Date().getFullYear()} {personal.name}. All Rights Reserved.</p>
        </footer>

      </div>
    </section>
  );
}
