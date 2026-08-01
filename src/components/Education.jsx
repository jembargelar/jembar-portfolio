import { education } from "../data/portfolio";

export default function Education() {
  return (
    <section id="education" className="education-section">
      <div className="container">
        <h2 className="section-title">Riwayat Pendidikan</h2>
        <div className="card-grid">
          {education && education.map((edu, index) => (
            <div key={index} className="card">
              <h3>{edu.institution}</h3>
              <div className="card-subtitle">{edu.degree}</div>
              <span className="period-badge">{edu.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
