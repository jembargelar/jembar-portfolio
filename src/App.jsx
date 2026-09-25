import React, { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import VisualEffects from "./components/VisualEffects";
import Hero from "./components/Hero";
import About from "./components/About";
import WhatIBuild from "./components/WhatIBuild";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Journey from "./components/Journey";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Education from "./components/Education";
import Contact from "./components/Contact";
import EntryExperience from "./components/EntryExperience";
import SupportMyWork from "./components/SupportMyWork";
import SiteMeta from "./components/SiteMeta";
import Loader from "./components/Loader";

const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));

const ENTRY_KEY = "jembar-entry-seen";

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
        <SiteMeta />
        <Navbar />
        <Hero />
        <About />
        <WhatIBuild />
        <Experience />
        <Journey />
        <Skills />
        <Projects />
        <Certificates />
        <Education />
        <Contact />
        <SupportMyWork />
      </div>
    </div>
  );
}

function hasSeenEntry() {
  try {
    return sessionStorage.getItem(ENTRY_KEY) === "true";
  } catch {
    return false;
  }
}

export default function App() {
  const [phase, setPhase] = React.useState(() =>
    hasSeenEntry() ? "portfolio" : "entry"
  );

  const { i18n } = useTranslation();
  const language = i18n.language === "en" ? "en" : "id";

  const handleEntryDone = React.useCallback(() => {
    setPhase("loader");
  }, []);

  const handleLoaderDone = React.useCallback(() => {
    setPhase("portfolio");
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          phase === "entry" ? (
            <EntryExperience language={language} onEnter={handleEntryDone} />
          ) : phase === "loader" ? (
            <Loader onDone={handleLoaderDone} />
          ) : (
            <Portfolio />
          )
        }
      />

      <Route
        path="/projects/:id"
        element={
          <Suspense
            fallback={
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--bg-color)",
                  color: "var(--text-primary)",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Loading Project...
              </div>
            }
          >
            <ProjectDetail />
          </Suspense>
        }
      />

      <Route
        path="/admin"
        element={
          <Suspense
            fallback={
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#05070b",
                  color: "#fff",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Loading Admin...
              </div>
            }
          >
            <AdminDashboard />
          </Suspense>
        }
      />
    </Routes>
  );
}
