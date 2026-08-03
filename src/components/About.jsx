import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { personal } from "../data/portfolio";

export default function About() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';

  return (
    <section id="about" style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ 
            fontSize: "2rem", 
            marginBottom: "24px", 
            color: "#fff",
            borderBottom: "2px solid #38bdf8",
            display: "inline-block",
            paddingBottom: "8px"
          }}
        >
          {t("sectionAbout")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -4 }}
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "16px",
            padding: "28px",
            border: "1px solid #334155",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
          }}
        >
          <p style={{ 
            color: "#cbd5e1", 
            fontSize: "1.05rem", 
            lineHeight: "1.8", 
            margin: 0 
          }}>
            {personal.bio[lang]}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
