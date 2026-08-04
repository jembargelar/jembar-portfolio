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

        {/* Header Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "40px" }}
        >
          {t("sectionProjects")} <span style={{ color: "var(--accent-blue)" }}>.</span>
        </motion.h2>

        {/* Project Cards List */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="glass-card"
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative"
              }}
            >
              <div>
                {/* Header Card: Category & Action Links */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <FolderGit2 size={18} color="var(--tag-text)" />
                    <span style={{
                      fontSize: "0.75rem",
                      color: "var(--tag-text)",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    }}>
                      {proj.category[lang]}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    {proj.link && proj.link !== "#" && (
                      <motion.a
                        whileHover={{ scale: 1.15 }}
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "var(--tag-text)", display: "flex", alignItems: "center", transition: "0.2s" }}
                        title="Open Project Link"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>
                  {proj.title}
                </h3>

                {/* Description */}
                <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: "1.6", marginBottom: "24px" }}>
                  {proj.description[lang]}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingTop: "16px", borderTop: "1px solid var(--card-border)" }}>
                {proj.tech.map((tItem, i) => (
                  <span key={i} className="tech-badge" style={{
                    fontSize: "0.78rem",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontWeight: "500"
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
