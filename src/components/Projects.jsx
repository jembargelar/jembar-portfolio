import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { supabase } from "../api/supabaseClient";

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lang = i18n.language === "en" ? "en" : "id";

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal mengambil projects:", error);
        setError("Gagal memuat project.");
      } else {
        setProjects(data || []);
      }

      setLoading(false);
    }

    fetchProjects();
  }, []);

  return (
    <section id="projects" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "950px", margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            color: "var(--text-primary)",
            marginBottom: "40px",
          }}
        >
          {t("sectionProjects")}{" "}
          <span style={{ color: "var(--accent)" }}>.</span>
        </motion.h2>

        {loading && (
          <p style={{ color: "var(--text-secondary)" }}>
            Memuat project...
          </p>
        )}

        {error && (
          <p style={{ color: "#ef4444" }}>
            {error}
          </p>
        )}

        {!loading && !error && projects.length === 0 && (
          <p style={{ color: "var(--text-secondary)" }}>
            Belum ada project.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FolderGit2
                      size={18}
                      color="var(--accent)"
                    />

                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--accent)",
                        fontWeight: "700",
                        textTransform: "uppercase",
                      }}
                    >
                      {lang === "en"
                        ? proj.category_en
                        : proj.category_id}
                    </span>
                  </div>

                  {proj.project_url &&
                    proj.project_url !== "#" && (
                      <a
                        href={proj.project_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "var(--accent)",
                        }}
                        aria-label={`Open ${proj.title}`}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                </div>

                {proj.image_url && (
                  <img
                    src={proj.image_url}
                    alt={proj.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "18px",
                      border: "1px solid var(--card-border)",
                    }}
                  />
                )}

                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    color: "var(--text-primary)",
                    marginBottom: "12px",
                  }}
                >
                  {proj.title}
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.93rem",
                    lineHeight: "1.6",
                    marginBottom: "24px",
                  }}
                >
                  {lang === "en"
                    ? proj.description_en
                    : proj.description_id}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  paddingTop: "16px",
                  borderTop:
                    "1px solid var(--card-border)",
                }}
              >
                {(proj.tech || []).map((tech, i) => (
                  <span
                    key={i}
                    className="tech-pill"
                  >
                    {tech}
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
