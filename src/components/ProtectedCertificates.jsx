import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { getPublicPortfolioDocuments } from "../api/documentData";
import DocumentViewer from "./DocumentViewer";

const CERTIFICATES = [
  {
    fileName: "paklaring.pdf",
    titleId: "Surat Keterangan Pengalaman Kerja",
    titleEn: "Work Experience Certificate (Paklaring)",
    issuer: "PT Syahrendra Megawatt Indonesia",
    date: "05 Agustus 2026",
    descId:
      "Surat keterangan resmi pengalaman kerja sebagai Staf Administrasi dan Kontrol Dokumen, mengelola permohonan SLO/NIDI.",
    descEn:
      "Official work experience letter verifying role as Administration Staff managing SLO/NIDI data and document control.",
    tag: "Professional Experience",
  },
  {
    fileName: "KELULUSAN.pdf",
    titleId: "Surat Keterangan Kelulusan (SKL)",
    titleEn: "Certificate of Graduation",
    issuer: "SMA Negeri 1 Garut",
    date: "05 Mei 2023",
    descId:
      "Surat keterangan kelulusan jenjang SMA Jurusan MIPA dengan daftar nilai mata pelajaran yang sangat memuaskan.",
    descEn:
      "Official graduation document from MIPA (Science) major with excellent academic performance.",
    tag: "Education",
  },
  {
    fileName: "SERTIFIKAT.pdf",
    titleId: "Sertifikat Kompetensi Informatika",
    titleEn: "Informatics Competency Certificate",
    issuer: "SMA Negeri 1 Garut (Lab Komputer)",
    date: "08 Mei 2023",
    descId:
      "Sertifikat kompetensi mata pelajaran Informatika dengan fokus Integrasi Office, Analisis Data, dan Algoritma Pemrograman.",
    descEn:
      "Competency certificate focusing on Office Integration, Data Analysis, Computer Networks, and Programming.",
    tag: "Technical Skill",
  },
  {
    fileName: "PIAGAN PENGHARGAAN.pdf",
    titleId: "Piagam Penghargaan Karya Tulis Ilmiah",
    titleEn: "Scientific Paper Award",
    issuer: "SMA Negeri 1 Garut",
    date: "03 Februari 2023",
    descId:
      "Meraih predikat Sangat Memuaskan dengan nilai 86 untuk Uji Karya Tulis Ilmiah tentang Pengaruh Game Online Terhadap Sikap Belajar.",
    descEn:
      "Awarded 'Sangat Memuaskan' (Score: 86) for scientific research paper titled 'Pengaruh Game Online Terhadap Sikap Belajar'.",
    tag: "Achievement",
  },
];

export default function ProtectedCertificates() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const [documents, setDocuments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedIdx, setExpandedIdx] = useState(null);

  useEffect(() => {
    let active = true;
    getPublicPortfolioDocuments().then(({ data }) => {
      if (active) {
        setDocuments(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const toggleExpand = (idx) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="certificates" className="cert-section">
      <style>{`
        .cert-section { padding: 80px 20px; }
        .cert-inner { max-width: 950px; margin: 0 auto; }
        .cert-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 40px;
        }
        .cert-loading {
          color: var(--text-secondary);
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 20px;
        }
        .cert-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cert-row {
          position: relative;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color .3s ease, box-shadow .3s ease, transform .3s ease;
        }
        .cert-row::before {
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #22d3ee, #3b82f6);
          opacity: 0;
          transition: opacity .3s ease, width .3s ease;
        }
        .cert-row:hover {
          border-color: rgba(34,211,238,.35);
          box-shadow: 0 12px 40px rgba(34,211,238,.1);
          transform: translateY(-2px);
        }
        .cert-row:hover::before { opacity: 1; }
        .cert-row.expanded {
          border-color: rgba(34,211,238,.5);
          box-shadow: 0 20px 60px rgba(34,211,238,.14);
        }
        .cert-row.expanded::before { opacity: 1; width: 4px; }

        .cert-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 22px;
        }
        .cert-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
          flex: 1;
        }
        .cert-icon {
          width: 42px; height: 42px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: rgba(34,211,238,.1);
          color: var(--accent);
          border: 1px solid rgba(34,211,238,.2);
          flex-shrink: 0;
          transition: transform .35s cubic-bezier(.22,.9,.32,1), background .3s ease;
        }
        .cert-row:hover .cert-icon {
          transform: rotate(-6deg) scale(1.08);
          background: rgba(34,211,238,.18);
        }
        .cert-title-text {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px;
          line-height: 1.3;
        }
        .cert-tag {
          display: inline-block;
          font-size: .68rem;
          font-weight: 700;
          color: var(--accent);
          background: rgba(34,211,238,.1);
          padding: 3px 9px;
          border-radius: 999px;
          border: 1px solid rgba(34,211,238,.22);
          letter-spacing: .02em;
        }
        .cert-chevron {
          width: 32px; height: 32px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: var(--btn-sec-bg);
          border: 1px solid var(--card-border);
          color: var(--text-secondary);
          flex-shrink: 0;
          transition: all .3s ease;
        }
        .cert-row:hover .cert-chevron {
          border-color: rgba(34,211,238,.4);
          color: var(--accent);
        }
        .cert-row.expanded .cert-chevron {
          background: rgba(34,211,238,.12);
          border-color: rgba(34,211,238,.4);
          color: var(--accent);
        }

        .cert-body { padding: 0 22px 22px; }

        .cert-meta {
          font-size: .85rem;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 12px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
        }
        .cert-meta .date {
          color: var(--text-secondary);
          font-size: .82rem;
          font-weight: 500;
        }
        .cert-desc {
          color: var(--text-secondary);
          font-size: .93rem;
          line-height: 1.65;
          margin: 0 0 18px;
        }
        .cert-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid var(--card-border);
          flex-wrap: wrap;
        }
        .cert-verified {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #10B981;
          font-size: .82rem;
          font-weight: 700;
        }
        .cert-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          border-radius: 999px;
          font-size: .85rem;
          font-weight: 700;
          text-decoration: none;
          border: 1px solid rgba(34,211,238,.28);
          background: rgba(34,211,238,.1);
          color: var(--accent);
          cursor: pointer;
          font-family: inherit;
          transition: transform .25s ease, background .25s ease, border-color .25s ease;
        }
        .cert-btn:hover {
          transform: translateY(-2px);
          background: rgba(34,211,238,.18);
          border-color: rgba(34,211,238,.5);
        }
      `}</style>

      <div className="cert-inner">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cert-title"
        >
          {isEn ? "Certificates & Credentials" : "Sertifikat & Kredensial"}{" "}
          <span style={{ color: "var(--accent)" }}>.</span>
        </motion.h2>

        {loading && (
          <div className="cert-loading">
            <Loader2 className="animate-spin" size={18} />
            {isEn ? "Loading documents…" : "Memuat dokumen…"}
          </div>
        )}

        <div className="cert-list">
          {CERTIFICATES.map((item, idx) => {
            const document = documents.find(
              (entry) => entry.file_name === item.fileName
            );
            const isExpanded = expandedIdx === idx;

            return (
              <motion.div
                key={item.fileName}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className={`cert-row ${isExpanded ? "expanded" : ""}`}
                onClick={() => toggleExpand(idx)}
              >
                <div className="cert-header">
                  <div className="cert-header-left">
                    <div className="cert-icon">
                      <Award size={20} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h3 className="cert-title-text">
                        {isEn ? item.titleEn : item.titleId}
                      </h3>
                      <span className="cert-tag">{item.tag}</span>
                    </div>
                  </div>
                  <motion.div
                    className="cert-chevron"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="cert-body">
                        <div className="cert-meta">
                          <span>{item.issuer}</span>
                          <span style={{ color: "var(--accent)" }}>•</span>
                          <span className="date">{item.date}</span>
                        </div>

                        <p className="cert-desc">
                          {isEn ? item.descEn : item.descId}
                        </p>

                        <div className="cert-footer">
                          <span className="cert-verified">
                            <CheckCircle2 size={16} />
                            {isEn ? "Verified" : "Terverifikasi"}
                          </span>

                          {document && (
                            <button
                              type="button"
                              className="cert-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelected(document);
                              }}
                            >
                              {isEn ? "View document" : "Lihat Dokumen"}
                              <ExternalLink size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selected && (
        <DocumentViewer
          document={selected}
          isEn={isEn}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
