import { personal } from "../data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <h2>Kontak</h2>
      <div className="contact-info">
        <p><strong>Email:</strong> {personal.email}</p>
        <p><strong>Lokasi:</strong> {personal.location}</p>
        <div className="contact-links">
          <a href={personal.phone} target="_blank" rel="noreferrer" className="btn primary">
            WhatsApp
          </a>
          <a href={personal.github} target="_blank" rel="noreferrer" className="btn secondary">
            GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}

