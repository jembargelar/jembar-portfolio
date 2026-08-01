import { personal } from "../data/portfolio";

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">Tentang Saya</h2>
        <div className="about-card">
          <p className="about-text">{personal.about}</p>
          <div className="about-details">
            <p><strong>Lokasi:</strong> {personal.location}</p>
            <p><strong>Pendidikan:</strong> S1 Manajemen - Universitas Terbuka</p>
          </div>
        </div>
      </div>
    </section>
  );
}
