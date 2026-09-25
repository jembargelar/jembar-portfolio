import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { getHeroContent } from "../api/publicData";

export default function Navbar() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [heroName, setHeroName] = useState("Jembar");

  const isEn = i18n.language === "en";

  useEffect(() => {
    let mounted = true;
    async function loadHeroName() {
      const { data } = await getHeroContent();
      if (mounted && data?.name) setHeroName(data.name);
    }
    loadHeroName();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = [
        "about", "experience", "skills", "projects",
        "certificates", "education", "contact",
      ];
      let current = "about";
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 180) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Tutup menu kalau layar di-resize ke desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock scroll pas menu mobile kebuka + Esc buat nutup
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLogoClick = () => {
    if (window.triggerEasterEgg) window.triggerEasterEgg();
  };

  const navLinks = [
    { id: "about", name: isEn ? "About" : "Tentang", href: "#about" },
    { id: "experience", name: isEn ? "Experience" : "Pengalaman", href: "#experience" },
    { id: "skills", name: isEn ? "Skills" : "Keahlian", href: "#skills" },
    { id: "projects", name: isEn ? "Projects" : "Proyek", href: "#projects" },
    { id: "certificates", name: isEn ? "Certificates" : "Sertifikat", href: "#certificates" },
    { id: "education", name: isEn ? "Education" : "Pendidikan", href: "#education" },
    { id: "contact", name: isEn ? "Contact" : "Kontak", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      // Delay sedikit biar animasi close gak keganggu
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  };

  return (
    <>
      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 16px;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          padding: 0 16px;
          pointer-events: none;
        }
        .navbar-container {
          pointer-events: auto;
          position: relative;
          width: 100%;
          max-width: 1100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-radius: 999px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--card-border);
          transition:
            max-width .45s ease,
            background .45s ease,
            border-color .45s ease,
            box-shadow .45s ease;
        }
        .navbar-container.top { max-width: 920px; }
        .navbar-container.scrolled {
          max-width: 1050px;
          background: rgba(10, 15, 25, .72);
          border-color: rgba(255,255,255,.12);
          box-shadow:
            0 18px 55px rgba(0,0,0,.28),
            inset 0 1px 0 rgba(255,255,255,.06);
        }
        .light-mode .navbar-container.scrolled {
          background: rgba(255,255,255,.85);
          border-color: rgba(15,23,42,.08);
          box-shadow: 0 18px 55px rgba(15,23,42,.08);
        }

        .nav-logo {
          flex-shrink: 0;
          background: none;
          border: none;
          color: var(--text-primary);
          font-weight: 800;
          font-size: 1.05rem;
          cursor: pointer;
          letter-spacing: -0.03em;
          font-family: inherit;
        }
        .nav-logo .dot { color: var(--accent-blue); }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link {
          position: relative;
          padding: 8px 9px;
          border-radius: 10px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: .78rem;
          font-weight: 600;
          transition: color .25s ease, background .25s ease;
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,.055);
        }
        .light-mode .nav-link:hover {
          background: rgba(15,23,42,.05);
        }
        .nav-link.active {
          color: var(--accent-blue);
          background: rgba(34,211,238,.08);
        }
        .nav-link.active::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 3px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent-blue);
          box-shadow: 0 0 10px var(--accent-blue);
          transform: translateX(-50%);
        }

        .nav-controls {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .nav-control {
          background: var(--btn-sec-bg);
          border: 1px solid var(--card-border);
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-primary);
          transition: transform .25s ease, background .25s ease, border-color .25s ease;
        }
        .nav-control:hover {
          transform: translateY(-2px) scale(1.04);
          border-color: var(--accent-blue) !important;
        }

        .lang-toggle {
          background: var(--btn-sec-bg);
          border: 1px solid var(--card-border);
          border-radius: 999px;
          height: 34px;
          padding: 0 4px;
          display: flex;
          align-items: center;
          gap: 2px;
          font-family: inherit;
        }
        .lang-btn {
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: .7rem;
          font-weight: 700;
          padding: 5px 10px;
          border-radius: 999px;
          cursor: pointer;
          font-family: inherit;
          transition: all .2s ease;
          letter-spacing: .02em;
        }
        .lang-btn.active {
          background: var(--accent-blue);
          color: #020617;
        }

        .mobile-button { display: none; }

        /* ==== MOBILE DROPDOWN (FIXED) ==== */
        .nav-mobile-backdrop {
          position: fixed;
          inset: 0;
          z-index: 90;
          background: rgba(2, 6, 23, .55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .light-mode .nav-mobile-backdrop {
          background: rgba(15, 23, 42, .35);
        }
        .nav-mobile-panel {
          position: fixed;
          top: 76px;
          left: 16px;
          right: 16px;
          z-index: 95;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 10px;
          box-shadow: 0 24px 60px rgba(0,0,0,.35);
          max-height: calc(100vh - 100px);
          overflow-y: auto;
        }
        .light-mode .nav-mobile-panel {
          background: #FFFFFF;
          box-shadow: 0 24px 60px rgba(15,23,42,.12);
        }
        .mobile-nav-link {
          display: block;
          width: 100%;
          border: none;
          background: transparent;
          text-align: left;
          color: var(--text-primary);
          font-size: .95rem;
          font-weight: 600;
          padding: 13px 15px;
          border-radius: 12px;
          cursor: pointer;
          font-family: inherit;
          transition: all .2s ease;
        }
        .mobile-nav-link + .mobile-nav-link {
          margin-top: 2px;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--accent-blue);
          background: rgba(34,211,238,.08);
        }

        @media (max-width: 900px) {
          .nav-desktop { display: none; }
          .mobile-button { display: flex !important; }
          .navbar-container,
          .navbar-container.top,
          .navbar-container.scrolled {
            max-width: 700px;
          }
        }
        @media (max-width: 480px) {
          .navbar-wrapper {
            top: 10px;
            padding: 0 10px;
          }
          .navbar-container { padding: 8px 12px !important; }
          .nav-mobile-panel {
            top: 66px;
            left: 10px;
            right: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .navbar-wrapper *, .navbar-wrapper *::before, .navbar-wrapper *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <header className="navbar-wrapper">
        <motion.nav
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`navbar-container ${scrolled ? "scrolled" : "top"}`}
        >
          <button
            className="nav-logo"
            onClick={handleLogoClick}
            aria-label="Logo"
          >
            {heroName.split(" ")[0]}
            <span className="dot">.dev</span>
          </button>

          <div className="nav-desktop">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="nav-controls">
            <button
              className="nav-control"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <div className="lang-toggle">
              <button
                className={`lang-btn ${!isEn ? "active" : ""}`}
                onClick={() => changeLanguage("id")}
              >
                ID
              </button>
              <button
                className={`lang-btn ${isEn ? "active" : ""}`}
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>
            </div>

            <button
              className="nav-control mobile-button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              className="nav-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              key="panel"
              className="nav-mobile-panel"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  className={`mobile-nav-link ${activeSection === link.id ? "active" : ""}`}
                  onClick={() => scrollToSection(link.href)}
                >
                  {link.name}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
