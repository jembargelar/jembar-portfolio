import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Download, Expand, Loader2, Minus, Plus, X } from "lucide-react";
import { supabase } from "../api/supabaseClient";
import "./DocumentViewer.css";

const PdfCanvasViewer = lazy(() => import("./PdfCanvasViewer"));

function viewerCopy(isEn) {
  return isEn
    ? {
        close: "Close document viewer",
        loading: "Preparing protected document…",
        error: "This document is unavailable.",
        deterrent: "Viewing is protected. Saving and screenshots cannot be completely prevented.",
        zoomOut: "Zoom out",
        zoomIn: "Zoom in",
        fullscreen: "Fullscreen",
      }
    : {
        close: "Tutup penampil dokumen",
        loading: "Menyiapkan dokumen terlindungi…",
        error: "Dokumen tidak tersedia.",
        deterrent: "Tampilan dilindungi. Penyimpanan dan tangkapan layar tidak dapat dicegah sepenuhnya.",
        zoomOut: "Perkecil",
        zoomIn: "Perbesar",
        fullscreen: "Layar penuh",
      };
}

export default function DocumentViewer({ document, isEn = false, onClose }) {
  const dialogRef = useRef(null);
  const [state, setState] = useState({ loading: true, url: "", error: "" });
  const [zoom, setZoom] = useState(1);
  const copy = viewerCopy(isEn);
  const isPdf = document.mime_type === "application/pdf";

  useEffect(() => {
    let active = true;

    async function requestAccess() {
      setState({ loading: true, url: "", error: "" });
      const { data, error } = await supabase.functions.invoke("document-access", {
        body: { documentId: document.id },
      });

      if (!active) return;
      if (error || !data?.signedUrl) {
        setState({ loading: false, url: "", error: copy.error });
        return;
      }
      setState({ loading: false, url: data.signedUrl, error: "" });
    }

    requestAccess();
    return () => {
      active = false;
    };
  }, [document.id, copy.error]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if ((event.ctrlKey || event.metaKey) && ["s", "p"].includes(event.key.toLowerCase())) {
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function toggleFullscreen() {
    if (!dialogRef.current) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await dialogRef.current.requestFullscreen?.();
  }

  return (
    <div className="document-viewer-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialogRef}
        className="document-viewer"
        role="dialog"
        aria-modal="true"
        aria-label={document.title_id || document.file_name}
        onMouseDown={(event) => event.stopPropagation()}
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
      >
        <header className="document-viewer__header">
          <div>
            <p className="document-viewer__eyebrow">{isPdf ? "PDF" : "IMAGE"}</p>
            <h2>{isEn ? document.title_en || document.title_id : document.title_id || document.title_en}</h2>
          </div>
          <div className="document-viewer__actions">
            {!isPdf && <>
              <button type="button" onClick={() => setZoom((value) => Math.max(0.5, value - 0.25))} aria-label={copy.zoomOut}><Minus size={18} /></button>
              <button type="button" onClick={() => setZoom((value) => Math.min(3, value + 0.25))} aria-label={copy.zoomIn}><Plus size={18} /></button>
            </>}
            <button type="button" onClick={toggleFullscreen} aria-label={copy.fullscreen}><Expand size={18} /></button>
            <button type="button" onClick={onClose} aria-label={copy.close}><X size={20} /></button>
          </div>
        </header>

        <div className="document-viewer__stage">
          {state.loading && <div className="document-viewer__state"><Loader2 className="animate-spin" size={24} />{copy.loading}</div>}
          {state.error && <div className="document-viewer__state document-viewer__state--error">{state.error}</div>}
          {state.url && isPdf && <Suspense fallback={<div className="document-viewer__state"><Loader2 className="animate-spin" size={24} />{copy.loading}</div>}><PdfCanvasViewer url={state.url} watermark={document.watermark} /></Suspense>}
          {state.url && !isPdf && <div className="document-viewer__image-wrap"><img src={state.url} alt={document.title_id || document.file_name} draggable="false" style={{ transform: `scale(${zoom})` }} /><span className="document-viewer__watermark">{document.watermark || "JEMBAR.DEV • PORTFOLIO"}</span></div>}
        </div>
        <footer className="document-viewer__footer"><Download size={15} />{copy.deterrent}</footer>
      </section>
    </div>
  );
}
