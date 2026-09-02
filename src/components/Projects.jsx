import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  FolderGit2,
  X,
  Maximize2,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <>
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
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedImage({
                          src: proj.image_url,
                          title: proj.title,
                        })
                      }
                      aria-label={`View ${proj.title} image fullscreen`}
                      style={{
                        position: "relative",
                        display: "block",
                        width: "100%",
                        padding: 0,
                        border: 0,
                        background: "transparent",
                        cursor: "zoom-in",
                        marginBottom: "18px",
                        textAlign: "left",
                      }}
                    >
                      <img
                        src={proj.image_url}
                        alt={proj.title}
                        loading="lazy"
                        style={{
                          display: "block",
                          width: "100%",
                          height: "180px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          border:
                            "1px solid var(--card-border)",
                        }}
                      />

                      <span
                        style={{
                          position: "absolute",
                          right: "12px",
                          bottom: "12px",
                          width: "36px",
                          height: "36px",
                          display: "grid",
                          placeItems: "center",
                          borderRadius: "10px",
                          background:
                            "rgba(0, 0, 0, 0.65)",
                          color: "#fff",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <Maximize2 size={17} />
                      </span>
                    </button>
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

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              background: "rgba(0, 0, 0, 0.88)",
              backdropFilter: "blur(14px)",
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close fullscreen image"
              style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                width: "44px",
                height: "44px",
                display: "grid",
                placeItems: "center",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                cursor: "pointer",
                zIndex: 10000,
              }}
            >
              <X size={22} />
            </button>

            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              src={selectedImage.src}
              alt={selectedImage.title}
              onClick={(event) => event.stopPropagation()}
              style={{
                maxWidth: "min(1200px, 96vw)",
                maxHeight: "88vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                borderRadius: "16px",
                boxShadow:
                  "0 30px 100px rgba(0,0,0,0.55)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
