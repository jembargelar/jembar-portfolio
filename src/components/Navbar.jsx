import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { personal } from "../data/portfolio";

export default function Navbar() {
  const { i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const isEn = i18n.language === "en";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = [
        "about",
        "experience",
        "skills",
        "projects",
        "certificates",
        "education",
        "contact",
      ];

      let current = "about";

      for (const id of sections) {
        const element = document.getElementById(id);

        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top <= 180) {
            current = id;
          }
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
    {
      id: "about",
      name: isEn ? "About" : "Tentang",
      href: "#about",
    },
    {
      id: "experience",
      name: isEn ? "Experience" : "Pengalaman",
      href: "#experience",
    },
    {
      id: "skills",
      name: isEn ? "Skills" : "Keahlian",
      href: "#skills",
    },
    {
      id: "projects",
      name: isEn ? "Projects" : "Proyek",
      href: "#projects",
    },
    {
      id: "certificates",
      name: isEn ? "Certificates" : "Sertifikat",
      href: "#certificates",
    },
    {
      id: "education",
      name: isEn ? "Education" : "Pendidikan",
      href: "#education",
    },
    {
      id: "contact",
      name: isEn ? "Contact" : "Kontak",
      href: "#contact",
    },
  ];

  const scrollToSection = (href) => {
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsOpen(false);
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
          transition:
            max-width .45s ease,
            background .45s ease,
            border-color .45s ease,
            box-shadow .45s ease,
            transform .45s ease;
        }

        .navbar-container.top {
          max-width: 920px;
        }

        .navbar-container.scrolled {
          max-width: 1050px;
          background: rgba(10, 15, 25, .72);
          border-color: rgba(255,255,255,.12);
          box-shadow:
            0 18px 55px rgba(0,0,0,.28),
            inset 0 1px 0 rgba(255,255,255,.06);
        }

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
          transition:
            color .25s ease,
            background .25s ease,
            transform .25s ease;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,.055);
          transform: translateY(-1px);
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

        .nav-control {
          transition:
            transform .25s ease,
            background .25s ease,
            border-color .25s ease;
        }

        .nav-control:hover {
          transform: translateY(-2px) scale(1.04);
          border-color: var(--accent-blue) !important;
        }

        .mobile-button {
          display: none;
        }

        .mobile-nav-link {
          display: block;
          width: 100%;
          border: none;
          background: transparent;
          text-align: left;
          color: var(--text-primary);
          font-size: .9rem;
          font-weight: 600;
          padding: 11px 13px;
          border-radius: 10px;
          cursor: pointer;
          transition: all .2s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--accent-blue);
          background: rgba(34,211,238,.08);
        }

        @media (max-width: 900px) {
          .nav-desktop {
            display: none;
          }

          .mobile-button {
            display: flex !important;
          }

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

          .navbar-container {
            padding: 8px 12px !important;
          }

          .mobile-dropdown {
            right: 0 !important;
            left: 0 !important;
            width: auto !important;
          }
        }
      `}</style>

      <header className="navbar-wrapper">
        <motion.nav
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`navbar-container glass-navbar ${
            scrolled ? "scrolled" : "top"
          }`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderRadius: "999px",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid var(--card-border)",
          }}
        >
          {/* LOGO */}
          <motion.button
            onClick={handleLogoClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            style={{
              flexShrink: 0,
              background: "none",
              border: "none",
              color: "var(--text-primary)",
              fontWeight: 800,
              fontSize: "1.05rem",
              cursor: "pointer",
              letterSpacing: "-0.03em",
            }}
          >
            {personal.name.split(" ")[0]}
            <span style={{ color: "var(--accent-blue)" }}>.dev</span>
          </motion.button>

          {/* DESKTOP NAV */}
          <div className="nav-desktop">
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                className={`nav-link ${
                  activeSection === link.id ? "active" : ""
                }`}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* CONTROLS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            {/* THEME */}
            <motion.button
              className="nav-control"
              onClick={() => setIsDarkMode(!isDarkMode)}
              whileTap={{ scale: 0.9 }}
              style={{
                background: "var(--btn-sec-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-primary)",
              }}
              title="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  >
                    <Sun size={16} color="#f59e0b" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  >
                    <Moon size={16} color="#2563eb" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* LANGUAGE */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                background: "var(--btn-sec-bg)",
                padding: "4px 8px",
                borderRadius: "999px",
                border: "1px solid var(--card-border)",
              }}
            >
              <Globe size={12} color="var(--accent-blue)" />

              <button
                onClick={() => changeLanguage("id")}
                style={{
                  background: "none",
                  border: "none",
                  color:
                    i18n.language === "id"
                      ? "var(--accent-blue)"
                      : "var(--text-secondary)",
                  fontWeight:
                    i18n.language === "id" ? 800 : 500,
                  cursor: "pointer",
                  fontSize: ".7rem",
                }}
              >
                ID
              </button>

              <span
                style={{
                  color: "var(--text-secondary)",
                  opacity: 0.4,
                  fontSize: ".7rem",
                }}
              >
                /
              </span>

              <button
                onClick={() => changeLanguage("en")}
                style={{
                  background: "none",
                  border: "none",
                  color:
                    i18n.language === "en"
                      ? "var(--accent-blue)"
                      : "var(--text-secondary)",
                  fontWeight:
                    i18n.language === "en" ? 800 : 500,
                  cursor: "pointer",
                  fontSize: ".7rem",
                }}
              >
                EN
              </button>
            </div>

            {/* MOBILE */}
            <motion.button
              className="mobile-button nav-control"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              style={{
                background: "var(--btn-sec-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-primary)",
              }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={17} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={17} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mobile-dropdown"
                initial={{
                  opacity: 0,
                  y: -12,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.22,
                }}
                style={{
                  position: "absolute",
                  top: "62px",
                  right: 0,
                  width: "230px",
                  padding: "10px",
                  background: "rgba(10,15,25,.88)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "18px",
                  boxShadow: "0 20px 60px rgba(0,0,0,.35)",
                }}
              >
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    className={`mobile-nav-link ${
                      activeSection === link.id ? "active" : ""
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.035,
                    }}
                    onClick={() =>
                      scrollToSection(link.href)
                    }
                  >
                    {link.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>
    </>
  );
}
