import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Heart, QrCode } from "lucide-react";
import { getSupportContent } from "../api/publicData";

const fallback = {
  title_id: "Support My Work",
  title_en: "Support My Work",
  description_id:
    "Jika karya saya bermanfaat, kamu bisa mendukung pengembangan project berikutnya.",
  description_en:
    "If my work is useful to you, you can support the development of future projects.",
  qris_image_url: "",
  payment_name: "",
  payment_number: "",
};

export default function SupportMyWork() {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(fallback);
  const isEn = i18n.language === "en";

  useEffect(() => {
    let mounted = true;

    async function load() {
      const { data } = await getSupportContent();

      if (mounted && data) {
        setContent(data);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (!content.is_active) return null;

  const title =
    isEn
      ? content.title_en || content.title_id
      : content.title_id || content.title_en;

  const description =
    isEn
      ? content.description_en ||
        content.description_id
      : content.description_id ||
        content.description_en;

  return (
    <section
      id="support"
      style={{
        padding: "70px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="glass-card"
          style={{
            padding: 32,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: 28,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--accent)",
                fontSize: ".78rem",
                fontWeight: 800,
                letterSpacing: ".1em",
                marginBottom: 12,
              }}
            >
              <Heart size={15} />
              SUPPORT
            </div>

            <h2
              style={{
                margin: "0 0 12px",
                color: "var(--text-primary)",
                fontSize: "1.8rem",
                fontWeight: 800,
              }}
            >
              {title}
            </h2>

            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              {description}
            </p>

            {content.payment_name && (
              <p
                style={{
                  color: "var(--text-secondary)",
                  marginTop: 18,
                }}
              >
                {content.payment_name}
                {content.payment_number
                  ? ` • ${content.payment_number}`
                  : ""}
              </p>
            )}
          </div>

          {content.qris_image_url && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  padding: 12,
                  borderRadius: 18,
                  background: "#fff",
                }}
              >
                <img
                  src={content.qris_image_url}
                  alt="QRIS"
                  loading="lazy"
                  style={{
                    display: "block",
                    width: "min(260px,70vw)",
                    height: "auto",
                    borderRadius: 10,
                  }}
                />
              </div>
            </div>
          )}

          {!content.qris_image_url && (
            <div
              style={{
                display: "grid",
                placeItems: "center",
                minHeight: 220,
                color: "var(--text-secondary)",
              }}
            >
              <QrCode size={80} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
