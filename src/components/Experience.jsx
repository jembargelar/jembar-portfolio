import { experiences } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2>Pengalaman Kerja</h2>
      {experiences.map((job, index) => (
        <div key={index} className="card">
          <h3>{job.company}</h3>
          <h4>{job.position}</h4>
          <small>{job.period}</small>
          <p>{job.description}</p>
        </div>
      ))}
    </section>
  );
}

