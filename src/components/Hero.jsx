import { personal } from "../data/portfolio";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <span className="hero-badge">Selamat Datang di Portofolio Saya</span>
        <h1>Halo, Saya <span>{personal.name}</span></h1>
        <p>{personal.role} yang berfokus pada efisiensi sistem administrasi, pengelolaan data, dan pengembangan web modern.</p>
        <div className="hero-btns">
          <a href="#contact" className="btn btn-primary">Hubungi Saya</a>
          <a href="#about" className="btn btn-secondary">Pelajari Lebih Lanjut</a>
        </div>
      </div>
    </section>
  );
}
