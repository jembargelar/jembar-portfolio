import { experiences } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title">Pengalaman Kerja</h2>
        <div className="card-grid">
          {experiences && experiences.map((exp, index) => (
            <div key={index} className="card">
              <h3>{exp.role}</h3>
              <div className="card-subtitle">{exp.company}</div>
              <span className="period-badge">{exp.period}</span>
              <p style={{ marginTop: '12px' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
