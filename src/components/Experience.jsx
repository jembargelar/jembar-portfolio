import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2 } from "lucide-react";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const experiences = [
    {
      year: "2025 - 2026",
      company: "PT Syahrendra Megawatt Indonesia",
      role: isEn ? "Administrative & Document Control Specialist" : "Spesialis Administrasi & Kontrol Dokumen",
      period: isEn ? "Nov 2025 - Aug 2026" : "Nov 2025 - Agu 2026",
      desc: isEn
        ? "Managed SLO & NIDI administrative processing, operational logging, customer database validation, and executive reporting."
        : "Mengelola pemrosesan administrasi SLO & NIDI, pencatatan operasional, validasi database pelanggan, dan pelaporan eksekutif.",
      skills: ["SLO & NIDI", "Excel Advanced", "Document Control", "Operational Reporting"]
    },
    {
      year: "2025",
      company: "PT Garyman Kreasi Indonesia",
      role: isEn ? "Laser Cutting Operator" : "Operator Cutting Laser",
      period: isEn ? "Sep 2025 - Oct 2025" : "Sep 2025 - Okt 2025",
      desc: isEn
        ? "Operated high-precision laser cutting machines according to company SOPs, set material parameters, conducted Quality Control (QC) inspections, and performed routine light maintenance."
        : "Mengoperasikan mesin cutting laser sesuai SOP perusahaan, menyiapkan material dan mengatur parameter mesin, melakukan pemeriksaan Quality Control (QC), serta perawatan ringan mesin.",
      skills: ["Laser Cutting", "Quality Control (QC)", "Preventive Maintenance", "SOP & K3"]
    },
    {
      year: "2022 - 2024",
      company: "UD Sinar Soccer Industries",
      role: isEn ? "Production Machine Operator" : "Operator Mesin Produksi",
      period: isEn ? "Mar 2022 - Aug 2024" : "Mar 2022 - Agu 2024",
      desc: isEn
        ? "Operated production machinery in compliance with company SOPs, prepared raw materials, conducted step-by-step product quality checks, and ensured daily targets were achieved safely."
        : "Mengoperasikan mesin produksi sesuai SOP perusahaan, menyiapkan bahan baku, melakukan pengecekan kualitas produk bertahap, serta menjaga standar K3 dan target harian.",
      skills: ["Machine Operation", "Quality Control (QC)", "Preventive Maintenance", "SOP & K3 Compliance"]
    }
  ];

  return (
    <section id="experience" style={{ padding: "80px 20px", position: "relative" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "48px" }}
        >
          {t("navExperience")} <span style={{ color: "#3B82F6" }}>.</span>
        </motion.h2>

        {/* Timeline Container */}
        <div style={{ position: "relative", paddingLeft: "28px" }}>

          {/* Glowing Vertical Line */}
          <div style={{
            position: "absolute",
            top: "8px",
            bottom: "8px",
            left: "8px",
            width: "2px",
            background: "linear-gradient(180deg, #3B82F6 0%, rgba(59, 130, 246, 0.2) 100%)"
          }} />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              style={{ position: "relative", marginBottom: "40px" }}
            >
              {/* Pulsing Node Dot */}
              <div style={{
                position: "absolute",
                left: "-28px",
                top: "6px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-color)",
                border: "3px solid #3B82F6",
                boxShadow: "0 0 12px #3B82F6",
                zIndex: 2
              }} />

              {/* Experience Glass Card */}
              <div className="glass-card" style={{ padding: "26px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Building2 size={20} color="#60a5fa" />
                    <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>
                      {exp.company}
                    </h3>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p style={{ color: "#38bdf8", fontWeight: "600", fontSize: "0.98rem", marginBottom: "12px" }}>
                  {exp.role}
                </p>

                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "20px" }}>
                  {exp.desc}
                </p>

                {/* Tech & Skill Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {exp.skills.map((skill, sIdx) => (
                    <span key={sIdx} style={{
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      border: "1px solid rgba(59, 130, 246, 0.2)",
                      color: "#93c5fd",
                      fontSize: "0.78rem",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontWeight: "500"
                    }}>
                      {skill}
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
