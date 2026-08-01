import { personal } from "../data/portfolio";

export default function Contact() {
  return (
    <section id="contact">
      <div className="container" style={{ textAlign: "center" }}>
        <h2 className="section-title">Hubungi Saya</h2>
        <div className="glass-card" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ marginBottom: "20px" }}>
            Saya terbuka untuk peluang karir, kolaborasi proyek, maupun diskusi mengenai administrasi dan pengembangan web.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
            <a href={`mailto:${personal.email}`} className="btn btn-primary">
              📧 Kirim Email ({personal.email})
            </a>
            <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
              <a href={personal.github} target="_blank" rel="noreferrer" style={{ color: "var(--accent-color)" }}>GitHub</a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" style={{ color: "var(--accent-color)" }}>LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
