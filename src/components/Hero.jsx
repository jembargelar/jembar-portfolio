import { personal } from "../data/portfolio";

export default function Hero() {
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

        <p className="hero-subtitle">Halo, Saya 👋</p>
        <h1 className="hero-title">{personal.name}</h1>
        <p className="hero-desc">{personal.role}</p>
        <div className="btn-group">
          <a href="#contact" className="btn btn-primary">
            Hubungi Saya
          </a>
          <a href={personal.cvUrl} download className="btn btn-secondary">
            Unduh CV (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
