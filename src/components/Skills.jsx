import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Skills() {
  const { t } = useTranslation();

  const mainSkills = [
    { name: "Microsoft Excel (Advanced & Automation)", level: 98, color: "#10b981" },
    { name: "Frontend Web Development (React.js & Vite)", level: 85, color: "#3b82f6" },
    { name: "JavaScript (ES6+) & Web Scripting", level: 88, color: "#f59e0b" },
    { name: "Data Management & Validation", level: 92, color: "#8b5cf6" },
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

        {/* Title Section */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "40px" }}
        >
          {t("navSkills")} <span style={{ color: "var(--accent-blue)" }}>.</span>
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>

          {/* Progress Bar Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: "28px" }}
          >
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "24px" }}>
              Technical Proficiency
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {mainSkills.map((skill, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{skill.name}</span>
                    <span style={{ color: skill.color, fontWeight: "700" }}>{skill.level}%</span>
                  </div>

                  {/* Outer Bar */}
                  <div style={{
                    height: "8px",
                    width: "100%",
                    backgroundColor: "var(--card-border)",
                    borderRadius: "999px",
                    overflow: "hidden"
                  }}>
                    {/* Inner Bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: idx * 0.1, ease: "easeOut" }}
                      style={{
                        height: "100%",
                        backgroundColor: skill.color,
                        borderRadius: "999px"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools & Ecosystem Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card"
            style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "20px" }}>
                Tools & Ecosystem
              </h3>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {toolsAndFrameworks.map((tool, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="tech-badge"
                    style={{
                      padding: "8px 14px",
                      borderRadius: "12px",
                      fontSize: "0.85rem",
                      fontWeight: "500",
                      display: "inline-block",
                      cursor: "default"
                    }}
                  >
                    ⚡ {tool}
                  </motion.span>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: "24px",
              padding: "14px",
              backgroundColor: "var(--btn-sec-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "12px",
              fontSize: "0.85rem",
              color: "var(--text-secondary)"
            }}>
              💡 Combined expertise in administrative precision and modern frontend web engineering.
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
