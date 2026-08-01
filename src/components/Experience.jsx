import { experiences } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <h2 className="section-title">Pengalaman Kerja</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="glass-card">
              <div className="timeline-header">
                <div>
                  <h3>{exp.role}</h3>
                  <h4 style={{ color: "var(--accent-color)", fontSize: "0.95rem" }}>
                    {exp.company}
                  </h4>
                </div>
                <span className="timeline-period">{exp.period}</span>
              </div>
              <ul style={{ paddingLeft: "18px", marginTop: "10px", color: "var(--text-muted)", fontSize: "0.92rem" }}>
                {exp.highlights ? (
                  exp.highlights.map((point, idx) => (
                    <li key={idx} style={{ marginBottom: "6px" }}>{point}</li>
                  ))
                ) : (
                  <li>{exp.description}</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
