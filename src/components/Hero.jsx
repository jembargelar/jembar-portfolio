import { personal } from "../data/portfolio";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero-content">
        <img 
          src="/jem.jpg" 
          alt={personal.name} 
          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-2 border-sky-400/40 mb-6 shadow-lg"
        />
        <p className="hero-subtitle">Halo, Saya 👋</p>
        <h1 className="hero-title">{personal.name}</h1>
        <p className="hero-desc">{personal.role}</p>
        <div className="btn-group">
          <a href="#contact" className="btn btn-primary">Hubungi Saya</a>
          <a href={personal.cvUrl} download className="btn btn-secondary">Unduh CV (PDF)</a>
        </div>
      </div>
    </section>
  );
}
