import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">Project & Hasil Kerja</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="tools-used">
                <span className="tools-label">Teknologi & Alat yang Digunakan:</span>
                <div className="badge-container">
                  {project.tools.map((tool, toolIndex) => (
                    <span key={toolIndex} className="tool-badge">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
