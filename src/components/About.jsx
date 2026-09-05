import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  TrendingUp,
  Zap,
} from "lucide-react";
import { getAboutContent } from "../api/publicData";

const fallbackAbout = {
  title_id: "Administrasi × Bisnis × Teknologi",
  title_en: "Administration × Business × Technology",
  description_id:
    "Bukan cuma bikin website. Fokus pada solusi digital yang benar-benar bisa dipakai bisnis.",
  description_en:
    "More than just building websites. Focused on practical digital solutions that businesses can actually use.",
  highlight_id: "Teliti & Dapat Diandalkan",
  highlight_en: "Reliable & Detail-Oriented",
  image_url: "",
};

export default function About() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [content, setContent] = useState(fallbackAbout);

  useEffect(() => {
    let mounted = true;

    async function loadAbout() {
      const { data, error } = await getAboutContent();

      if (error) {
        console.error("Failed to load About content:", error);
        return;
      }

      if (mounted && data) {
        setContent({
          title_id: data.title_id || fallbackAbout.title_id,
          title_en: data.title_en || fallbackAbout.title_en,
          description_id:
            data.description_id || fallbackAbout.description_id,
          description_en:
            data.description_en || fallbackAbout.description_en,
          highlight_id:
            data.highlight_id || fallbackAbout.highlight_id,
          highlight_en:
            data.highlight_en || fallbackAbout.highlight_en,
          image_url: data.image_url || "",
        });
      }
    }

    loadAbout();

    return () => {
      mounted = false;
    };
  }, []);

  const sectionTitle = isEn ? content.title_en : content.title_id;
  const mainDescription = isEn
    ? content.description_en
    : content.description_id;

  const bentoItems = [
    {
      icon: <MapPin size={22} color="var(--accent)" />,
      title: isEn ? "Location" : "Lokasi",
      desc: "Garut, West Java, Indonesia",
      highlight: "Open for Remote & Onsite",
    },
    {
      icon: <GraduationCap size={22} color="var(--accent)" />,
      title: isEn ? "Education" : "Pendidikan",
      desc: "Universitas Terbuka (S1 Manajemen)",
      highlight: "Operations & Business Admin",
    },
    {
      icon: <Briefcase size={22} color="var(--accent)" />,
      title: isEn ? "Core Expertise" : "Keahlian Utama",
      desc: isEn
        ? "Administrative & Document Control"
        : "Administrasi & Kontrol Dokumen",
      highlight: "SLO, NIDI & Executive Reporting",
    },
    {
      icon: <Code size={22} color="var(--accent)" />,
      title: "Frontend Web Dev",
      desc: "React.js, Vite, JavaScript (ES6+), Tailwind CSS",
      highlight: "Modern & Responsive UI",
    },
    {
      icon: <TrendingUp size={22} color="var(--accent)" />,
      title: isEn ? "Data Management" : "Manajemen Data",
      desc: isEn
        ? "Advanced Excel, Automated Recapitulation & Validation"
        : "Excel Lanjutan, Rekapitulasi Otomatis & Validasi",
      highlight: "Fast Decision Making",
    },
    {
      icon: <Zap size={22} color="#10B981" />,
      title: isEn ? "Work Ethic" : "Etos Kerja",
      desc: isEn
        ? "Fast Learner, Detail-Oriented, High Dedication"
        : "Pembelajar Cepat, Detail, Dedikasi Tinggi",
      highlight: isEn
        ? content.highlight_en
        : content.highlight_id,
    },
  ];

  return (
    <section id="about" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              color: "var(--text-primary)",
              marginBottom: "12px",
            }}
          >
            {sectionTitle}{" "}
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>

          <p
            style={{
              maxWidth: "760px",
              color: "var(--text-secondary)",
              fontSize: "1rem",
              lineHeight: "1.7",
              marginBottom: "40px",
            }}
          >
            {mainDescription}
          </p>
        </motion.div>

        {content.image_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              marginBottom: "30px",
              borderRadius: "18px",
              overflow: "hidden",
              border: "1px solid var(--border, rgba(255,255,255,0.08))",
            }}
          >
            <img
              src={content.image_url}
              alt={sectionTitle}
              style={{
                width: "100%",
                maxHeight: "420px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </motion.div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {bentoItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card"
              style={{ padding: "24px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "rgba(59, 130, 246, 0.12)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
              </div>

              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                  marginBottom: "16px",
                }}
              >
                {item.desc}
              </p>

              <span className="tech-pill">{item.highlight}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
