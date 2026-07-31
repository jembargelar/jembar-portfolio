import { skills } from "../data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <h2>Keahlian</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <span className="skill" key={index}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
