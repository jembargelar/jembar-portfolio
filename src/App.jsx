import { useEffect, useState } from "react";
import Lenis from "lenis";
import confetti from "canvas-confetti";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // 1. Loading Screen Timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // 2. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. Mouse Move Listener for Custom Glow Cursor
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 4. Register Easter Egg Function Globally
    window.triggerEasterEgg = () => {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.2 },
        colors: ['#3B82F6', '#60A5FA', '#9333EA', '#10B981']
      });
    };

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      lenis.destroy();
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Custom Glowing Mouse Pointer */}
      <div 
        className="mouse-cursor-glow"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  );
}

