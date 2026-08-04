import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { personal } from "../data/portfolio";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "950px", margin: "0 auto" }}>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "40px" }}
        >
          {t("sectionContact")} <span style={{ color: "var(--accent-blue)" }}>.</span>
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
              <h3 style={{ fontSize: "1.4rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>
                {t("letsBuild")}
              </h3>

              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "28px" }}>
                {t("contactSubtitle")}
              </p>
            </div>

            <div>
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
                    backgroundColor: "var(--btn-sec-bg)",
                    border: "1px solid var(--card-border)",
                    padding: "10px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "0.85rem"
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  GitHub ↗
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
                    backgroundColor: "var(--btn-sec-bg)",
                    border: "1px solid var(--card-border)",
                    padding: "10px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "0.85rem"
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card"
            style={{ padding: "20px", overflow: "hidden", display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <MapPin size={18} color="var(--accent-blue)" />
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
                style={{ border: 0, filter: "var(--map-filter)" }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <footer style={{ marginTop: "60px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
          <p>© {new Date().getFullYear()} {personal.name}. {t("copyright")}</p>
        </footer>

      </div>
    </section>
  );
}
