import { useTranslation } from "react-i18next";
import { projects } from "../data/portfolio";

export default function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>{t("sectionProjects")}</h2>
        <div className="projects-grid">
          {projects.map((proj, index) => (
            <div key={index} className="project-card">
              <h3>{proj.title}</h3>
              <span className="category">{proj.category[lang]}</span>
              <p>{proj.description[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
