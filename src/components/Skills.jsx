import { skillCategories } from "../data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">Keahlian & Kompetensi</h2>
        <p className="section-subtitle">
          Ringkasan kualifikasi teknis, administrasi, dan keahlian personal yang saya kuasai.
        </p>

        <div className="skills-grid">
          {skillCategories.map((group, index) => (
            <div key={index} className="skill-card">
              <h3 className="skill-category-title">{group.category}</h3>
              <div className="badge-container">
                {group.skills.map((skill, itemIndex) => (
                  <span key={itemIndex} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
