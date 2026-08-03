import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { personal } from "../data/portfolio";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="hero">
      <div className="container hero-content">
        {/* Foto profil muncul dengan efek membesar (Scale) */}
        <motion.img
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          src="/profile.jpg"
          alt={personal.name}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            margin: "0 auto 1rem auto"
          }}
        />

        {/* Text muncul dari bawah berurutan (Staggered) */}
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hero-subtitle"
        >
          {t("greeting")}
        </motion.p>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hero-title"
        >
          {personal.name}
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hero-desc"
        >
          {t("role")}
        </motion.p>

        {/* Tombol dengan Efek Hover / Membesar saat Ditekan */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="btn-group"
        >
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            className="btn btn-primary"
          >
            {t("contactBtn")}
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={personal.cvUrl} 
            download 
            className="btn btn-secondary"
          >
            {t("downloadCvBtn")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
