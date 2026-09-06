import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { getEducation } from "../api/publicData";

const fallbackEducation = [
  {
    id: "ut",
    institution: "Universitas Terbuka",
    degree_id: "S1 Manajemen",
    degree_en: "Bachelor of Management",
    period_id: "September 2026 – Sekarang",
    period_en: "September 2026 – Present",
    description_id:
      "Mempelajari Manajemen Operasional, Manajemen SDM, Administrasi Bisnis, Manajemen Risiko, Kepemimpinan, Analisis Organisasi, dan Manajemen Strategis.",
    description_en:
      "Studying Operations Management, HR Management, Business Administration, Risk Management, Leadership, Organizational Analysis, and Strategic Management.",
  },
  {
    id: "sman1garut",
    institution: "SMAN 1 Garut",
    degree_id: "SMA - Ilmu Pengetahuan Alam (IPA)",
    degree_en: "Senior High School - Natural Sciences",
    period_id: "Juli 2020 – Mei 2023",
    period_en: "July 2020 – May 2023",
    description_id:
      "Lulus dari jurusan Ilmu Pengetahuan Alam (IPA) dengan fokus pada kemampuan analitis, logika, dan pemecahan masalah.",
    description_en:
      "Graduated with a major in Natural Sciences (IPA), focusing on analytical skills, logic, and structured problem-solving.",
  },
];

export default function Education() {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState(fallbackEducation);

  const isEn = i18n.language === "en";

  useEffect(() => {
    let mounted = true;

    async function load() {
      const { data, error } = await getEducation();

      if (!mounted || error || !data?.length) return;

      setItems(data);
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="education" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            marginBottom: 40,
          }}
        >
          {t("navEducation")}
          <span style={{ color: "var(--accent-blue)" }}>.</span>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: 24,
          }}
        >
          {items.map((edu, idx) => {
            const period =
              isEn
                ? edu.period_en || edu.period_id
                : edu.period_id || edu.period_en;

            const degree =
              isEn
                ? edu.degree_en || edu.degree_id
                : edu.degree_id || edu.degree_en;

            const desc =
              isEn
                ? edu.description_en ||
                  edu.description_id
                : edu.description_id ||
                  edu.description_en;

            const ongoing =
              /present|sekarang/i.test(
                period || ""
              );

            return (
              <motion.div
                key={edu.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card"
                style={{
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        backgroundColor:
                          "var(--tag-bg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent-blue)",
                      }}
                    >
                      <GraduationCap size={22} />
                    </div>

                    <span
                      style={{
                        fontSize: ".75rem",
                        fontWeight: 600,
                        color: "#10b981",
                        backgroundColor:
                          "rgba(16,185,129,.1)",
                        padding: "4px 10px",
                        borderRadius: 20,
                      }}
                    >
                      {ongoing
                        ? isEn
                          ? "Ongoing"
                          : "Sedang Menempuh"
                        : isEn
                          ? "Graduated"
                          : "Lulus"}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 6,
                    }}
                  >
                    {degree}
                  </h3>

                  <p
                    className="role-text"
                    style={{
                      fontSize: ".95rem",
                      marginBottom: 12,
                    }}
                  >
                    {edu.institution}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      color: "var(--text-secondary)",
                      fontSize: ".85rem",
                      marginBottom: 16,
                    }}
                  >
                    <Calendar size={14} />
                    <span>{period}</span>
                  </div>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: ".9rem",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
