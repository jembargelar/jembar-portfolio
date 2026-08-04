import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { personal } from "../data/portfolio";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" style={{ paddingTop: "130px", paddingBottom: "80px", paddingLeft: "20px", paddingRight: "20px", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: "1150px", margin: "0 auto", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}>
          
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(34, 211, 238, 0.1)", border: "1px solid rgba(34, 211, 238, 0.3)", padding: "6px 16px", borderRadius: "999px", fontSize: "0.82rem", fontWeight: "600", color: "var(--accent)", marginBottom: "24px" }}>
              <span style={{ width: "8px", height: "8px", backgroundColor: "var(--accent)", borderRadius: "50%", boxShadow: "0 0 10px var(--accent)" }} />
              <span>{t("available")}</span>
            </div>

            <h1 style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)", fontWeight: "900", lineHeight: "1.05", letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "18px" }}>
              JEMBAR <br />
              <span style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                GELAR KUSUMAH
              </span> <br />
              WIBAWA
            </h1>

            <p style={{ color: "var(--accent)", fontWeight: "600", fontSize: "1rem", marginBottom: "20px" }}>{t("roles")}</p>
            <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: "1.7", maxWidth: "540px", marginBottom: "36px" }}>{t("heroDesc")}</p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="#contact" className="btn-gradient" style={{ padding: "14px 28px", display: "inline-flex", alignItems: "center" }}>
                {t("hireMe")} ➔
              </motion.a>
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={personal.cvUrl} download style={{ display: "inline-flex", alignItems: "center", color: "var(--text-primary)", backgroundColor: "var(--btn-sec-bg)", border: "1px solid var(--card-border)", padding: "14px 28px", borderRadius: "14px", fontWeight: "600", textDecoration: "none" }}>
                📥 {t("downloadCv")}
              </motion.a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: "360px", height: "420px", borderRadius: "20px", overflow: "hidden", border: "1px solid var(--card-border)", boxShadow: "0 20px 60px rgba(59, 130, 246, 0.2)" }}>
              <img src="/profile.jpg" alt={personal.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
