import { useTranslation } from "react-i18next";
import { personal } from "../data/portfolio";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="hero">
      <div className="container hero-content">
        <img
          src="/profile.jpg"
          alt={personal.name}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            margin: "0 auto 1rem auto"
          }}
        />

        <p className="hero-subtitle">{t("greeting")}</p>
        <h1 className="hero-title">{personal.name}</h1>
        <p className="hero-desc">{t("role")}</p>

        <div className="btn-group">
          <a href="#contact" className="btn btn-primary">
            {t("contactBtn")}
          </a>
          <a href={personal.cvUrl} download className="btn btn-secondary">
            {t("downloadCvBtn")}
          </a>
        </div>
      </div>
    </section>
  );
}
