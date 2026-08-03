import { useTranslation } from "react-i18next";
import { experiences } from "../data/portfolio";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';

  return (
    <section id="experience" style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Judul Section */}
        <h2 style={{ 
          fontSize: "2rem", 
          marginBottom: "40px", 
          color: "#fff",
          borderBottom: "2px solid #38bdf8",
          display: "inline-block",
          paddingBottom: "8px"
        }}>
          {t("sectionExperience")}
        </h2>

        {/* Timeline Container */}
        <div style={{
          position: "relative",
          borderLeft: "2px solid #334155",
          paddingLeft: "25px",
          marginLeft: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "35px"
        }}>
          {experiences.map((exp, index) => (
            <div key={index} style={{ position: "relative" }}>
              
              {/* Dot / Titik Aksen Timeline */}
              <div style={{
                position: "absolute",
                left: "-32px",
                top: "5px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#38bdf8",
                boxShadow: "0 0 10px #38bdf8"
              }} />

              {/* Card Container */}
              <div style={{
                backgroundColor: "#1e293b",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #334155"
              }}>
                {/* Posisi / Role */}
                <h3 style={{ fontSize: "1.25rem", color: "#38bdf8", marginBottom: "4px" }}>
                  {exp.role}
                </h3>

                {/* Perusahaan */}
                <h4 style={{ fontSize: "1rem", color: "#f8fafc", fontWeight: "600", marginBottom: "8px" }}>
                  {exp.company}
                </h4>

                {/* Periode Kerja */}
                <span style={{ 
                  display: "inline-block",
                  fontSize: "0.85rem", 
                  color: "#94a3b8", 
                  marginBottom: "16px",
                  backgroundColor: "#0f172a",
                  padding: "4px 10px",
                  borderRadius: "6px"
                }}>
                  🗓️ {exp.period[lang]}
                </span>

                {/* Poin Pekerjaan */}
                <ul style={{ 
                  paddingLeft: "18px", 
                  margin: 0, 
                  color: "#cbd5e1", 
                  fontSize: "0.95rem",
                  lineHeight: "1.6" 
                }}>
                  {exp.highlights[lang].map((point, i) => (
                    <li key={i} style={{ marginBottom: "8px" }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
