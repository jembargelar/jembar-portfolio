import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Heart, QrCode, Copy, Check } from "lucide-react";
import { getSupportContent } from "../api/publicData";

const fallback = {
  title_id: "Support My Work",
  title_en: "Support My Work",
  qris_image_url: "",
  payment_name: "",
  payment_number: "",
};

const COPY = {
  id: {
    title: "Support My Work",
    description:
      "Gua gak minta. Tapi kalau lu mau, traktiran lu bakal jadi bahan bakar project berikutnya. Gak ada paksaan — cuma apresiasi.",
    caption:
      "Scan pakai m-banking atau e-wallet apa aja.",
  },
  en: {
    title: "Support My Work",
    description:
      "I don't ask. But if you want, your treat fuels the next project. No pressure — just appreciation.",
    caption: "Scan with any m-banking or e-wallet app.",
  },
};

export default function SupportMyWork() {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(fallback);
  const [copied, setCopied] = useState(false);
  const isEn = i18n.language === "en";
  const copy = isEn ? COPY.en : COPY.id;

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

  const handleCopyNumber = async () => {
    if (!content.payment_number) return;
    try {
      await navigator.clipboard.writeText(content.payment_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <section id="support" className="support-section">
      <style>{`
        .support-section { padding: 70px 20px; }
        .support-inner { max-width: 900px; margin: 0 auto; }
        .support-card {
          padding: 32px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .support-card::before {
          content: "";
          position: absolute;
          top: -50%; left: -20%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(34,211,238,.08), transparent 65%);
          pointer-events: none;
        }
        @media (min-width: 720px) {
          .support-card { grid-template-columns: 1fr 1fr; }
        }
        .support-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--accent);
          font-size: .78rem;
          font-weight: 800;
          letter-spacing: .14em;
          margin-bottom: 14px;
          text-transform: uppercase;
        }
        .support-title {
          margin: 0 0 14px;
          color: var(--text-primary);
          font-size: clamp(1.6rem, 4vw, 2rem);
          font-weight: 800;
          letter-spacing: -.02em;
          line-height: 1.15;
        }
        .support-desc {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.75;
          font-size: .95rem;
          max-width: 480px;
        }
        .support-payment {
          margin-top: 20px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid var(--card-border);
          background: var(--btn-sec-bg);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: .85rem;
          color: var(--text-primary);
          font-weight: 600;
          flex-wrap: wrap;
        }
        .support-payment .label {
          color: var(--text-secondary);
          font-weight: 500;
        }
        .support-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(34,211,238,.28);
          background: rgba(34,211,238,.1);
          color: var(--accent);
          font-size: .75rem;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: all .2s ease;
          margin-left: auto;
        }
        .support-copy-btn:hover {
          background: rgba(34,211,238,.18);
          border-color: rgba(34,211,238,.5);
        }
        .support-copy-btn.copied {
          background: rgba(16,185,129,.15);
          border-color: rgba(16,185,129,.4);
          color: #10B981;
        }

        .support-qris-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .support-qris-card {
          padding: 12px;
          border-radius: 18px;
          background: #fff;
          position: relative;
          box-shadow:
            0 20px 60px rgba(34,211,238,.14),
            0 0 0 1px rgba(34,211,238,.15);
        }
        .support-qris-card img {
          display: block;
          width: min(260px, 70vw);
          height: auto;
          border-radius: 10px;
        }
        .support-qris-placeholder {
          display: grid;
          place-items: center;
          min-height: 220px;
          color: var(--text-secondary);
          width: min(260px, 70vw);
        }
        .support-caption {
          color: var(--text-secondary);
          font-size: .78rem;
          text-align: center;
          opacity: .75;
          margin: 0;
        }
      `}</style>

      <div className="support-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card support-card"
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="support-eyebrow">
              <Heart size={15} />
              Support
            </div>

            <h2 className="support-title">{copy.title}</h2>

            <p className="support-desc">{copy.description}</p>

            {content.payment_name && (
              <div className="support-payment">
                <span className="label">ID:</span>
                <span>{content.payment_name}</span>
                {content.payment_number && (
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className={`support-copy-btn ${copied ? "copied" : ""}`}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied
                      ? isEn
                        ? "Copied"
                        : "Tersalin"
                      : isEn
                        ? "Copy number"
                        : "Copy nomor"}
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="support-qris-wrap" style={{ position: "relative", zIndex: 1 }}>
            {content.qris_image_url ? (
              <>
                <motion.div
                  className="support-qris-card"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src={content.qris_image_url} alt="QRIS" loading="lazy" />
                </motion.div>
                <p className="support-caption">{copy.caption}</p>
              </>
            ) : (
              <div className="support-qris-card">
                <div className="support-qris-placeholder">
                  <QrCode size={80} />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
