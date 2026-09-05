import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe2,
  LayoutDashboard,
  Database,
  PanelsTopLeft,
  ArrowUpRight,
} from "lucide-react";
import { getBuildServices } from "../api/publicData";
import { useTranslation } from "react-i18next";

const iconMap = {
  Globe2,
  LayoutDashboard,
  Database,
  PanelsTopLeft,
};

const fallbackServices = [
  {
    id: "website",
    title_id: "Website",
    title_en: "Websites",
    description_id:
      "Website modern, responsif, dan siap digunakan untuk kebutuhan personal maupun bisnis.",
    description_en:
      "Modern, responsive websites built for personal and business needs.",
    icon: "Globe2",
    sort_order: 1,
  },
  {
    id: "business-systems",
    title_id: "Sistem Bisnis",
    title_en: "Business Systems",
    description_id:
      "Sistem digital untuk membantu operasional, pemesanan, administrasi, dan pengelolaan bisnis.",
    description_en:
      "Digital systems that support operations, ordering, administration, and business management.",
    icon: "LayoutDashboard",
    sort_order: 2,
  },
  {
    id: "data-solutions",
    title_id: "Solusi Data",
    title_en: "Data Solutions",
    description_id:
      "Pengolahan, validasi, rekapitulasi, dan otomatisasi data untuk membantu pengambilan keputusan.",
    description_en:
      "Data processing, validation, reporting, and automation to support better decisions.",
    icon: "Database",
    sort_order: 3,
  },
  {
    id: "digital-ui",
    title_id: "Digital UI",
    title_en: "Digital UI",
    description_id:
      "Interface modern, responsif, dan intuitif dengan fokus pada pengalaman pengguna.",
    description_en:
      "Modern, responsive, and intuitive interfaces focused on user experience.",
    icon: "PanelsTopLeft",
    sort_order: 4,
  },
];

export default function WhatIBuild() {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language?.startsWith("en");

  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    let mounted = true;

    async function loadServices() {
      const { data, error } = await getBuildServices();

      if (!mounted) return;

      if (!error && data?.length) {
        setServices(data);
      }
    }

    loadServices();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="services"
      style={{
        position: "relative",
        padding: "110px 24px",
        background: "var(--bg-color)",
        color: "var(--text-primary)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: "720px",
            marginBottom: "50px",
          }}
        >
          <p
            style={{
              margin: "0 0 12px",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent-color)",
            }}
          >
            {isEnglish ? "What I Build" : "Yang Saya Bangun"}
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            {isEnglish
              ? "Digital solutions built for real business needs."
              : "Solusi digital untuk kebutuhan bisnis nyata."}
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "18px",
          }}
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Globe2;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -5 }}
                style={{
                  position: "relative",
                  minHeight: "250px",
                  padding: "30px",
                  borderRadius: "28px",
                  border: "1px solid var(--border-color)",
                  background: "var(--card-bg)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "16px",
                      display: "grid",
                      placeItems: "center",
                      marginBottom: "28px",
                      background: "var(--accent-soft)",
                      color: "var(--accent-color)",
                    }}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <h3
                    style={{
                      margin: "0 0 12px",
                      fontSize: "clamp(1.25rem, 2vw, 1.65rem)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {isEnglish ? service.title_en : service.title_id}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      fontSize: "0.96rem",
                    }}
                  >
                    {isEnglish
                      ? service.description_en
                      : service.description_id}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "24px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <ArrowUpRight size={20} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <style>
        {`
          @media (max-width: 720px) {
            section#services > div > div:nth-child(2) {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </section>
  );
}
