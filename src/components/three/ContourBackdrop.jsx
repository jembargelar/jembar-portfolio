import { useEffect, useRef } from "react";

/**
 * Contour lines rolling across the canvas — the same analytic four-sine field
 * the Kimi spec uses, drawn by marching squares.
 */
const LINE_SCALE = 3.8;
const LINE_COUNT = 2.5;
const WAVE_AMOUNT = 0.37;
const WAVE_SPEED = 1.66;
const LINE_OPACITY = 0.85;
const CELLS = 96;

function field(x, y, t) {
  let f = Math.sin(x * 1.0 + t * 0.6) * 0.5;
  f += Math.sin(y * 0.85 - t * 0.45) * 0.45;
  f += Math.sin((x + y) * 0.65 + t * 0.35) * 0.35;
  f += Math.sin((x - y) * 0.95 - t * 0.55) * 0.25;
  return f * 0.5 + 0.5;
}

export default function ContourBackdrop({ color = "rgba(148,163,184,0.5)" }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let ratio = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
    };

    const draw = (now) => {
      if (!visibleRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      if (startRef.current === null) startRef.current = now;
      const t = ((now - startRef.current) / 1000) * WAVE_SPEED;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const cols = width >= height ? CELLS : Math.max(8, Math.round((CELLS * width) / height));
      const rows = Math.max(8, Math.round((cols * height) / width));
      const stepX = width / cols;
      const stepY = height / rows;
      const aspect = width / height;

      const values = new Float32Array((cols + 1) * (rows + 1));
      for (let j = 0; j <= rows; j += 1) {
        for (let i = 0; i <= cols; i += 1) {
          const nx = ((i / cols) * 2 - 1) * aspect * LINE_SCALE;
          const ny = ((j / rows) * 2 - 1) * LINE_SCALE;
          const qx = nx + Math.sin(ny * 0.8 + t * 0.7) * WAVE_AMOUNT;
          const qy = ny + Math.cos(nx * 0.7 - t * 0.6) * WAVE_AMOUNT;
          values[j * (cols + 1) + i] = field(qx, qy, t) * LINE_COUNT;
        }
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = LINE_OPACITY;
      ctx.beginPath();

      for (let level = 0.5; level < LINE_COUNT; level += 1) {
        for (let j = 0; j < rows; j += 1) {
          for (let i = 0; i < cols; i += 1) {
            const a = values[j * (cols + 1) + i];
            const b = values[j * (cols + 1) + i + 1];
            const c = values[(j + 1) * (cols + 1) + i + 1];
            const d = values[(j + 1) * (cols + 1) + i];
            const idx =
              (a > level ? 8 : 0) |
              (b > level ? 4 : 0) |
              (c > level ? 2 : 0) |
              (d > level ? 1 : 0);
            if (idx === 0 || idx === 15) continue;

            const x0 = i * stepX;
            const y0 = j * stepY;
            const top = [x0 + stepX * ((level - a) / (b - a || 1)), y0];
            const right = [x0 + stepX, y0 + stepY * ((level - b) / (c - b || 1))];
            const bottom = [x0 + stepX * ((level - d) / (c - d || 1)), y0 + stepY];
            const left = [x0, y0 + stepY * ((level - a) / (d - a || 1))];

            const seg = (p, q) => {
              ctx.moveTo(p[0], p[1]);
              ctx.lineTo(q[0], q[1]);
            };

            switch (idx) {
              case 1: case 14: seg(left, bottom); break;
              case 2: case 13: seg(bottom, right); break;
              case 3: case 12: seg(left, right); break;
              case 4: case 11: seg(top, right); break;
              case 6: case 9:  seg(top, bottom); break;
              case 7: case 8:  seg(left, top); break;
              case 5:  seg(left, top); seg(bottom, right); break;
              case 10: seg(left, bottom); seg(top, right); break;
            }
          }
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      visibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
