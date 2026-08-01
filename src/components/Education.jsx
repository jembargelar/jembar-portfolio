import { education } from "../data/portfolio";

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <h2 className="section-title">Pendidikan</h2>
        <div className="timeline">
          {education.map((edu, index) => (
            <div key={index} className="glass-card">
              <div className="timeline-header">
                <div>
                  <h3>{edu.degree}</h3>
                  <h4 style={{ color: "var(--accent-color)", fontSize: "0.95rem" }}>{edu.institution}</h4>
                </div>
                <span className="timeline-period">{edu.period}</span>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
