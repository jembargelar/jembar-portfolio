import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { skills } from "../data/portfolio";

const technicalKeywords = [
  "Microsoft Excel",
  "HTML5 & CSS3",
  "JavaScript",
  "React.js & Vite",
  "Git & GitHub",
];

const operationalKeywords = [
  "Pengoperasian",
  "Quality Control",
  "Preventive Maintenance",
  "SOP & K3",
];

const administrationKeywords = [
  "Administrative",
  "Office Administration",
  "Document Control",
  "Data Entry",
  "Data Validation",
  "SLO & NIDI",
  "Invoice Management",
];

function getCategory(skill) {
  if (
    technicalKeywords.some((keyword) => skill.includes(keyword))
  ) {
    return "technical";
  }

  if (
    operationalKeywords.some((keyword) => skill.includes(keyword))
  ) {
    return "operational";
  }

  if (
    administrationKeywords.some((keyword) => skill.includes(keyword))
  ) {
    return "administration";
  }

  return "other";
}

export default function Skills() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const categories = [
    {
      key: "administration",
      title: isEn ? "Administration & Data" : "Administrasi & Data",
      description: isEn
        ? "Business administration, document control, data processing, and reporting."
        : "Administrasi bisnis, kontrol dokumen, pengolahan data, dan pelaporan.",
    },
    {
      key: "technical",
      title: isEn ? "Web & Technology" : "Web & Teknologi",
      description: isEn
        ? "Frontend development and the tools used to build modern web experiences."
        : "Pengembangan frontend dan tools yang digunakan untuk membangun pengalaman web modern.",
    },
    {
      key: "operational",
      title: isEn ? "Operations & Production" : "Operasional & Produksi",
      description: isEn
        ? "Production operations, quality control, maintenance, SOP, and K3."
        : "Operasional produksi, quality control, maintenance, SOP, dan K3.",
    },
  ];

  return (
    <section
      id="skills"
      style={{
        padding: "100px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,.08), transparent 68%)",
          top: "5%",
          left: "-180px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            style={{
              fontSize: "0.78rem",
              fontWeight: "800",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "10px",
            }}
          >
            {isEn ? "Capabilities" : "Keahlian"}
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "850",
              color: "var(--text-primary)",
              margin: 0,
              marginBottom: "14px",
            }}
          >
            {t("navSkills")}
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>

          <p
            style={{
              maxWidth: "680px",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginBottom: "46px",
            }}
          >
            {isEn
              ? "A practical combination of administration, data management, operations, and web development."
              : "Kombinasi praktis antara administrasi, pengelolaan data, operasional, dan pengembangan web."}
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "22px",
          }}
        >
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(
              (skill) => getCategory(skill) === category.key
            );

            return (
              <motion.article
                key={category.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: categoryIndex * 0.08,
                }}
                className="glass-card"
                style={{
                  padding: "28px",
                  minHeight: "250px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      boxShadow:
                        "0 0 18px rgba(34,211,238,.45)",
                      flexShrink: 0,
                    }}
                  />

                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: "800",
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    {category.title}
                  </h3>
                </div>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    marginBottom: "22px",
                  }}
                >
                  {category.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "9px",
                  }}
                >
                  {categorySkills.map((skill) => (
                    <span
                      key={skill}
                      className="tech-pill"
                      style={{
                        fontSize: "0.82rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 520px) {
          #skills {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
