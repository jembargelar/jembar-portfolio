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

      // Hero Section
      available: "TERSEDIA UNTUK KERJA",
      greeting: "Halo, Saya 👋",
      roles: "Profesional Administrasi • Pengembang Web Front-End • Spesialis Manajemen Data",
      heroDesc: "Saya membantu perusahaan mengelola administrasi, mengembangkan website modern, dan mengubah data menjadi keputusan yang lebih cepat.",
      hireMe: "Hubungi Saya",
      downloadCv: "Unduh CV",
      yearsExp: "Tahun Pengalaman",
      projectsDone: "Proyek Selesai",
      commitment: "Komitmen",
      
      // Legacy Hero Keys (opsional/cadangan)
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

      // Hero Section
      available: "AVAILABLE FOR WORK",
      greeting: "Hello, I'm 👋",
      roles: "Administrative Professional • Frontend Web Developer • Data Management Specialist",
      heroDesc: "I help companies manage administration, build modern websites, and turn data into faster decisions.",
      hireMe: "Hire Me",
      downloadCv: "Download CV",
      yearsExp: "Years Experience",
      projectsDone: "Projects Done",
      commitment: "Commitment",

      // Legacy Hero Keys (optional fallback)
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
