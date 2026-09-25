import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { getSocialLinks, getHeroContent } from "../api/publicData";
import SectionScene from "./three/SectionScene";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [social, setSocial] = useState(null);
  const [heroName, setHeroName] = useState(
    "Jembar Gelar Kusumah Wibawa"
  );

  useEffect(() => {
    let mounted = true;

    async function loadContactData() {
      const [{ data: socialData }, { data: heroData }] =
        await Promise.all([
          getSocialLinks(),
          getHeroContent(),
        ]);

      if (!mounted) return;

      if (socialData) {
        setSocial(socialData);
      }

      if (heroData?.name) {
        setHeroName(heroData.name);
      }
    }

    loadContactData();

    return () => {
      mounted = false;
    };
  }, []);

  const contact = social || {};
  const isEn = i18n.language === "en";

  const email = contact.email || "";
  const github = contact.github || "";
  const linkedin = contact.linkedin || "";
  const whatsapp = contact.whatsapp || "";
  const location =
    (isEn
      ? contact.location_en || contact.location_id
      : contact.location_id || contact.location_en) ||
    "Garut, Indonesia";

  const contactTitle =
    (isEn
      ? contact.contact_title_en || contact.contact_title_id
      : contact.contact_title_id || contact.contact_title_en) ||
    t("letsBuild");

  const contactDescription =
    (isEn
      ? contact.contact_description_en ||
        contact.contact_description_id
      : contact.contact_description_id ||
        contact.contact_description_en) ||
    t("contactSubtitle");

  return (
    <section id="contact" style={{ padding: "80px 20px", position: "relative", overflow: "hidden" }}>
      <SectionScene object="spiderman" position="right" scale={0.7} opacity={0.5} cameraZ={5.5} />
      <div style={{ maxWidth: "950px", margin: "0 auto" }}>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "40px" }}
        >
          {t("sectionContact")} <span style={{ color: "var(--accent)" }}>.</span>
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: "36px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>
                {contactTitle}
              </h3>

              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "28px" }}>
                {contactDescription}
              </p>
            </div>

            <div>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`mailto:${email}`}
                className="btn-gradient"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "14px 24px",
                  width: "100%",
                  marginBottom: "20px"
                }}
              >
                <Mail size={18} />
                <span>{t("sendEmail")}</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}` : "#"}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "14px 24px",
                  width: "100%",
                  marginBottom: "20px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  fontWeight: "700",
                  color: "var(--text-primary)",
                  backgroundColor: "var(--btn-sec-bg)",
                  border: "1px solid var(--card-border)"
                }}
              >
                <span>💬</span>
                <span>Chat WhatsApp</span>
              </motion.a>

              <div style={{ display: "flex", gap: "16px" }}>
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    color: "var(--text-primary)",
                    backgroundColor: "var(--btn-sec-bg)",
                    border: "1px solid var(--card-border)",
                    padding: "12px",
                    borderRadius: "14px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "0.9rem"
                  }}
                >
                  GitHub ↗
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    color: "var(--text-primary)",
                    backgroundColor: "var(--btn-sec-bg)",
                    border: "1px solid var(--card-border)",
                    padding: "12px",
                    borderRadius: "14px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "0.9rem"
                  }}
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card"
            style={{ padding: "20px", display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={18} color="var(--accent)" />
                <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--text-primary)" }}>
                  {location}
                </span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Garut,West+Java,Indonesia"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.78rem",
                  fontWeight: "700",
                  color: "var(--accent)",
                  textDecoration: "none",
                  padding: "6px 11px",
                  borderRadius: "10px",
                  border: "1px solid rgba(34,211,238,.25)",
                  background: "rgba(34,211,238,.08)",
                  whiteSpace: "nowrap",
                }}
              >
                Buka Maps
                <ExternalLink size={12} />
              </a>
            </div>

            <div style={{
              width: "100%",
              height: "220px",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid var(--card-border)"
            }}>
              <iframe
                title={i18n.language === "en" ? "Location Map" : "Peta Lokasi"}
                src="https://maps.google.com/maps?q=Garut,West%20Java,Indonesia&t=&z=11&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </motion.div>

        </div>

        <footer style={{ marginTop: "60px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          <p>© {new Date().getFullYear()} {heroName}. {t("copyright")}</p>
        </footer>

      </div>
    </section>
  );
}

