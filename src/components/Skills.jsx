import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Skills() {
  const { t } = useTranslation();

  const mainSkills = [
    { name: "Microsoft Excel (Advanced & Automation)", level: 98, color: "#10b981" },
    { name: "Frontend Web Development (React.js & Vite)", level: 85, color: "#3b82f6" },
    { name: "JavaScript (ES6+) & Web Scripting", level: 88, color: "#f59e0b" },
    { name: "Data Management & Validation", level: 92, color: "#22d3ee" },
    { name: "Administrative & Document Control (SLO/NIDI)", level: 95, color: "#06b6d4" },
  ];

  const toolsAndFrameworks = [
    "HTML5 & CSS3", "Tailwind CSS", "Framer Motion", "Git & GitHub",
    "Rest API", "Google Workspace", "Data Entry", "Financial Logging",
    "Customer Support", "Operational Reporting"
  ];

  return (
    <section id="skills" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "40px" }}>
          {t("navSkills")} <span style={{ color: "var(--accent)" }}>.</span>
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
          <div className="glass-card" style={{ padding: "28px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "24px" }}>Technical Proficiency</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {mainSkills.map((skill, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{skill.name}</span>
                    <span style={{ color: skill.color, fontWeight: "700" }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: "8px", width: "100%", backgroundColor: "var(--btn-sec-bg)", borderRadius: "999px", overflow: "hidden" }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ height: "100%", backgroundColor: skill.color, borderRadius: "999px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: "28px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "20px" }}>Tools & Ecosystem</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {toolsAndFrameworks.map((tool, idx) => (
                <span key={idx} className="tech-pill">⚡ {tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

