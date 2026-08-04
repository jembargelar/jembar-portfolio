import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

export default function Education() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const eduList = [
    {
      title: isEn ? "Bachelor of Management" : "S1 Manajemen",
      institution: "Universitas Terbuka",
      period: "Sept 2026 - Present",
      desc: isEn
        ? "Focusing on Operational Management, Business Administration, HR, Strategic Planning, and Data Analysis."
        : "Fokus pada Manajemen Operasional, Administrasi Bisnis, SDM, Perencanaan Strategis, dan Analisis Data.",
      status: isEn ? "Ongoing Degree" : "Sedang Menempuh Pendidikan"
    },
    {
      title: isEn ? "Senior High School - Natural Sciences" : "SMA - Ilmu Pengetahuan Alam (IPA)",
      institution: "SMAN 1 Garut",
      period: "July 2020 - May 2023",
      desc: isEn
        ? "Graduated with a focus on analytical thinking, logic, mathematics, and structured problem solving."
        : "Lulus dengan fokus pada pola pikir analitis, logika, matematika, dan pemecahan masalah terstruktur.",
      status: isEn ? "Graduated" : "Lulus"
    }
  ];

  return (
    <section id="education" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "40px" }}
        >
          {t("navEducation")} <span style={{ color: "var(--accent-blue)" }}>.</span>
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {eduList.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass-card"
              style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    backgroundColor: "var(--tag-bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-blue)"
                  }}>
                    <GraduationCap size={22} />
                  </div>
                  <span style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#10b981",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    border: "1px solid rgba(16, 185, 129, 0.2)"
                  }}>
                    {edu.status}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "6px" }}>
                  {edu.title}
                </h3>

                <p className="role-text" style={{ fontSize: "0.95rem", marginBottom: "12px" }}>
                  {edu.institution}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "16px" }}>
                  <Calendar size={14} />
                  <span>{edu.period}</span>
                </div>

                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6", margin: 0 }}>
                  {edu.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
