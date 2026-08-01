import { personal } from "../data/portfolio";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero-content">
        <p className="hero-subtitle">Halo, Saya 👋</p>
        <h1 className="hero-title">{personal.name}</h1>
        <p className="hero-desc">{personal.role} yang berbasis di {personal.location}. Memiliki keahlian kuat dalam administrasi operasional, kelistrikan (SLO & NIDI), serta pengembangan aplikasi web interaktif.</p>
        <div className="btn-group">
          <a href="#contact" className="btn btn-primary">Hubungi Saya</a>
          <a href={personal.cvUrl} download className="btn btn-secondary">Unduh CV (PDF)</a>
        </div>
      </div>
    </section>
  );
}

