import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import VisualEffects from "./components/VisualEffects";
import Hero from "./components/Hero";
import About from "./components/About";
import WhatIBuild from "./components/WhatIBuild";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Education from "./components/Education";
import Contact from "./components/Contact";
import AdminDashboard from "./admin/AdminDashboard";
import EntryExperience from "./components/EntryExperience";
import ProjectDetail from "./components/ProjectDetail";

function Portfolio() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-color)",
        color: "var(--text-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <VisualEffects />

      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar />
        <Hero />
        <About />
        <WhatIBuild />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <Education />
        <Contact />
      </div>
    </div>
  );
}
function AdminPlaceholder() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05070b",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "35px",
          borderRadius: "24px",
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.1)",
          backdropFilter: "blur(20px)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "15px" }}>
          🛠️
        </div>

        <h1
          style={{
            margin: "0 0 10px",
            fontSize: "2rem",
          }}
        >
          Admin Panel
        </h1>

        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,.6)",
            lineHeight: 1.6,
          }}
        >
          Panel admin sedang kita bangun.
          <br />
          Nantinya semua konten portfolio bisa
          dikelola dari sini tanpa coding.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [entered, setEntered] = React.useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            entered ? (
              <Portfolio />
            ) : (
              <EntryExperience onEnter={() => setEntered(true)} />
            )
          }
        />

        <Route path="/projects/:id" element={<ProjectDetail />} />

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}
