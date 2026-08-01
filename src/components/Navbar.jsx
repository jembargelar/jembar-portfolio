import { useState } from "react";
import { personal } from "../data/portfolio";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="#" className="logo">{personal.name.split(" ")[0]}.dev</a>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li><a href="#about" onClick={() => setIsOpen(false)}>Tentang</a></li>
          <li><a href="#experience" onClick={() => setIsOpen(false)}>Pengalaman</a></li>
          <li><a href="#skills" onClick={() => setIsOpen(false)}>Keahlian</a></li>
          <li><a href="#projects" onClick={() => setIsOpen(false)}>Proyek</a></li>
          <li><a href="#education" onClick={() => setIsOpen(false)}>Pendidikan</a></li>
          <li><a href="#contact" onClick={() => setIsOpen(false)}>Kontak</a></li>
        </ul>
      </div>
    </nav>
  );
}
