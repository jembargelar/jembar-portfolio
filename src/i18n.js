import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  id: {
    translation: {
      // Navbar
      navAbout: "Tentang",
      navExperience: "Pengalaman",
      navSkills: "Keahlian",
      navProjects: "Proyek",
      navEducation: "Pendidikan",
      navContact: "Kontak",

      // Hero
      greeting: "Halo, Saya 👋",
      role: "Profesional Administrasi | Spesialis Manajemen Data | Penggemar Pengembangan Web Front-End",
      contactBtn: "Hubungi saya",
      downloadCvBtn: "Unduh CV (PDF)",

      // Titles
      sectionAbout: "Tentang Saya",
      sectionExperience: "Pengalaman Kerja",
      sectionSkills: "Keahlian & Teknologi",
      sectionProjects: "Proyek Portfolio",
      sectionEducation: "Pendidikan",
      sectionContact: "Hubungi Saya",

      // Form & Footer
      viewProject: "Lihat Proyek",
      sendMessage: "Kirim Pesan",
      copyright: "Hak Cipta Dilindungi."
    }
  },
  en: {
    translation: {
      // Navbar
      navAbout: "About",
      navExperience: "Experience",
      navSkills: "Skills",
      navProjects: "Projects",
      navEducation: "Education",
      navContact: "Contact",

      // Hero
      greeting: "Hello, I'm 👋",
      role: "Administrative Professional | Data Management Specialist | Front-End Web Dev Enthusiast",
      contactBtn: "Contact me",
      downloadCvBtn: "Download CV (PDF)",

      // Titles
      sectionAbout: "About Me",
      sectionExperience: "Work Experience",
      sectionSkills: "Skills & Technologies",
      sectionProjects: "Portfolio Projects",
      sectionEducation: "Education",
      sectionContact: "Contact Me",

      // Form & Footer
      viewProject: "View Project",
      sendMessage: "Send Message",
      copyright: "All Rights Reserved."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
