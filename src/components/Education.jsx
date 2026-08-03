import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { education } from "../data/portfolio";

export default function Education() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';

  return (
    <section id="education" style={{ padding: "60px 20px" }}>
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
          {t("sectionEducation")}
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid #334155"
              }}
            >
              <h3 style={{ fontSize: "1.25rem", color: "#38bdf8", marginBottom: "4px" }}>
                {edu.degree[lang]}
              </h3>
              
              <h4 style={{ fontSize: "1rem", color: "#f8fafc", fontWeight: "600", marginBottom: "8px" }}>
                🎓 {edu.institution}
              </h4>
              
              <span style={{ 
                display: "inline-block",
                fontSize: "0.85rem", 
                color: "#94a3b8", 
                marginBottom: "12px",
                backgroundColor: "#0f172a",
                padding: "4px 10px",
                borderRadius: "6px"
              }}>
                🗓️ {edu.period[lang]}
              </span>

              <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                {edu.description[lang]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
