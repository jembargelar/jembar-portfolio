import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { personal } from "../data/portfolio";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

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
    { name: t("sectionEducation"), href: "#education" },
    { name: t("sectionContact"), href: "#contact" },
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
      <nav className="glass-navbar" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "900px",
        padding: "10px 24px",
        borderRadius: "999px",
        position: "relative"
      }}>
        {/* Logo */}
        <button 
          onClick={handleLogoClick}
          style={{
            background: "none",
            border: "none",
            color: "#f9fafb",
            fontWeight: "800",
            fontSize: "1.1rem",
            cursor: "pointer",
            letterSpacing: "-0.02em"
          }}
        >
          {personal.name.split(" ")[0]}<span style={{ color: "#3B82F6" }}>.dev</span>
        </button>

        {/* Menu Desktop (Layar Lebar) */}
        <div style={{ display: "flex", gap: "20px", fontSize: "0.85rem", fontWeight: "500" }} className="desktop-nav">
          {navLinks.map((link, idx) => (
            <a key={idx} href={link.href} style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}>
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Action: Language Switcher & Hamburger Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          
          {/* Lang Switcher */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "4px 8px",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <Globe size={13} color="#60a5fa" />
            <button
              onClick={() => changeLanguage('id')}
              style={{
                background: "none", border: "none",
                color: i18n.language === 'id' ? '#60a5fa' : '#6b7280',
                fontWeight: i18n.language === 'id' ? '700' : '400',
                cursor: "pointer", fontSize: "0.75rem"
              }}
            >
              ID
            </button>
            <span style={{ color: "#374151", fontSize: "0.75rem" }}>|</span>
            <button
              onClick={() => changeLanguage('en')}
              style={{
                background: "none", border: "none",
                color: i18n.language === 'en' ? '#60a5fa' : '#6b7280',
                fontWeight: i18n.language === 'en' ? '700' : '400',
                cursor: "pointer", fontSize: "0.75rem"
              }}
            >
              EN
            </button>
          </div>

          {/* Tombol Garis Tiga (Hamburger) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#f9fafb"
            }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Dropdown Menu dengan Animasi Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                top: "70px",
                right: "0",
                width: "220px",
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                zIndex: 101
              }}
            >
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: "#e2e8f0",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(59, 130, 246, 0.15)"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
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
