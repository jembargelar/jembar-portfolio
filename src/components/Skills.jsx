import { skills } from "../data/portfolio";

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">Keahlian & Teknologi</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-badge">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

