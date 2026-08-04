import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2 } from "lucide-react";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const experiences = [
    {
      year: "2026",
      company: "PT Syahrendra Megawatt Indonesia",
      role: isEn ? "Administrative & Document Control Specialist" : "Spesialis Administrasi & Kontrol Dokumen",
      period: isEn ? "Jan 2026 - Present" : "Jan 2026 - Sekarang",
      desc: isEn 
        ? "Managed SLO & NIDI administrative processing, operational logging, customer database validation, and executive reporting." 
        : "Mengelola pemrosesan administrasi SLO & NIDI, pencatatan operasional, validasi database pelanggan, dan pelaporan eksekutif.",
      skills: ["SLO & NIDI", "Excel Advanced", "Document Control", "Operational Reporting"]
    },
    {
      year: "2025",
      company: "PT Garyman Indonesia",
      role: isEn ? "Data Management & Admin Specialist" : "Spesialis Manajemen Data & Administrasi",
      period: "2025",
      desc: isEn 
        ? "Automated reporting workflows, customer data recapitulation, invoice generation, and financial verification." 
        : "Mengotomatisasi alur kerja pelaporan, rekapitulasi data pelanggan, pembuatan faktur, dan verifikasi keuangan.",
      skills: ["Data Automation", "Invoice Management", "Data Validation", "Advanced Excel"]
    },
    {
      year: "2023 - 2024",
      company: "UD Sinar Soccer",
      role: isEn ? "Administrative Staff & Operations" : "Staf Administrasi & Operasional",
      period: "2023 - 2024",
      desc: isEn 
        ? "Handled daily transactions, stock inventory control, customer relations, and monthly financial logging." 
        : "Menangani transaksi harian, kontrol inventaris stok, hubungan pelanggan, dan pencatatan keuangan bulanan.",
      skills: ["Inventory Admin", "Financial Logging", "Data Entry", "Customer Service"]
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
