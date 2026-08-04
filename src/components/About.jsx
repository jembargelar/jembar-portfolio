import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase, Code, TrendingUp, Zap } from "lucide-react";

export default function About() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const bentoItems = [
    {
      icon: <MapPin size={24} color="var(--accent-blue)" />,
      title: isEn ? "Location" : "Lokasi",
      desc: "Cianjur & Garut, West Java, Indonesia",
      highlight: "Open for Remote & Onsite"
    },
    {
      icon: <GraduationCap size={24} color="var(--accent-blue)" />,
      title: isEn ? "Education" : "Pendidikan",
      desc: "Universitas Terbuka (S1 Manajemen)",
      highlight: "Operations & Business Admin"
    },
    {
      icon: <Briefcase size={24} color="var(--accent-blue)" />,
      title: isEn ? "Core Expertise" : "Keahlian Utama",
      desc: isEn ? "Administrative & Document Control" : "Administrasi & Kontrol Dokumen",
      highlight: "SLO, NIDI & Executive Reporting"
    },
    {
      icon: <Code size={24} color="var(--accent-blue)" />,
      title: "Frontend Web Dev",
      desc: "React.js, Vite, JavaScript (ES6+), Tailwind CSS",
      highlight: "Modern & Responsive UI"
    },
    {
      icon: <TrendingUp size={24} color="var(--accent-blue)" />,
      title: isEn ? "Data Management" : "Manajemen Data",
      desc: isEn ? "Advanced Excel, Automated Recapitulation & Validation" : "Excel Lanjutan, Rekapitulasi Otomatis & Validasi",
      highlight: "Fast Decision Making"
    },
    {
      icon: <Zap size={24} color="#10b981" />,
      title: isEn ? "Work Ethic" : "Etos Kerja",
      desc: isEn ? "Fast Learner, Detail-Oriented, High Dedication" : "Pembelajar Cepat, Detail, Dedikasi Tinggi",
      highlight: "100% Commitment"
    }
  ];

  return (
    <section id="about" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Title Section */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "40px" }}
        >
          {t("sectionAbout")} <span style={{ color: "var(--accent-blue)" }}>.</span>
        </motion.h2>

        {/* Bento Grid Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px"
        }}>
          {bentoItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card"
              style={{ padding: "24px", position: "relative", overflow: "hidden" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{
                  padding: "10px",
                  backgroundColor: "var(--tag-bg)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>
                  {item.title}
                </h3>
              </div>

              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5", marginBottom: "16px" }}>
                {item.desc}
              </p>

              <span className="tech-badge" style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                padding: "4px 10px",
                borderRadius: "20px",
                display: "inline-block"
              }}>
                {item.highlight}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

