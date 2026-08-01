import { personal } from "../data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title">Hubungi Saya</h2>
        <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
          Silakan hubungi saya untuk peluang kerja, diskusi administrasi, atau kolaborasi proyek.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`mailto:${personal.email}`} className="btn btn-primary">
            ✉️ Kirim Email
          </a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
            💼 LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
