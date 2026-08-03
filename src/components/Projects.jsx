import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { projects } from "../data/portfolio";

export default function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';

  return (
    <section id="projects" style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ 
            fontSize: "2rem", 
            marginBottom: "32px", 
            color: "#fff",
            borderBottom: "2px solid #38bdf8",
            display: "inline-block",
            paddingBottom: "8px"
          }}
        >
          {t("sectionProjects")}
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {projects.map((proj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid #334155"
              }}
            >
              <span style={{ 
                fontSize: "0.8rem", 
                color: "#38bdf8", 
                textTransform: "uppercase", 
                letterSpacing: "1px",
                fontWeight: "bold" 
              }}>
                {proj.category[lang]}
              </span>
              
              <h3 style={{ fontSize: "1.3rem", color: "#f8fafc", margin: "8px 0 12px 0" }}>
                {proj.title}
              </h3>
              
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "16px" }}>
                {proj.description[lang]}
              </p>

              {/* Badges Tekno */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {proj.tech.map((tItem, i) => (
                  <span key={i} style={{
                    backgroundColor: "#0f172a",
                    color: "#cbd5e1",
                    fontSize: "0.8rem",
                    padding: "4px 10px",
                    borderRadius: "6px"
                  }}>
                    {tItem}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
