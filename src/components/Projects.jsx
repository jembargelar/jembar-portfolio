import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { projects } from "../data/portfolio";

export default function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';

  return (
    <section id="projects" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "950px", margin: "0 auto" }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "40px" }}>
          {t("sectionProjects")} <span style={{ color: "var(--accent)" }}>.</span>
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {projects.map((proj, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <FolderGit2 size={18} color="var(--accent)" />
                    <span style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: "700", textTransform: "uppercase" }}>
                      {proj.category[lang]}
                    </span>
                  </div>
                  {proj.link && proj.link !== "#" && (
                    <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>{proj.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: "1.6", marginBottom: "24px" }}>{proj.description[lang]}</p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingTop: "16px", borderTop: "1px solid var(--card-border)" }}>
                {proj.tech.map((tItem, i) => (
                  <span key={i} className="tech-pill">{tItem}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
