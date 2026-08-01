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
                  <h4 style={{ color: "var(--accent-color)", fontSize: "0.95rem" }}>{exp.company}</h4>
                </div>
                <span className="timeline-period">{exp.period}</span>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

