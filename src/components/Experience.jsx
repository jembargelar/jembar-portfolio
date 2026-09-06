import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Calendar, Building2 } from "lucide-react";
import { getExperiences } from "../api/publicData";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function loadExperiences() {
      const { data, error } = await getExperiences();

      if (!error && data?.length && mounted) {
        setExperiences(data);
      }
    }

    loadExperiences();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="experience"
      style={{
        padding: "80px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
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
          <span style={{ color: "var(--accent)" }}>
            .
          </span>
        </motion.h2>

        <div
          style={{
            position: "relative",
            paddingLeft: "28px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "8px",
              bottom: "8px",
              left: "8px",
              width: "2px",
              background:
                "linear-gradient(180deg, var(--primary) 0%, rgba(59,130,246,.1) 100%)",
            }}
          />

          {experiences.map((exp, idx) => {
            const period =
              exp.period?.[isEn ? "en" : "id"] ??
              exp[`period_${isEn ? "en" : "id"}`];

            const role =
              exp.role?.[isEn ? "en" : "id"] ??
              exp[`role_${isEn ? "en" : "id"}`];

            const description =
              exp.description?.[isEn ? "en" : "id"] ??
              exp[`description_${isEn ? "en" : "id"}`];

            const highlights =
              exp.highlights?.[isEn ? "en" : "id"] ??
              exp[`highlights_${isEn ? "en" : "id"}`] ??
              [];

            const tags = exp.tags || [];

            return (
              <motion.div
                key={exp.id || `${exp.company}-${idx}`}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.12,
                }}
                style={{
                  position: "relative",
                  marginBottom:
                    idx === experiences.length - 1
                      ? 0
                      : "40px",
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
                        style={{
                          flexShrink: 0,
                        }}
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
                        fontSize: ".85rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Calendar size={14} />
                      <span>{period}</span>
                    </div>
                  </div>

                  <p
                    style={{
                      color: "var(--accent)",
                      fontWeight: "600",
                      fontSize: ".98rem",
                      marginBottom: "12px",
                    }}
                  >
                    {role}
                  </p>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: ".95rem",
                      lineHeight: "1.6",
                      marginBottom:
                        highlights.length > 0 ? "20px" : 0,
                    }}
                  >
                    {description}
                  </p>

                  {highlights.length > 0 && (
                    <ul
                      style={{
                        margin: "0 0 20px",
                        paddingLeft: "20px",
                        color: "var(--text-secondary)",
                        fontSize: ".9rem",
                        lineHeight: "1.6",
                      }}
                    >
                      {highlights.map(
                        (highlight, highlightIdx) => (
                          <li
                            key={highlightIdx}
                            style={{
                              marginBottom: "6px",
                            }}
                          >
                            {highlight}
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  {tags.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {tags.map((tag, tagIdx) => (
                        <span
                          key={`${tag}-${tagIdx}`}
                          className="tech-pill"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
