import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  GraduationCap,
  TrendingUp,
  Database,
  Code2,
  MapPin,
  Zap,
} from "lucide-react";
import { getJourneyItems } from "../api/publicData";

const iconMap = {
  BriefcaseBusiness,
  GraduationCap,
  TrendingUp,
  Database,
  Code2,
  MapPin,
  Zap,
};

const fallbackJourney = [
  {
    year_label: "2022",
    title_id: "Memulai Perjalanan Profesional",
    title_en: "Starting the Professional Journey",
    description_id:
      "Memulai pengalaman kerja profesional sebagai Operator Mesin Produksi.",
    description_en:
      "Started the professional journey as a Production Machine Operator.",
    icon: "BriefcaseBusiness",
  },
  {
    year_label: "2023",
    title_id: "Lulus SMA",
    title_en: "High School Graduation",
    description_id:
      "Menyelesaikan pendidikan SMA Negeri 1 Garut jurusan IPA.",
    description_en:
      "Graduated from SMAN 1 Garut with a science major.",
    icon: "GraduationCap",
  },
  {
    year_label: "2025",
    title_id: "Memperluas Pengalaman",
    title_en: "Expanding Professional Experience",
    description_id:
      "Mengembangkan pengalaman di bidang pelayanan, kasir, dan operasional produksi.",
    description_en:
      "Expanded experience across customer service, cashier operations, and production.",
    icon: "TrendingUp",
  },
  {
    year_label: "2025–2026",
    title_id: "Administrasi & Kontrol Data",
    title_en: "Administration & Data Control",
    description_id:
      "Beralih ke pekerjaan administrasi, data entry, pengelolaan dokumen, invoice, serta kontrol data.",
    description_en:
      "Moved into administration, data entry, document management, invoicing, and data control.",
    icon: "Database",
  },
  {
    year_label: "2026",
    title_id: "Manajemen × Teknologi",
    title_en: "Management × Technology",
    description_id:
      "Melanjutkan pendidikan S1 Manajemen sambil mengembangkan kemampuan web development dan sistem bisnis digital.",
    description_en:
      "Started a Management degree while developing web development and digital business system skills.",
    icon: "Code2",
  },
];

export default function Journey() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const [items, setItems] = useState(fallbackJourney);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const { data, error } = await getJourneyItems();

      if (!error && data?.length && mounted) {
        setItems(data);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="journey"
      style={{
        padding: "80px 20px",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            style={{
              fontSize: ".75rem",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontWeight: 800,
              marginBottom: "10px",
            }}
          >
            {isEn ? "MY JOURNEY" : "PERJALANAN SAYA"}
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
            }}
          >
            {isEn ? "From operations to digital systems." : "Dari operasional ke sistem digital."}
          </h2>

          <p
            style={{
              maxWidth: "700px",
              marginTop: "14px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            {isEn
              ? "A practical journey connecting operations, administration, data, management, and technology."
              : "Perjalanan yang menghubungkan pengalaman operasional, administrasi, data, manajemen, dan teknologi."}
          </p>
        </motion.div>

        <div
          style={{
            position: "relative",
            marginTop: "50px",
            display: "grid",
            gap: "18px",
          }}
        >
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || BriefcaseBusiness;

            return (
              <motion.article
                className="journey-item"
                key={item.id || `${item.year_label}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "82px 48px 1fr",
                  gap: "18px",
                  alignItems: "start",
                  padding: "22px",
                  borderRadius: "18px",
                  border: "1px solid var(--border, rgba(255,255,255,.08))",
                  background: "rgba(255,255,255,.025)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="journey-year"
                  style={{
                    color: "var(--accent)",
                    fontWeight: 900,
                    fontSize: ".9rem",
                    paddingTop: "8px",
                  }}
                >
                  {item.year_label}
                </div>

                <div
                  className="journey-icon"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid rgba(34,211,238,.25)",
                    background: "rgba(34,211,238,.06)",
                    color: "var(--accent)",
                  }}
                >
                  <Icon size={20} />
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                    }}
                  >
                    {isEn ? item.title_en : item.title_id}
                  </h3>

                  <p
                    style={{
                      margin: "8px 0 0",
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                      fontSize: ".94rem",
                    }}
                  >
                    {isEn
                      ? item.description_en
                      : item.description_id}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
