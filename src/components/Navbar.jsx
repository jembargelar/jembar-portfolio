import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Cek preferensi awal
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <nav className="navbar">
      <div style={{ fontWeight: '800', fontSize: '18px' }}>
        Jembar<span className="text-gradient">.dev</span>
      </div>
      <ul className="nav-links">
        <li><a href="#about">Tentang</a></li>
        <li><a href="#experience">Pengalaman</a></li>
        <li><a href="#skills">Keahlian</a></li>
        <li><a href="#contact">Kontak</a></li>
        <li>
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Ganti Mode">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
