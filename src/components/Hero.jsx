import { personal } from "../data/portfolio";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Halo, Saya <span>{personal.name}</span></h1>
        <p>{personal.role}</p>
        <div className="hero-btns">
          <a href="#contact" className="btn primary">Hubungi Saya</a>
          <a href="#projects" className="btn secondary">Lihat Project</a>
        </div>
      </div>
    </section>
  );
}

