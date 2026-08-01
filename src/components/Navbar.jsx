import { useState } from 'react';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="#hero" className="logo">Jembar.dev</a>
        <ul className="nav-links">
          <li><a href="#about">Tentang</a></li>
          <li><a href="#experience">Pengalaman</a></li>
          <li><a href="#skills">Keahlian</a></li>
          <li><a href="#projects">Project</a></li>
          <li><a href="#contact">Kontak</a></li>
        </ul>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}
