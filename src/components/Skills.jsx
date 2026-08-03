import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { skills } from "../data/portfolio";

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ 
            fontSize: "2rem", 
            marginBottom: "32px", 
            color: "#38bdf8",
            display: "inline-block"
          }}
        >
          {t("sectionSkills")}
        </motion.h2>

        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "12px", 
          justifyContent: "center" 
        }}>
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              whileHover={{ scale: 1.08, backgroundColor: "#0284c7", color: "#ffffff" }}
              style={{
                backgroundColor: "#1e293b",
                color: "#93c5fd",
                padding: "10px 18px",
                borderRadius: "30px",
                fontSize: "0.9rem",
                fontWeight: "500",
                border: "1px solid #334155",
                cursor: "default",
                transition: "all 0.2s ease"
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
