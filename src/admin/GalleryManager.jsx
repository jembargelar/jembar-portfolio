import { useCallback, useEffect, useRef, useState } from "react";
import {
  ImagePlus,
  Trash2,
  Upload,
  Loader2,
  Images,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";
import { optimizeImage, formatImageSize } from "../utils/imageOptimizer";

export default function GalleryManager({ projectId }) {
  const inputRef = useRef(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadGallery = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("gallery_items")
      .select("*")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (fetchError) {
      setError("Gallery gagal dimuat: " + fetchError.message);
      setItems([]);
    } else {
      setItems(data || []);
    }

    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  function getSafeFileName(name) {
    return name
      .normalize("NFKD")
      .replace(/[^\w.-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase();
  }

  async function uploadGallery(event) {
    const files = Array.from(event.target.files || []);

    if (!files.length || !projectId) return;

    setUploading(true);
    setError("");
    setMessage("");

    let uploadedCount = 0;

    try {
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          continue;
        }

        const optimizedImage = await optimizeImage(file);

        console.info(
          `[Image Optimizer] Gallery: ${formatImageSize(file.size)} → ${formatImageSize(optimizedImage.size)}`
        );

        const safeName = getSafeFileName(
          file.name.replace(/\.[^/.]+$/, "")
        );

        const uniqueName =
          `${Date.now()}-${crypto.randomUUID()}-${safeName}.webp`;

        const storagePath = `projects/gallery/${projectId}/${uniqueName}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(storagePath, optimizedImage, {
            cacheControl: "31536000",
            upsert: false,
            contentType: "image/webp",
          });

        if (uploadError) {
          throw new Error(
            `Upload "${file.name}" gagal: ${uploadError.message}`
          );
        }

        const { data: publicData } = supabase.storage
          .from("project-images")
          .getPublicUrl(storagePath);

        const publicUrl = publicData?.publicUrl;

        if (!publicUrl) {
          await supabase.storage
            .from("project-images")
            .remove([storagePath]);

          throw new Error(
            `URL gambar "${file.name}" gagal dibuat.`
          );
        }

        const { error: insertError } = await supabase
          .from("gallery_items")
          .insert({
            project_id: projectId,
            image_url: publicUrl,
            sort_order: items.length + uploadedCount,
            alt_text_id: "",
            alt_text_en: "",
          });

        if (insertError) {
          await supabase.storage
            .from("project-images")
            .remove([storagePath]);

          throw new Error(
            `Database gallery "${file.name}" gagal: ${insertError.message}`
          );
        }

        uploadedCount += 1;
      }

      if (uploadedCount > 0) {
        setMessage(`${uploadedCount} foto berhasil ditambahkan.`);
        await loadGallery();
      } else {
        setError("Tidak ada file gambar yang valid.");
      }
    } catch (uploadError) {
      setError(uploadError.message || "Upload gallery gagal.");
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function getStoragePath(imageUrl) {
    const marker =
      "/storage/v1/object/public/project-images/";

    const index = imageUrl.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(
      imageUrl.slice(index + marker.length)
    );
  }

  async function deleteGalleryItem(item) {
    const confirmed = window.confirm(
      "Hapus foto gallery ini?"
    );

    if (!confirmed) return;

    setDeletingId(item.id);
    setError("");
    setMessage("");

    try {
      const { error: deleteError } = await supabase
        .from("gallery_items")
        .delete()
        .eq("id", item.id);

      if (deleteError) {
        throw new Error(
          "Data gallery gagal dihapus: " +
            deleteError.message
        );
      }

      const storagePath = getStoragePath(item.image_url);

      if (storagePath) {
        const { error: storageError } =
          await supabase.storage
            .from("project-images")
            .remove([storagePath]);

        if (storageError) {
          console.warn(
            "Database terhapus, tetapi file Storage gagal dihapus:",
            storageError.message
          );
        }
      }

      setItems((current) =>
        current.filter((gallery) => gallery.id !== item.id)
      );

      setMessage("Foto gallery berhasil dihapus.");
    } catch (deleteError) {
      setError(
        deleteError.message || "Gagal menghapus foto."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div
      style={{
        marginTop: "1.5rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: ".8rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".6rem",
            }}
          >
            <Images size={19} color="#67e8f9" />

            <span
              style={{
                fontSize: "1rem",
                fontWeight: 700,
              }}
            >
              Gallery Project
            </span>
          </div>

          <p
            style={{
              margin: ".35rem 0 0",
              fontSize: ".72rem",
              lineHeight: 1.5,
              color: "rgba(255,255,255,.42)",
            }}
          >
            Tambahkan foto tambahan project langsung dari
            galeri HP.
          </p>
        </div>

        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".45rem",
            padding: ".65rem .85rem",
            borderRadius: "10px",
            cursor: uploading ? "wait" : "pointer",
            background: "rgba(34,211,238,.1)",
            border: "1px solid rgba(34,211,238,.2)",
            color: "#67e8f9",
            fontSize: ".75rem",
            fontWeight: 700,
            opacity: uploading ? 0.6 : 1,
          }}
        >
          {uploading ? (
            <Loader2 size={15} className="gallery-spin" />
          ) : (
            <ImagePlus size={15} />
          )}

          {uploading ? "Mengupload..." : "Tambah Foto"}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={uploadGallery}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {error && (
        <div
          style={{
            marginBottom: ".8rem",
            padding: ".7rem .8rem",
            borderRadius: "10px",
            background: "rgba(239,68,68,.08)",
            border: "1px solid rgba(239,68,68,.18)",
            color: "#fca5a5",
            fontSize: ".72rem",
          }}
        >
          {error}
        </div>
      )}

      {message && (
        <div
          style={{
            marginBottom: ".8rem",
            padding: ".7rem .8rem",
            borderRadius: "10px",
            background: "rgba(34,197,94,.08)",
            border: "1px solid rgba(34,197,94,.18)",
            color: "#86efac",
            fontSize: ".72rem",
          }}
        >
          {message}
        </div>
      )}

      {loading ? (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            color: "rgba(255,255,255,.4)",
            fontSize: ".75rem",
          }}
        >
          Memuat gallery...
        </div>
      ) : items.length === 0 ? (
        <div
          style={{
            padding: "2rem 1rem",
            textAlign: "center",
            borderRadius: "14px",
            border: "1px dashed rgba(255,255,255,.12)",
            color: "rgba(255,255,255,.35)",
            fontSize: ".75rem",
          }}
        >
          <Upload
            size={22}
            style={{
              display: "block",
              margin: "0 auto .6rem",
              opacity: 0.5,
            }}
          />

          Belum ada foto tambahan.
          <br />
          Klik <strong>Tambah Foto</strong> untuk memilih
          gambar dari galeri HP.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(140px, 1fr))",
            gap: ".75rem",
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                aspectRatio: "4 / 3",
                overflow: "hidden",
                borderRadius: "12px",
                background: "#0b0f16",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <img
                src={item.image_url}
                alt={
                  item.alt_text_id ||
                  item.alt_text_en ||
                  `Gallery ${index + 1}`
                }
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: ".45rem",
                  left: ".45rem",
                  padding: ".2rem .4rem",
                  borderRadius: "6px",
                  background: "rgba(0,0,0,.65)",
                  backdropFilter: "blur(6px)",
                  fontSize: ".62rem",
                  color: "#fff",
                }}
              >
                #{index + 1}
              </div>

              <button
                type="button"
                onClick={() => deleteGalleryItem(item)}
                disabled={deletingId === item.id}
                aria-label="Hapus foto"
                style={{
                  position: "absolute",
                  right: ".45rem",
                  top: ".45rem",
                  width: "30px",
                  height: "30px",
                  display: "grid",
                  placeItems: "center",
                  border: "0",
                  borderRadius: "8px",
                  cursor:
                    deletingId === item.id
                      ? "wait"
                      : "pointer",
                  background: "rgba(0,0,0,.7)",
                  color: "#fff",
                }}
              >
                {deletingId === item.id ? (
                  <Loader2
                    size={14}
                    className="gallery-spin"
                  />
                ) : (
                  <Trash2 size={14} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .gallery-spin {
          animation: gallery-spin 1s linear infinite;
        }

        @keyframes gallery-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
