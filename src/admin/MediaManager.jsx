import { useEffect, useState } from "react";
import {
  Upload,
  Trash2,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";
import {
  optimizeImage,
  formatImageSize,
} from "../utils/imageOptimizer";

const BUCKET = "project-images";
const MEDIA_PREFIX = "media";

export default function MediaManager() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function listRecursive(prefix = "media") {
    const { data, error: listError } = await supabase.storage
      .from(BUCKET)
      .list(prefix, {
        limit: 100,
        sortBy: {
          column: "name",
          order: "asc",
        },
      });

    if (listError) {
      throw listError;
    }

    const result = [];

    for (const item of data || []) {
      if (!item.name) {
        continue;
      }

      const fullPath = prefix
        ? `${prefix}/${item.name}`
        : item.name;

      const isFolder =
        item.id === null ||
        item.metadata === null;

      if (isFolder) {
        const nested = await listRecursive(fullPath);
        result.push(...nested);
      } else {
        result.push({
          ...item,
          path: fullPath,
        });
      }
    }

    return result;
  }

  async function load() {
    setLoading(true);
    setError("");

    try {
      const allFiles = await listRecursive("media");

      const imageFiles = allFiles.filter(
        (file) =>
          file.metadata?.mimetype?.startsWith("image/") ||
          /\.(avif|gif|jpe?g|png|webp|svg)$/i.test(
            file.name
          )
      );

      setFiles(imageFiles);
    } catch (err) {
      setFiles([]);
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memuat Media Library."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function uploadFiles(event) {
    const selected = Array.from(
      event.target.files || []
    );

    if (!selected.length) {
      return;
    }

    setUploading(true);
    setMessage("");
    setError("");

    let processed = 0;

    try {
      for (const file of selected) {
        if (!file.type.startsWith("image/")) {
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          throw new Error(
            `${file.name}: ukuran maksimal 5 MB.`
          );
        }

        const optimized = await optimizeImage(file);

        const path =
          `${MEDIA_PREFIX}/${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}.webp`;

        const { error: uploadError } =
          await supabase.storage
            .from(BUCKET)
            .upload(path, optimized, {
              contentType: "image/webp",
              cacheControl: "31536000",
              upsert: false,
            });

        if (uploadError) {
          throw new Error(
            `${file.name}: ${uploadError.message}`
          );
        }

        processed += 1;
      }

      setMessage(
        `Upload berhasil. ${processed} gambar diproses.`
      );

      await load();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Upload gagal."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function removeFile(path) {
    if (
      !window.confirm(
        `Hapus file ini?\n\n${path}`
      )
    ) {
      return;
    }

    setError("");
    setMessage("");

    const { error: removeError } =
      await supabase.storage
        .from(BUCKET)
        .remove([path]);

    if (removeError) {
      setError(removeError.message);
      return;
    }

    setMessage("File berhasil dihapus.");
    await load();
  }

  function getPublicUrl(path) {
    return supabase.storage
      .from(BUCKET)
      .getPublicUrl(path)
      .data.publicUrl;
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <h2>Media Library</h2>
          <p>
            Kelola seluruh gambar yang tersimpan di
            storage portfolio.
          </p>
        </div>

        <div className="admin-form-actions">
          <label className="admin-primary-button">
            <Upload size={15} />
            {uploading
              ? "Uploading..."
              : "Upload Gambar"}

            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={uploadFiles}
              disabled={uploading}
            />
          </label>

          <button
            className="admin-secondary-button"
            onClick={load}
            disabled={loading}
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>
      </div>

      {message && (
        <div className="admin-success">
          {message}
        </div>
      )}

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {loading ? (
        <div>Memuat media...</div>
      ) : files.length === 0 ? (
        <div className="admin-empty-state">
          <ImageIcon size={28} />
          <p>
            Belum ada gambar di storage.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(180px,1fr))",
            gap: "16px",
          }}
        >
          {files.map((file) => {
            const url = getPublicUrl(file.path);

            return (
              <div
                key={file.path}
                style={{
                  border:
                    "1px solid var(--border,rgba(255,255,255,.08))",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background:
                    "rgba(255,255,255,.025)",
                }}
              >
                <img
                  src={url}
                  alt={file.path}
                  loading="lazy"
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <div style={{ padding: "12px" }}>
                  <div
                    style={{
                      fontSize: ".78rem",
                      wordBreak: "break-word",
                      color:
                        "var(--text-secondary)",
                    }}
                  >
                    {file.path}
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: ".72rem",
                      color:
                        "var(--text-secondary)",
                    }}
                  >
                    {formatImageSize(
                      file.metadata?.size || 0
                    )}
                  </div>

                  <button
                    className="admin-danger-button"
                    onClick={() =>
                      removeFile(file.path)
                    }
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <Trash2 size={14} />
                    Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
