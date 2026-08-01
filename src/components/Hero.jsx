import React from 'react';

export default function Hero() {
  return (
    <section className="container" style={{ textAlign: 'center', paddingTop: '120px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '12px' }}>
        Halo, Saya <span className="text-gradient">Jembar Gelar Kusumah Wibawa</span>
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '24px' }}>
        Administrative Specialist | Data Management | Web Developer
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <a href="/Jembar_CV.pdf" download className="btn-primary">
          📄 Download CV
        </a>
        <a href="#contact" className="theme-toggle-btn" style={{ textDecoration: 'none', padding: '12px 20px' }}>
          Hubungi Saya
        </a>
      </div>
    </section>
  );
}
