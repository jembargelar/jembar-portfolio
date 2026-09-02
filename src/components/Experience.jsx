import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Calendar, Building2 } from "lucide-react";
import { experiences } from "../data/portfolio";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <section id="experience" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            color: "var(--text-primary)",
            marginBottom: "48px",
          }}
        >
          {t("navExperience")}{" "}
          <span style={{ color: "var(--accent)" }}>.</span>
        </motion.h2>

        <div style={{ position: "relative", paddingLeft: "28px" }}>
          <div
            style={{
              position: "absolute",
              top: "8px",
              bottom: "8px",
              left: "8px",
              width: "2px",
              background:
                "linear-gradient(180deg, var(--primary) 0%, rgba(59, 130, 246, 0.1) 100%)",
            }}
          />

          {experiences.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${idx}`}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              style={{
                position: "relative",
                marginBottom: idx === experiences.length - 1 ? 0 : "40px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "-28px",
                  top: "6px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg-color)",
                  border: "3px solid var(--accent)",
                  boxShadow: "0 0 12px var(--accent)",
                  zIndex: 2,
                }}
              />

              <div
                className="glass-card"
                style={{
                  padding: "26px",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      minWidth: 0,
                    }}
                  >
                    <Building2
                      size={20}
                      color="var(--accent)"
                      style={{ flexShrink: 0 }}
                    />

                    <h3
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "var(--text-primary)",
                        margin: 0,
                      }}
                    >
                      {exp.company}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "var(--text-secondary)",
                      fontSize: "0.85rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Calendar size={14} />
                    <span>
                      {isEn ? exp.period.en : exp.period.id}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    color: "var(--accent)",
                    fontWeight: "600",
                    fontSize: "0.98rem",
                    marginBottom: "12px",
                  }}
                >
                  {isEn ? exp.role.en : exp.role.id}
                </p>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                  }}
                >
                  {isEn ? exp.description.en : exp.description.id}
                </p>

                {exp.highlights?.[isEn ? "en" : "id"]?.length > 0 && (
                  <ul
                    style={{
                      margin: "0 0 20px",
                      paddingLeft: "20px",
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {exp.highlights[isEn ? "en" : "id"].map(
                      (highlight, highlightIdx) => (
                        <li key={highlightIdx} style={{ marginBottom: "6px" }}>
                          {highlight}
                        </li>
                      )
                    )}
                  </ul>
                )}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {exp.tags?.map((tag, tagIdx) => (
                    <span key={tagIdx} className="tech-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
