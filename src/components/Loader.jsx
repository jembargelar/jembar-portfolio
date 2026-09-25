import { useEffect, useState } from "react";

const FILL_MS = 1300;
const EXIT_MS = 620;

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const ease = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const start = performance.now();
    let raf;

    const tick = (now) => {
      const t = Math.min((now - start) / FILL_MS, 1);
      setPct(Math.round(ease(t) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        window.setTimeout(() => onDone?.(), EXIT_MS);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`jembar-loader ${exiting ? "jembar-loader-exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <style>{`
        .jembar-loader {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: #05070b;
          border-radius: 0 0 2rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          overflow: hidden;
          color: #f8fafc;
          font-family: inherit;
        }
        .jembar-loader-exit {
          animation: jembarLoaderUp ${EXIT_MS}ms cubic-bezier(.22,.9,.32,1) forwards;
        }
        .jembar-loader-exit > * {
          animation: jembarLoaderFade 450ms ease forwards;
        }
        .jembar-loader-brand {
          display: flex;
          align-items: center;
          gap: .6rem;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -.01em;
        }
        .jembar-loader-brand-dot {
          color: var(--accent, #22d3ee);
        }
        .jembar-loader-mark {
          width: 1.875rem;
          height: 1.875rem;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent, #22d3ee), var(--primary, #3B82F6));
          box-shadow: 0 0 12px rgba(34, 211, 238, .35);
        }
        .jembar-loader-tagline {
          color: var(--text-secondary, #94a3b8);
          font-size: .875rem;
          max-width: 22rem;
          text-align: center;
          line-height: 1.6;
          padding: 0 1rem;
          margin: 0;
        }
        .jembar-loader-barwrap {
          width: min(22rem, 70vw);
          height: 2px;
          background: rgba(255,255,255,.08);
          border-radius: 2px;
          overflow: hidden;
        }
        .jembar-loader-barfill {
          height: 100%;
          background: var(--accent, #22d3ee);
          border-radius: 2px;
          box-shadow: 0 0 12px rgba(34,211,238,.6);
          transition: width .08s linear;
        }
        .jembar-loader-count {
          font-variant-numeric: tabular-nums;
          font-size: .8rem;
          color: var(--accent, #22d3ee);
          letter-spacing: .18em;
        }
        @keyframes jembarLoaderUp {
          to { transform: translateY(-100%); }
        }
        @keyframes jembarLoaderFade {
          to { opacity: 0; transform: translateY(-14px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jembar-loader-exit,
          .jembar-loader-exit > * {
            animation: none !important;
          }
        }
      `}</style>

      <div className="jembar-loader-brand">
        <span className="jembar-loader-mark" aria-hidden="true" />
        Jembar<span className="jembar-loader-brand-dot">.dev</span>
      </div>

      <p className="jembar-loader-tagline">
        Membangun solusi digital untuk operasional bisnis modern.
      </p>

      <div className="jembar-loader-barwrap">
        <div
          className="jembar-loader-barfill"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="jembar-loader-count">
        {String(pct).padStart(3, "0")}
      </div>
    </div>
  );
}
