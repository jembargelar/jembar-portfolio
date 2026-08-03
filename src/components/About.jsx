import { useTranslation } from "react-i18next";
import { personal } from "../data/portfolio";

export default function About() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';

  return (
    <section id="about" className="about">
      <div className="container">
        <h2>{t("sectionAbout")}</h2>
        <p>{personal.bio[lang]}</p>
      </div>
    </section>
  );
}
