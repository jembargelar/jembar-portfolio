import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, Minus, Plus } from "lucide-react";

export default function PdfCanvasViewer({ url, watermark }) {
  const canvasRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let loadingTask;
    async function load() {
      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/legacy/build/pdf.worker.mjs", import.meta.url).toString();
        loadingTask = pdfjs.getDocument({ url, disableAutoFetch: false, disableStream: false });
        const loaded = await loadingTask.promise;
        if (!cancelled) setPdf(loaded);
      } catch {
        if (!cancelled) setError("PDF tidak dapat ditampilkan.");
      }
    }
    load();
    return () => { cancelled = true; loadingTask?.destroy(); };
  }, [url]);

  useEffect(() => {
    let renderTask;
    async function render() {
      if (!pdf || !canvasRef.current) return;
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d", { alpha: false });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      renderTask = page.render({ canvasContext: context, viewport });
      await renderTask.promise;
    }
    render();
    return () => renderTask?.cancel();
  }, [pdf, pageNumber, scale]);

  if (error) return <div className="document-viewer__state document-viewer__state--error">{error}</div>;
  if (!pdf) return <div className="document-viewer__state"><Loader2 className="animate-spin" size={24} />Memuat PDF…</div>;

  return <div className="pdf-canvas-viewer">
    <div className="pdf-canvas-viewer__controls">
      <button type="button" onClick={() => setPageNumber((value) => Math.max(1, value - 1))} disabled={pageNumber === 1} aria-label="Previous page"><ChevronLeft size={18} /></button>
      <span>{pageNumber} / {pdf.numPages}</span>
      <button type="button" onClick={() => setPageNumber((value) => Math.min(pdf.numPages, value + 1))} disabled={pageNumber === pdf.numPages} aria-label="Next page"><ChevronRight size={18} /></button>
      <button type="button" onClick={() => setScale((value) => Math.max(0.7, value - 0.2))} aria-label="Zoom out"><Minus size={17} /></button>
      <button type="button" onClick={() => setScale((value) => Math.min(2.4, value + 0.2))} aria-label="Zoom in"><Plus size={17} /></button>
    </div>
    <div className="pdf-canvas-viewer__canvas-wrap"><canvas ref={canvasRef} /><span className="document-viewer__watermark">{watermark || "JEMBAR.DEV • PORTFOLIO"}</span></div>
  </div>;
}
