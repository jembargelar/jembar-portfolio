import React, { Suspense, lazy } from "react";
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
import EntryExperience from "./components/EntryExperience";
import SupportMyWork from "./components/SupportMyWork";
import SiteMeta from "./components/SiteMeta";

const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));

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
    </>
  );
}
