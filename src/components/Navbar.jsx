import { useState } from "react";
import { useTranslation } from "react-i18next";
import { personal } from "../data/portfolio";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // 1. Tambahkan 't' di sini
  const { t, i18n } = useTranslation();

  // Fungsi untuk ganti bahasa
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="#" className="logo">{personal.name.split(" ")[0]}.dev</a>

        {/* Tombol Switcher Bahasa (ID | EN) */}
        <div className="lang-switcher" style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <button
            onClick={() => changeLanguage('id')}
            style={{
              fontWeight: i18n.language === 'id' ? 'bold' : 'normal',
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer'
            }}
          >
            ID
          </button>
          <span>|</span>
          <button
            onClick={() => changeLanguage('en')}
            style={{
              fontWeight: i18n.language === 'en' ? 'bold' : 'normal',
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer'
            }}
          >
            EN
          </button>
        </div>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>

        {/* 2. Menu Navigasi Menggunakan t("nav...") */}
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li><a href="#about" onClick={() => setIsOpen(false)}>{t("navAbout")}</a></li>
          <li><a href="#experience" onClick={() => setIsOpen(false)}>{t("navExperience")}</a></li>
          <li><a href="#skills" onClick={() => setIsOpen(false)}>{t("navSkills")}</a></li>
          <li><a href="#projects" onClick={() => setIsOpen(false)}>{t("navProjects")}</a></li>
          <li><a href="#education" onClick={() => setIsOpen(false)}>{t("navEducation")}</a></li>
          <li><a href="#contact" onClick={() => setIsOpen(false)}>{t("navContact")}</a></li>
        </ul>
      </div>
    </nav>
  );
}
