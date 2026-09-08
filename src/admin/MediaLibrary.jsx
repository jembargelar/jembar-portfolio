import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Image as ImageIcon,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";
import {
  assertImageNotReferenced,
} from "../utils/imageReferences";
import {
  optimizeImage,
  formatImageSize,
} from "../utils/imageOptimizer";
import "./MediaLibrary.css";

const BUCKET = "project-images";

const ROOT_PREFIXES = [
  "media",
  "profile",
  "about",
  "projects",
  "support",
];

const IMAGE_EXTENSIONS = /\.(avif|gif|jpe?g|png|webp)$/i;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function isImageFile(file) {
  if (file.metadata?.mimetype?.startsWith("image/")) return true;
  return IMAGE_EXTENSIONS.test(file.name || "");
}

function getPublicUrl(path) {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data?.publicUrl || "";
}

function normalizePath(prefix, name) {
  return prefix ? `${prefix}/${name}` : name;
}

async function listRecursive(prefix) {
  const results = [];
  const queue = [prefix];

  while (queue.length) {
    const current = queue.shift();

    const { data, error } = await supabase.storage.from(BUCKET).list(current, {
      limit: 100,
      sortBy: {
        column: "name",
        order: "asc",
      },
    });

    if (error) throw error;

    for (const item of data || []) {
      const path = normalizePath(current, item.name);

      if (item.id === null) {
        queue.push(path);
        continue;
      }

      if (isImageFile(item)) {
        results.push({
          name: item.name,
          path,
          size: Number(item.metadata?.size || 0),
          mimeType: item.metadata?.mimetype || "",
          updatedAt: item.updated_at || item.created_at || "",
          url: getPublicUrl(path),
        });
      }
    }
  }

  return results;
}

export default function MediaLibrary({ onSelect, selectable = false }) {
  const inputRef = useRef(null);

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setBusy(true);
    setError("");

    try {
      const collections = await Promise.all(
        ROOT_PREFIXES.map((prefix) => listRecursive(prefix))
      );

      const merged = collections
        .flat()
        .filter(
          (item, index, array) =>
            array.findIndex((candidate) => candidate.path === item.path) ===
            index
        )
        .sort((a, b) => {
          const aTime = a.updatedAt ? Date.parse(a.updatedAt) : 0;
          const bTime = b.updatedAt ? Date.parse(b.updatedAt) : 0;
          return bTime - aTime;
        });

      setItems(merged);
    } catch (err) {
      setError(err?.message || "Gagal memuat media.");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return items;

    return items.filter((item) =>
      `${item.name} ${item.path}`.toLowerCase().includes(query)
    );
  }, [items, search]);

  async function handleUpload(event) {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    setUploading(true);
    setError("");
    setNotice("");

    const results = [];

    try {
      for (const file of files) {
        try {
          if (!file.type.startsWith("image/")) {
            throw new Error("bukan file gambar");
          }

          if (file.size > MAX_FILE_SIZE) {
            throw new Error("ukuran melebihi 5 MB");
          }

          const optimized = await optimizeImage(file);

          const fileName = `media/${Date.now()}-${crypto.randomUUID()}.webp`;

          const { error: uploadError } = await supabase.storage
            .from(BUCKET)
            .upload(fileName, optimized, {
              upsert: false,
              contentType: "image/webp",
              cacheControl: "31536000",
            });

          if (uploadError) throw uploadError;

          results.push(`${file.name}: berhasil`);
        } catch (err) {
          results.push(`${file.name}: ${err?.message || "gagal"}`);
        }
      }

      setNotice(results.join(" • "));
      await load();
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleSelect(item) {
    if (!selectable || !onSelect) return;

    onSelect(item);
  }

  async function handleDelete(item) {
    setDeleting(item.path);
    setError("");
    setNotice("");

    try {
      try {
        await assertImageNotReferenced(item.path);
      } catch (referenceError) {
        setError(
          `Tidak bisa menghapus "${item.name}".\n\n${referenceError?.message || "Gambar masih digunakan oleh bagian website."}`
        );
        return;
      }

      const confirmed = window.confirm(
        `Hapus gambar ini?\n\n${item.name}\n${item.path}\n\nFile akan dihapus permanen dari Media Library.`
      );

      if (!confirmed) return;

      const { error: deleteError } = await supabase.storage
        .from(BUCKET)
        .remove([item.path]);

      if (deleteError) throw deleteError;

      setNotice(`${item.name}: berhasil dihapus.`);
      setItems((current) =>
        current.filter((candidate) => candidate.path !== item.path)
      );
    } catch (err) {
      setError(
        `Gagal memeriksa/menghapus ${item.name}: ${
          err?.message || "terjadi kesalahan."
        }`
      );
    } finally {
      setDeleting("");
    }
  }

  return (
    <section className="media-library">
      <div className="media-library-header">
        <div>
          <div className="media-library-title-row">
            <ImageIcon size={20} />
            <h2>Media Library</h2>
          </div>

          <p>
            Kelola gambar website dari satu tempat. File tersimpan di
            project-images.
          </p>
        </div>

        <div className="media-library-actions">
          <button
            type="button"
            className="media-library-button secondary"
            onClick={load}
            disabled={busy || uploading}
          >
            <RefreshCw size={16} className={busy ? "is-spinning" : ""} />
            Refresh
          </button>

          <button
            type="button"
            className="media-library-button primary"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload"}
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleUpload}
          />
        </div>
      </div>

      <div className="media-library-toolbar">
        <div className="media-library-search">
          <Search size={17} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari nama file atau path..."
          />

          {search && (
            <button
              type="button"
              aria-label="Hapus pencarian"
              onClick={() => setSearch("")}
            >
              <X size={15} />
            </button>
          )}
        </div>

        <span className="media-library-count">
          {filteredItems.length} gambar
        </span>
      </div>

      {error && <div className="media-library-message error">{error}</div>}

      {notice && (
        <div className="media-library-message success">{notice}</div>
      )}

      {busy ? (
        <div className="media-library-empty">
          <RefreshCw size={22} className="is-spinning" />
          <span>Memuat media...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="media-library-empty">
          <ImageIcon size={30} />
          <strong>Tidak ada gambar ditemukan</strong>
          <span>
            {search
              ? "Coba kata pencarian lain."
              : "Belum ada gambar yang tersedia."}
          </span>
        </div>
      ) : (
        <div className="media-library-grid">
          {filteredItems.map((item) => (
            <article
              key={item.path}
              className={`media-library-card ${
                selectable ? "is-selectable" : ""
              }`}
              onClick={() => selectable && handleSelect(item)}
              onKeyDown={(event) => {
                if (
                  selectable &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  handleSelect(item);
                }
              }}
              role={selectable ? "button" : undefined}
              tabIndex={selectable ? 0 : undefined}
            >
              <div className="media-library-preview">
                <img
                  src={item.url}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="media-library-card-body">
                <strong title={item.name}>{item.name}</strong>

                <span title={item.path}>{item.path}</span>

                <small>
                  {item.size
                    ? formatImageSize(item.size)
                    : "Ukuran tidak tersedia"}
                </small>
              </div>

              <div className="media-library-card-actions">
                {selectable && (
                  <button
                    type="button"
                    className="media-library-select-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleSelect(item);
                    }}
                  >
                    Pilih gambar
                  </button>
                )}

                <button
                  type="button"
                  className="media-library-delete-button"
                  aria-label={`Hapus ${item.name}`}
                  title={`Hapus ${item.name}`}
                  disabled={deleting === item.path}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(item);
                  }}
                >
                  <Trash2 size={15} />
                  {deleting === item.path ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
