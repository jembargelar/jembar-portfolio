import { useTranslation } from "react-i18next";
import { experiences } from "../data/portfolio";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2>{t("sectionExperience")}</h2>
        {experiences.map((exp, index) => (
          <div key={index} className="exp-card">
            <h3>{exp.role}</h3>
            <h4>{exp.company}</h4>
            <span className="period">{exp.period[lang]}</span>
            <ul>
              {exp.highlights[lang].map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
