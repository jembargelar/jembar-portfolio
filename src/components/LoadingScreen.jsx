import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "#030712",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{ textAlign: "center" }}
      >
        <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#f9fafb" }}>
          Jembar<span style={{ color: "#3B82F6" }}>.dev</span>
        </h2>
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{
            width: "32px",
            height: "4px",
            backgroundColor: "#3B82F6",
            margin: "12px auto 0 auto",
            borderRadius: "999px"
          }}
        />
      </motion.div>
    </div>
  );
}
