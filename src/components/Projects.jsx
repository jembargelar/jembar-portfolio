import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Proyek & Showcase</h2>
        <div className="projects-grid">
          {projects.map((proj, index) => (
            <div key={index} className="glass-card">
              <span style={{ fontSize: "0.8rem", color: "var(--accent-color)" }}>{proj.category}</span>
              <h3 style={{ margin: "5px 0 10px" }}>{proj.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{proj.description}</p>
              <div className="tech-tags">
                {proj.tech.map((t, idx) => (
                  <span key={idx} className="tech-tag">{t}</span>
                ))}
              </div>
              {proj.link !== "#" && (
                <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: "var(--accent-color)", fontSize: "0.85rem" }}>
                  Lihat Proyek ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

