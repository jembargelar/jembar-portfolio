import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ExternalLink } from "lucide-react";

export default function Certificates() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const certsList = [
    {
      title: isEn ? "Work Experience Certificate (Paklaring)" : "Surat Keterangan Pengalaman Kerja",
      issuer: "PT Syahrendra Megawatt Indonesia",
      date: "05 Agustus 2026",
      desc: isEn
        ? "Official work experience letter verifying role as Administration Staff managing SLO/NIDI data and document control."
        : "Surat keterangan resmi pengalaman kerja sebagai Staf Administrasi dan Kontrol Dokumen, mengelola permohonan SLO/NIDI[span_0](start_span)[span_0](end_span).",
      tag: "Professional Experience",
      fileUrl: "/paklaring.pdf"
    },
    {
      title: isEn ? "Certificate of Graduation" : "Surat Keterangan Kelulusan (SKL)",
      issuer: "SMA Negeri 1 Garut",
      date: "05 Mei 2023",
      desc: isEn
        ? "Official graduation document from MIPA (Science) major with excellent academic performance."
        : "Surat keterangan kelulusan jenjang SMA Jurusan MIPA dengan daftar nilai mata pelajaran yang sangat memuaskan[span_1](start_span)[span_1](end_span).",
      tag: "Education",
      fileUrl: "/KELULUSAN.pdf"
    },
    {
      title: isEn ? "Informatics Competency Certificate" : "Sertifikat Kompetensi Informatika",
      issuer: "SMA Negeri 1 Garut (Lab Komputer)",
      date: "08 Mei 2023",
      desc: isEn
        ? "Competency certificate focusing on Office Integration, Data Analysis, Computer Networks, and Programming."
        : "Sertifikat kompetensi mata pelajaran Informatika dengan fokus Integrasi Office, Analisis Data, dan Algoritma Pemrograman[span_2](start_span)[span_2](end_span).",
      tag: "Technical Skill",
      fileUrl: "/SERTIFIKAT.pdf"
    },
    {
      title: isEn ? "Scientific Paper Award" : "Piagam Penghargaan Karya Tulis Ilmiah",
      issuer: "SMA Negeri 1 Garut",
      date: "03 Februari 2023",
      desc: isEn
        ? "Awarded 'Sangat Memuaskan' (Score: 86) for scientific research paper titled 'Pengaruh Game Online Terhadap Sikap Belajar'."
        : "Meraih predikat Sangat Memuaskan dengan nilai 86 untuk Uji Karya Tulis Ilmiah tentang Pengaruh Game Online Terhadap Sikap Belajar[span_3](start_span)[span_3](end_span).",
      tag: "Achievement",
      fileUrl: "/PIAGAN%20PENGHARGAAN.pdf"
    }
  ];

  return (
    <section id="certificates" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "40px" }}
        >
          {isEn ? "Certificates & Credentials" : "Sertifikat & Kredensial"} <span style={{ color: "var(--accent)" }}>.</span>
        </motion.h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px"
        }}>
          {certsList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card"
              style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div style={{
                    padding: "10px",
                    backgroundColor: "rgba(59, 130, 246, 0.12)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    color: "var(--accent)"
                  }}>
                    <Award size={22} />
                  </div>
                  <span className="tech-pill">
                    {item.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "6px" }}>
                  {item.title}
                </h3>

                <p style={{ color: "var(--accent)", fontWeight: "600", fontSize: "0.9rem", marginBottom: "10px" }}>
                  {item.issuer} • <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{item.date}</span>
                </p>

                <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: "1.6", marginBottom: "20px" }}>
                  {item.desc}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid var(--card-border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10B981", fontSize: "0.82rem", fontWeight: "600" }}>
                  <CheckCircle2 size={16} />
                  <span>Verified</span>
                </div>

                {item.fileUrl && (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "var(--accent)",
                      fontSize: "0.85rem",
                      fontWeight: "700",
                      textDecoration: "none",
                      backgroundColor: "rgba(34, 211, 238, 0.1)",
                      padding: "6px 12px",
                      borderRadius: "10px",
                      border: "1px solid rgba(34, 211, 238, 0.25)"
                    }}
                  >
                    <span>{isEn ? "View PDF" : "Lihat Dokumen"}</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
