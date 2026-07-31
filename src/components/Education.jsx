import { education } from "../data/portfolio";

export default function Education() {
  return (
    <section id="education" className="section">
      <h2>Pendidikan</h2>
      {education.map((edu, index) => (
        <div key={index} className="card">
          <h3>{edu.institution}</h3>
          <p>{edu.degree}</p>
          <small>{edu.period}</small>
        </div>
      ))}
    </section>
  );
}
