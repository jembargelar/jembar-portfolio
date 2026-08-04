import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import { personal } from "../data/portfolio";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "950px", margin: "0 auto" }}>
        
        {/* Title Dynamic */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "40px" }}
        >
          {t("sectionContact")} <span style={{ color: "#3B82F6" }}>.</span>
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
          
          {/* Main Action Glass Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: "36px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              {/* Lets Build Dynamic */}
              <h3 style={{ fontSize: "1.4rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>
                {t("letsBuild")}
              </h3>

              {/* Subtitle Dynamic */}
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "28px" }}>
                {t("contactSubtitle")}
              </p>
            </div>

            <div>
              {/* Tombol Email Dynamic */}
              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={`mailto:${personal.email}`}
                className="btn-gradient"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  color: "#ffffff",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  width: "100%",
                  marginBottom: "20px"
                }}
              >
                <Mail size={18} />
                <span>{t("sendEmail")} ({personal.email})</span>
              </motion.a>

              {/* Social Links */}
              <div style={{ display: "flex", gap: "16px" }}>
                <a 
                  href={personal.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ 
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    color: "var(--text-primary)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--card-border)",
                    padding: "10px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "0.85rem"
                  }}
                >
                  <Github size={16} /> GitHub ↗
                </a>
                <a 
                  href={personal.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ 
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    color: "var(--text-primary)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--card-border)",
                    padding: "10px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "0.85rem"
                  }}
                >
                  <Linkedin size={16} /> LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>

          {/* Small Interactive Map Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card"
            style={{ padding: "20px", overflow: "hidden", display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <MapPin size={18} color="#60a5fa" />
              <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--text-primary)" }}>
                Location Base: West Java, Indonesia
              </span>
            </div>

            <div style={{
              width: "100%",
              height: "220px",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid var(--card-border)"
            }}>
              <iframe
                title="Location Map"
                src="https://maps.google.com/maps?q=Cianjur,West%20Java&t=&z=10&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(80%) invert(90%) contrast(120%)" }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </motion.div>

        </div>

        {/* Footer Dynamic */}
        <footer style={{ marginTop: "60px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
          <p>© {new Date().getFullYear()} {personal.name}. {t("copyright")}</p>
        </footer>

      </div>
    </section>
  );
}
