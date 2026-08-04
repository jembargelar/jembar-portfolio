import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { personal } from "../data/portfolio";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sinkronisasi tema ke html & body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isDarkMode) {
      root.classList.remove("light-mode");
      body.classList.remove("light-mode");
      root.removeAttribute("data-theme");
    } else {
      root.classList.add("light-mode");
      body.classList.add("light-mode");
      root.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    if (window.triggerEasterEgg) {
      window.triggerEasterEgg();
    }
  };

  const navLinks = [
    { name: t("navAbout"), href: "#about" },
    { name: t("navExperience"), href: "#experience" },
    { name: t("navSkills"), href: "#skills" },
    { name: t("navProjects"), href: "#projects" },
    { name: t("navEducation"), href: "#education" },
    { name: t("navContact"), href: "#contact" },
  ];

  return (
    <header style={{
      position: "fixed",
      top: "16px",
      left: "0",
      right: "0",
      zIndex: 100,
      display: "flex",
      justifyContent: "center",
      padding: "0 16px"
    }}>
      <style>{`
        .desktop-nav-links {
          display: flex;
          gap: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .hamburger-button {
          display: none;
        }
        @media (max-width: 768px) {
          .desktop-nav-links {
            display: none !important;
          }
          .hamburger-button {
            display: flex !important;
          }
        }
      `}</style>

      <nav className="glass-navbar" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "920px",
        padding: "10px 20px",
        borderRadius: "999px",
        position: "relative"
      }}>
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-primary)",
            fontWeight: "800",
            fontSize: "1.1rem",
            cursor: "pointer",
            letterSpacing: "-0.02em"
          }}
        >
          {personal.name.split(" ")[0]}<span style={{ color: "var(--accent-blue)" }}>.dev</span>
        </button>

        {/* Menu Desktop Horizontal */}
        <div className="desktop-nav-links">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s"
              }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Right: Dark Mode + Lang Switcher + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

          {/* Dark / Light Mode Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: "var(--btn-sec-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-primary)",
              transition: "transform 0.2s ease"
            }}
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="#2563eb" />}
          </button>

          {/* Switcher Bahasa */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            backgroundColor: "var(--btn-sec-bg)",
            padding: "4px 10px",
            borderRadius: "20px",
            border: "1px solid var(--card-border)"
          }}>
            <Globe size={13} color="var(--accent-blue)" />
            <button
              onClick={() => changeLanguage('id')}
              style={{
                background: "none",
                border: "none",
                color: i18n.language === 'id' ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontWeight: i18n.language === 'id' ? '700' : '500',
                cursor: "pointer",
                fontSize: "0.75rem"
              }}
            >
              ID
            </button>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem", opacity: 0.5 }}>|</span>
            <button
              onClick={() => changeLanguage('en')}
              style={{
                background: "none",
                border: "none",
                color: i18n.language === 'en' ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontWeight: i18n.language === 'en' ? '700' : '500',
                cursor: "pointer",
                fontSize: "0.75rem"
              }}
            >
              EN
            </button>
          </div>

          {/* Tombol Hamburger */}
          <button
            className="hamburger-button"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "var(--btn-sec-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-primary)"
            }}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Dropdown Mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                top: "65px",
                right: "0",
                width: "220px",
                backgroundColor: "var(--card-bg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--card-border)",
                borderRadius: "16px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                boxShadow: "0 10px 30px var(--shadow-color)",
                zIndex: 101
              }}
            >
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: "var(--text-primary)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    transition: "background 0.2s ease"
                  }}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </header>
  );
}
