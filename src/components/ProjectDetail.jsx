import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  FolderGit2,
  Maximize2,
  X,
  CheckCircle2,
  Lightbulb,
  Target,
  Trophy,
} from "lucide-react";
import { getProjectById, getProjectGallery } from "../api/publicData";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const lang = i18n.language === "en" ? "en" : "id";

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      setError("");
      setGallery([]);

      const [projectResult, galleryResult] = await Promise.all([
        getProjectById(id),
        getProjectGallery(id),
      ]);

      const { data, error } = projectResult;
      const {
        data: galleryData,
        error: galleryError,
      } = galleryResult;

      if (error) {
        console.error("Gagal mengambil detail project:", error);
        setError("Project tidak ditemukan.");
        setProject(null);
      } else {
        setProject(data);
      }

      if (galleryError) {
        console.error(
          "Gagal mengambil gallery project:",
          galleryError
        );
        setGallery([]);
      } else {
        setGallery(galleryData || []);
      }

      setLoading(false);
    }

    if (id) {
      fetchProject();
    }
  }, [id]);

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

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "var(--bg-color)",
          color: "var(--text-primary)",
          display: "grid",
          placeItems: "center",
          padding: "24px",
        }}
      >
        <p style={{ color: "var(--text-secondary)" }}>
          {lang === "en"
            ? "Loading project..."
            : "Memuat project..."}
        </p>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "var(--bg-color)",
          color: "var(--text-primary)",
          display: "grid",
          placeItems: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "520px",
            textAlign: "center",
            padding: "40px",
            borderRadius: "24px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            backdropFilter: "blur(18px)",
          }}
        >
          <h1
            style={{
              margin: "0 0 12px",
              fontSize: "2rem",
            }}
          >
            {lang === "en"
              ? "Project not found"
              : "Project tidak ditemukan"}
          </h1>

          <p
            style={{
              margin: "0 0 24px",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            {lang === "en"
              ? "The requested project could not be loaded."
              : "Project yang diminta tidak dapat dimuat."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 18px",
              borderRadius: "12px",
              border: "1px solid var(--card-border)",
              background: "var(--card-bg)",
              color: "var(--text-primary)",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            <ArrowLeft size={18} />
            {lang === "en" ? "Back to Portfolio" : "Kembali ke Portfolio"}
          </button>
        </div>
      </main>
    );
  }

  const category =
    lang === "en"
      ? project.category_en
      : project.category_id;

  const description =
    lang === "en"
      ? project.description_en
      : project.description_id;

  const problem =
    lang === "en"
      ? project.problem_en
      : project.problem_id;

  const solution =
    lang === "en"
      ? project.solution_en
      : project.solution_id;

  const features =
    lang === "en"
      ? project.features_en
      : project.features_id;

  const result =
    lang === "en"
      ? project.result_en
      : project.result_id;

  const sectionTitle = {
    problem: lang === "en" ? "Problem" : "Masalah",
    solution: lang === "en" ? "Solution" : "Solusi",
    features: lang === "en" ? "Key Features" : "Fitur Utama",
    result: lang === "en" ? "Result" : "Hasil",
    tech: lang === "en" ? "Technology Stack" : "Tech Stack",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-color)",
        color: "var(--text-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "-180px",
          right: "-120px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,.16), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "32px 20px 80px",
        }}
      >
        <motion.button
          type="button"
          onClick={() => navigate("/")}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "36px",
            padding: "10px 14px",
            borderRadius: "12px",
            border: "1px solid var(--card-border)",
            background: "var(--card-bg)",
            color: "var(--text-primary)",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          <ArrowLeft size={18} />
          {lang === "en" ? "Back" : "Kembali"}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <FolderGit2
              size={18}
              color="var(--accent)"
            />

            <span
              style={{
                color: "var(--accent)",
                fontSize: "0.78rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {category}
            </span>
          </div>

          <h1
            style={{
              margin: "0 0 16px",
              fontSize: "clamp(2.4rem, 7vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontWeight: 900,
            }}
          >
            {project.title}
            <span style={{ color: "var(--accent)" }}>.</span>
          </h1>

          {description && (
            <p
              style={{
                maxWidth: "780px",
                margin: "0 0 28px",
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                lineHeight: 1.75,
              }}
            >
              {description}
            </p>
          )}

          {project.project_url &&
            project.project_url !== "#" && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "13px 18px",
                  borderRadius: "13px",
                  background: "var(--accent)",
                  color: "#061018",
                  textDecoration: "none",
                  fontWeight: 800,
                  marginBottom: "36px",
                }}
              >
                <ExternalLink size={18} />
                {lang === "en"
                  ? "Visit Project"
                  : "Kunjungi Project"}
              </a>
            )}
        </motion.div>

        {project.image_url && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() =>
              setSelectedImage({
                src: project.image_url,
                title: project.title,
              })
            }
            style={{
              position: "relative",
              display: "block",
              width: "100%",
              padding: 0,
              border: 0,
              background: "transparent",
              cursor: "zoom-in",
              marginBottom: "60px",
              textAlign: "left",
            }}
          >
            <img
              src={project.image_url}
              alt={project.title}
              loading="eager"
              style={{
                display: "block",
                width: "100%",
                maxHeight: "620px",
                objectFit: "cover",
                borderRadius: "24px",
                border: "1px solid var(--card-border)",
                boxShadow:
                  "0 30px 100px rgba(0,0,0,.28)",
              }}
            />

            <span
              style={{
                position: "absolute",
                right: "18px",
                bottom: "18px",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "10px 13px",
                borderRadius: "12px",
                background: "rgba(0,0,0,.68)",
                color: "#fff",
                backdropFilter: "blur(10px)",
                fontSize: "0.82rem",
                fontWeight: 700,
              }}
            >
              <Maximize2 size={16} />
              {lang === "en" ? "Fullscreen" : "Layar Penuh"}
            </span>
          </motion.button>
        )}

        {gallery.length > 0 && (
          <section style={{ marginBottom: "60px" }}>
            <SectionHeading
              title={
                lang === "en"
                  ? "Project Gallery"
                  : "Gallery Project"
              }
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
              }}
            >
              {gallery.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                  }}
                  onClick={() =>
                    setSelectedImage({
                      src: item.image_url,
                      title:
                        lang === "en"
                          ? item.alt_text_en ||
                            project.title
                          : item.alt_text_id ||
                            project.title,
                    })
                  }
                  style={{
                    position: "relative",
                    display: "block",
                    width: "100%",
                    padding: 0,
                    border: "1px solid var(--card-border)",
                    borderRadius: "18px",
                    overflow: "hidden",
                    background: "var(--card-bg)",
                    cursor: "zoom-in",
                    textAlign: "left",
                  }}
                >
                  <img
                    src={item.image_url}
                    alt={
                      lang === "en"
                        ? item.alt_text_en ||
                          project.title
                        : item.alt_text_id ||
                          project.title
                    }
                    loading="lazy"
                    style={{
                      display: "block",
                      width: "100%",
                      aspectRatio: "16 / 10",
                      objectFit: "cover",
                      transition:
                        "transform .35s ease",
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      bottom: "10px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 10px",
                      borderRadius: "10px",
                      background: "rgba(0,0,0,.68)",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    <Maximize2 size={14} />
                    {lang === "en"
                      ? "Fullscreen"
                      : "Layar Penuh"}
                  </span>
                </motion.button>
              ))}
            </div>
          </section>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {problem && (
            <CaseStudyCard
              icon={<Target size={21} />}
              title={sectionTitle.problem}
              text={problem}
            />
          )}

          {solution && (
            <CaseStudyCard
              icon={<Lightbulb size={21} />}
              title={sectionTitle.solution}
              text={solution}
            />
          )}

          {result && (
            <CaseStudyCard
              icon={<Trophy size={21} />}
              title={sectionTitle.result}
              text={result}
            />
          )}
        </div>

        {Array.isArray(features) && features.length > 0 && (
          <section style={{ marginTop: "60px" }}>
            <SectionHeading title={sectionTitle.features} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "14px",
              }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={`${feature}-${index}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.04,
                  }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "16px",
                    borderRadius: "14px",
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                  }}
                >
                  <CheckCircle2
                    size={19}
                    color="var(--accent)"
                    style={{
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />

                  <span
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {Array.isArray(project.tech) &&
          project.tech.length > 0 && (
            <section style={{ marginTop: "60px" }}>
              <SectionHeading title={sectionTitle.tech} />

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {project.tech.map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="tech-pill"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}
      </div>

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
              background: "rgba(0,0,0,.9)",
              backdropFilter: "blur(16px)",
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
                width: "46px",
                height: "46px",
                display: "grid",
                placeItems: "center",
                borderRadius: "13px",
                border: "1px solid rgba(255,255,255,.15)",
                background: "rgba(255,255,255,.08)",
                color: "#fff",
                cursor: "pointer",
                zIndex: 10000,
              }}
            >
              <X size={22} />
            </button>

            <motion.img
              src={selectedImage.src}
              alt={selectedImage.title}
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
              style={{
                display: "block",
                width: "auto",
                maxWidth: "96vw",
                maxHeight: "88vh",
                objectFit: "contain",
                borderRadius: "14px",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function SectionHeading({ title }) {
  return (
    <h2
      style={{
        margin: "0 0 20px",
        fontSize: "1.65rem",
        fontWeight: 850,
      }}
    >
      {title}
      <span style={{ color: "var(--accent)" }}>.</span>
    </h2>
  );
}

function CaseStudyCard({ icon, title, text }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card"
      style={{
        padding: "26px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "14px",
          color: "var(--accent)",
        }}
      >
        {icon}

        <h2
          style={{
            margin: 0,
            color: "var(--text-primary)",
            fontSize: "1.2rem",
            fontWeight: 800,
          }}
        >
          {title}
        </h2>
      </div>

      <p
        style={{
          margin: 0,
          color: "var(--text-secondary)",
          lineHeight: 1.7,
        }}
      >
        {text}
      </p>
    </motion.article>
  );
}
