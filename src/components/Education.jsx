import { useTranslation } from "react-i18next";
import { education } from "../data/portfolio";

export default function Education() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';

  return (
    <section id="education" className="education">
      <div className="container">
        <h2>{t("sectionEducation")}</h2>
        {education.map((edu, index) => (
          <div key={index} className="edu-card">
            <h3>{edu.degree[lang]}</h3>
            <h4>{edu.institution}</h4>
            <span>{edu.period[lang]}</span>
            <p>{edu.description[lang]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
