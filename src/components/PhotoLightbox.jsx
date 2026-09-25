import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PhotoLightbox({ src, alt = "Profile photo", isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(2, 6, 23, 0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            cursor: "zoom-out",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close photo"
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              width: "44px",
              height: "44px",
              display: "grid",
              placeItems: "center",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              cursor: "pointer",
              zIndex: 10000,
              fontFamily: "inherit",
            }}
          >
            <X size={22} />
          </button>

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(34,211,238,0.25)",
              maxWidth: "min(680px, 92vw)",
              maxHeight: "88vh",
              cursor: "default",
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                maxHeight: "88vh",
                objectFit: "contain",
                background: "#0a0f1e",
              }}
            />
            {/* Badge */}
            <div
              style={{
                position: "absolute",
                left: "16px",
                bottom: "16px",
                padding: "8px 14px",
                borderRadius: "12px",
                background: "rgba(2, 6, 23, 0.75)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                fontSize: ".75rem",
                fontWeight: 700,
                letterSpacing: ".04em",
              }}
            >
              JEMBAR.DEV · DIGITAL PORTFOLIO
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
