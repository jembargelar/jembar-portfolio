import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { personal } from "../data/portfolio";
import { useEffect, useState } from "react";
import { getSocialLinks } from "../api/publicData";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [social, setSocial] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const { data } = await getSocialLinks();
      if (mounted && data) setSocial(data);
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const contact = social || personal;
  const isEn = i18n.language === "en";

  const email = contact.email || personal.email;
  const github = contact.github || personal.github;
  const linkedin = contact.linkedin || personal.linkedin;
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
    <section id="contact" style={{ padding: "80px 20px" }}>
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
                <span>{t("sendEmail")} ({email})</span>
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
                    fontSize: "0.85rem"
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
                    fontSize: "0.85rem"
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <MapPin size={18} color="var(--accent)" />
              <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--text-primary)" }}>
                {location}
              </span>
            </div>

            <div style={{
              width: "100%",
              height: "220px",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid var(--card-border)"
            }}>
              <iframe
                title="Location Map"
                src="https://maps.google.com/maps?q=Cianjur,West%20Java&t=&z=10&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(80%) invert(90%) contrast(120%)" }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </motion.div>

        </div>

        <footer style={{ marginTop: "60px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
          <p>© {new Date().getFullYear()} {personal.name}. {t("copyright")}</p>
        </footer>

      </div>
    </section>
  );
}

