import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  FolderGit2,
  X,
  Maximize2,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { getProjects } from "../api/publicData";
import SectionScene from "./three/SectionScene";

export default function Projects() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const lang = i18n.language === "en" ? "en" : "id";

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError(null);
      const { data, error } = await getProjects();
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
      if (event.key === "Escape") setSelectedImage(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <section id="projects" className="projects-section" style={{ position: "relative", overflow: "hidden" }}>
      <SectionScene object="spiderman" position="left" scale={0.65} opacity={0.5} cameraZ={5.5} />
        <style>{`
          .projects-section { padding: 80px 20px; }
          .projects-inner { max-width: 950px; margin: 0 auto; position: relative; z-index: 1; }
          .projects-title {
            font-size: 2rem;
            font-weight: 800;
            color: var(--text-primary);
            margin-bottom: 40px;
          }
          .projects-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .project-row {
            position: relative;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 18px;
            overflow: hidden;
            cursor: pointer;
            transition: border-color .3s ease, box-shadow .3s ease, transform .3s ease;
          }
          .project-row::before {
            content: "";
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 3px;
            background: linear-gradient(180deg, #22d3ee, #3b82f6);
            opacity: 0;
            transition: opacity .3s ease, width .3s ease;
          }
          .project-row:hover {
            border-color: rgba(34,211,238,.35);
            box-shadow: 0 12px 40px rgba(34,211,238,.1);
            transform: translateY(-2px);
          }
          .project-row:hover::before { opacity: 1; }
          .project-row.expanded {
            border-color: rgba(34,211,238,.5);
            box-shadow: 0 20px 60px rgba(34,211,238,.14);
          }
          .project-row.expanded::before { opacity: 1; width: 4px; }

          .project-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding: 18px 22px;
          }
          .project-header-left {
            display: flex;
            align-items: center;
            gap: 14px;
            min-width: 0;
            flex: 1;
          }
          .project-icon {
            width: 42px; height: 42px;
            display: grid;
            place-items: center;
            border-radius: 12px;
            background: rgba(34,211,238,.1);
            color: var(--accent);
            border: 1px solid rgba(34,211,238,.2);
            flex-shrink: 0;
            transition: transform .35s cubic-bezier(.22,.9,.32,1), background .3s ease;
          }
          .project-row:hover .project-icon {
            transform: rotate(-6deg) scale(1.08);
            background: rgba(34,211,238,.18);
          }
          .project-title {
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0 0 3px;
            line-height: 1.3;
          }
          .project-meta {
            font-size: .78rem;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
          }
          .project-meta .dot-sep { color: var(--accent); font-weight: 800; }

          .project-chevron {
            width: 32px; height: 32px;
            display: grid;
            place-items: center;
            border-radius: 10px;
            background: var(--btn-sec-bg);
            border: 1px solid var(--card-border);
            color: var(--text-secondary);
            flex-shrink: 0;
            transition: all .3s ease;
          }
          .project-row:hover .project-chevron {
            border-color: rgba(34,211,238,.4);
            color: var(--accent);
          }
          .project-row.expanded .project-chevron {
            background: rgba(34,211,238,.12);
            border-color: rgba(34,211,238,.4);
            color: var(--accent);
          }

          .project-body { padding: 0 22px 22px; overflow: hidden; }

          .project-image-wrap {
            position: relative;
            width: 100%;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--card-border);
            cursor: zoom-in;
            margin-bottom: 18px;
            background: #000;
          }
          .project-image-wrap img {
            display: block;
            width: 100%;
            height: 220px;
            object-fit: cover;
            transition: transform .5s cubic-bezier(.22,.9,.32,1);
          }
          .project-image-wrap:hover img { transform: scale(1.04); }
          .project-image-hint {
            position: absolute;
            right: 12px; bottom: 12px;
            width: 36px; height: 36px;
            display: grid;
            place-items: center;
            border-radius: 10px;
            background: rgba(0,0,0,.65);
            color: #fff;
            backdrop-filter: blur(8px);
            transition: transform .3s ease;
          }
          .project-image-wrap:hover .project-image-hint { transform: scale(1.1); }

          .project-desc {
            color: var(--text-secondary);
            font-size: .93rem;
            line-height: 1.65;
            margin: 0 0 18px;
          }
          .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding-top: 16px;
            border-top: 1px solid var(--card-border);
            margin-bottom: 18px;
          }
          .project-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .project-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 18px;
            border-radius: 999px;
            font-size: .85rem;
            font-weight: 700;
            text-decoration: none;
            border: 1px solid transparent;
            cursor: pointer;
            font-family: inherit;
            transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease;
          }
          .project-btn:hover { transform: translateY(-2px); }
          .project-btn-primary {
            background: linear-gradient(135deg, #22d3ee, #3b82f6);
            color: #020617;
          }
          .project-btn-primary:hover { box-shadow: 0 12px 36px rgba(34,211,238,.3); }
          .project-btn-ghost {
            background: var(--btn-sec-bg);
            border-color: var(--card-border);
            color: var(--text-primary);
          }
          .project-btn-ghost:hover {
            border-color: rgba(34,211,238,.4);
            background: rgba(34,211,238,.06);
          }
        `}</style>

        <div className="projects-inner">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="projects-title"
          >
            {t("sectionProjects")}{" "}
            <span style={{ color: "var(--accent)" }}>.</span>
          </motion.h2>

          {loading && <p style={{ color: "var(--text-secondary)" }}>Memuat project...</p>}
          {error && <p style={{ color: "#ef4444" }}>{error}</p>}
          {!loading && !error && projects.length === 0 && (
            <p style={{ color: "var(--text-secondary)" }}>Belum ada project.</p>
          )}

          <div className="projects-list">
            {projects.map((proj, idx) => {
              const rowKey = proj.id || idx;
              const isExpanded = expandedId === rowKey;

              return (
                <motion.div
                  key={rowKey}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className={`project-row ${isExpanded ? "expanded" : ""}`}
                  onClick={() => toggleExpand(rowKey)}
                >
                  <div className="project-header">
                    <div className="project-header-left">
                      <div className="project-icon">
                        <FolderGit2 size={20} />
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <h3 className="project-title">{proj.title}</h3>
                        <div className="project-meta">
                          <span>{lang === "en" ? proj.category_en : proj.category_id}</span>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      className="project-chevron"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="project-body">
                          {proj.image_url && (
                            <div
                              className="project-image-wrap"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage({ src: proj.image_url, title: proj.title });
                              }}
                            >
                              <img src={proj.image_url} alt={proj.title} loading="lazy" />
                              <div className="project-image-hint">
                                <Maximize2 size={16} />
                              </div>
                            </div>
                          )}

                          <p className="project-desc">
                            {lang === "en" ? proj.description_en : proj.description_id}
                          </p>

                          <div className="project-tech">
                            {(proj.tech || []).map((tech, i) => (
                              <motion.span
                                key={i}
                                className="tech-pill"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>

                          <div className="project-actions">
                            {proj.id && (
                              <button
                                type="button"
                                className="project-btn project-btn-primary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/projects/${proj.id}`);
                                }}
                              >
                                {lang === "en" ? "Open detail" : "Buka detail"}
                                <ArrowRight size={15} />
                              </button>
                            )}
                            {proj.project_url && proj.project_url !== "#" && (
                              <a
                                href={proj.project_url}
                                target="_blank"
                                rel="noreferrer"
                                className="project-btn project-btn-ghost"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink size={15} />
                                {lang === "en" ? "Visit live" : "Kunjungi situs"}
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
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
                boxShadow: "0 30px 100px rgba(0,0,0,0.55)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
