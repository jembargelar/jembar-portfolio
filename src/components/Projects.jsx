import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2>Project</h2>
      {projects.map((project, index) => (
        <div key={index} className="card">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <small className="tech-tag">Tech Stack: {project.tech}</small>
        </div>
      ))}
    </section>
  );
}
