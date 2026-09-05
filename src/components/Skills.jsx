import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { getSkills } from "../api/publicData";

const fallbackSkills = [
  {
    id: "fallback-1",
    name_id: "Microsoft Excel",
    name_en: "Microsoft Excel",
    category: "technical",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "fallback-2",
    name_id: "HTML5 & CSS3",
    name_en: "HTML5 & CSS3",
    category: "technical",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "fallback-3",
    name_id: "JavaScript",
    name_en: "JavaScript",
    category: "technical",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "fallback-4",
    name_id: "React.js & Vite",
    name_en: "React.js & Vite",
    category: "technical",
    sort_order: 4,
    is_active: true,
  },
  {
    id: "fallback-5",
    name_id: "Git & GitHub",
    name_en: "Git & GitHub",
    category: "technical",
    sort_order: 5,
    is_active: true,
  },
  {
    id: "fallback-6",
    name_id: "Pengoperasian",
    name_en: "Operations",
    category: "operational",
    sort_order: 6,
    is_active: true,
  },
  {
    id: "fallback-7",
    name_id: "Quality Control",
    name_en: "Quality Control",
    category: "operational",
    sort_order: 7,
    is_active: true,
  },
  {
    id: "fallback-8",
    name_id: "Preventive Maintenance",
    name_en: "Preventive Maintenance",
    category: "operational",
    sort_order: 8,
    is_active: true,
  },
  {
    id: "fallback-9",
    name_id: "SOP & K3",
    name_en: "SOP & Occupational Safety",
    category: "operational",
    sort_order: 9,
    is_active: true,
  },
  {
    id: "fallback-10",
    name_id: "Administrative",
    name_en: "Administrative",
    category: "administration",
    sort_order: 10,
    is_active: true,
  },
  {
    id: "fallback-11",
    name_id: "Office Administration",
    name_en: "Office Administration",
    category: "administration",
    sort_order: 11,
    is_active: true,
  },
  {
    id: "fallback-12",
    name_id: "Document Control",
    name_en: "Document Control",
    category: "administration",
    sort_order: 12,
    is_active: true,
  },
  {
    id: "fallback-13",
    name_id: "Data Entry",
    name_en: "Data Entry",
    category: "administration",
    sort_order: 13,
    is_active: true,
  },
  {
    id: "fallback-14",
    name_id: "Data Validation",
    name_en: "Data Validation",
    category: "administration",
    sort_order: 14,
    is_active: true,
  },
  {
    id: "fallback-15",
    name_id: "SLO & NIDI",
    name_en: "SLO & NIDI",
    category: "administration",
    sort_order: 15,
    is_active: true,
  },
  {
    id: "fallback-16",
    name_id: "Invoice Management",
    name_en: "Invoice Management",
    category: "administration",
    sort_order: 16,
    is_active: true,
  },
];

const categories = [
  {
    key: "administration",
    title_id: "Administrasi & Data",
    title_en: "Administration & Data",
    description_id:
      "Administrasi bisnis, kontrol dokumen, pengolahan data, dan pelaporan.",
    description_en:
      "Business administration, document control, data processing, and reporting.",
  },
  {
    key: "technical",
    title_id: "Web & Teknologi",
    title_en: "Web & Technology",
    description_id:
      "Pengembangan frontend dan tools yang digunakan untuk membangun pengalaman web modern.",
    description_en:
      "Frontend development and the tools used to build modern web experiences.",
  },
  {
    key: "operational",
    title_id: "Operasional & Produksi",
    title_en: "Operations & Production",
    description_id:
      "Operasional produksi, quality control, maintenance, SOP, dan K3.",
    description_en:
      "Production operations, quality control, maintenance, SOP, and K3.",
  },
];

export default function Skills() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [skills, setSkills] = useState(fallbackSkills);

  useEffect(() => {
    let mounted = true;

    async function loadSkills() {
      const { data, error } = await getSkills();

      if (error) {
        console.error("Skills fetch error:", error);
        return;
      }

      if (mounted && data) {
        setSkills(data);
      }
    }

    loadSkills();

    return () => {
      mounted = false;
    };
  }, []);

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
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "22px",
          }}
        >
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category.key
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
                      boxShadow: "0 0 18px rgba(34,211,238,.45)",
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
                    {isEn ? category.title_en : category.title_id}
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
                  {isEn
                    ? category.description_en
                    : category.description_id}
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
                      key={skill.id}
                      className="tech-pill"
                      style={{
                        fontSize: "0.82rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {isEn
                        ? skill.name_en || skill.name_id
                        : skill.name_id}
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
