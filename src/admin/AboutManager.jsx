import { useEffect, useState } from "react";
import {
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";

const emptyForm = {
  title_id: "Administrasi × Bisnis × Teknologi",
  title_en: "Administration × Business × Technology",
  description_id:
    "Bukan cuma bikin website. Fokus pada solusi digital yang benar-benar bisa dipakai bisnis.",
  description_en:
    "More than just building websites. Focused on practical digital solutions that businesses can actually use.",
  highlight_id: "Teliti & Dapat Diandalkan",
  highlight_en: "Reliable & Detail-Oriented",
  image_url: "",
  is_active: true,
};

export default function AboutManager() {
  const [form, setForm] = useState(emptyForm);
  const [recordId, setRecordId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadAbout() {
    setLoading(true);
    setError("");
    setMessage("");

    const { data, error } = await supabase
      .from("about_content")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data) {
      setRecordId(data.id);
      setForm({
        title_id: data.title_id || "",
        title_en: data.title_en || "",
        description_id: data.description_id || "",
        description_en: data.description_en || "",
        highlight_id: data.highlight_id || "",
        highlight_en: data.highlight_en || "",
        image_url: data.image_url || "",
        is_active: data.is_active ?? true,
      });
    }

    setLoading(false);
  }

  useEffect(() => {
    loadAbout();
  }, []);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 5 MB.");
      return;
    }

    setUploading(true);
    setError("");
    setMessage("");

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `about/${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error(uploadError);
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    setForm((prev) => ({
      ...prev,
      image_url: publicUrl,
    }));

    setMessage("Gambar berhasil diupload. Klik Save About untuk menyimpan.");
    setUploading(false);
  }

  async function handleSave(event) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    const payload = {
      title_id: form.title_id.trim(),
      title_en: form.title_en.trim(),
      description_id: form.description_id.trim(),
      description_en: form.description_en.trim(),
      highlight_id: form.highlight_id.trim(),
      highlight_en: form.highlight_en.trim(),
      image_url: form.image_url.trim(),
      is_active: form.is_active,
    };

    let result;

    if (recordId) {
      result = await supabase
        .from("about_content")
        .update(payload)
        .eq("id", recordId)
        .select()
        .single();
    } else {
      result = await supabase
        .from("about_content")
        .insert(payload)
        .select()
        .single();
    }

    if (result.error) {
      console.error(result.error);
      setError(result.error.message);
      setSaving(false);
      return;
    }

    if (result.data?.id) {
      setRecordId(result.data.id);
    }

    setForm((prev) => ({
      ...prev,
      ...payload,
    }));

    setMessage("About berhasil disimpan.");
    setSaving(false);
  }

  if (loading) {
    return (
      <div style={styles.loading}>
        <RefreshCw size={20} className="spin" />
        <span>Memuat About CMS...</span>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <div style={styles.eyebrow}>CONTENT MANAGEMENT</div>
          <h2 style={styles.title}>About</h2>
          <p style={styles.subtitle}>
            Kelola konten utama section About tanpa mengubah kode website.
          </p>
        </div>

        <button
          type="button"
          onClick={loadAbout}
          style={styles.secondaryButton}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {message && (
        <div style={styles.success}>
          <CheckCircle2 size={18} />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div style={styles.error}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div style={styles.grid}>
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h3 style={styles.cardTitle}>Bahasa Indonesia</h3>
                <p style={styles.cardSubtitle}>
                  Konten yang tampil ketika website menggunakan Bahasa Indonesia.
                </p>
              </div>
            </div>

            <label style={styles.label}>
              Title
              <input
                value={form.title_id}
                onChange={(e) => updateField("title_id", e.target.value)}
                placeholder="Administrasi × Bisnis × Teknologi"
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Description
              <textarea
                value={form.description_id}
                onChange={(e) =>
                  updateField("description_id", e.target.value)
                }
                rows={5}
                placeholder="Deskripsi About..."
                style={styles.textarea}
              />
            </label>

            <label style={styles.label}>
              Highlight
              <input
                value={form.highlight_id}
                onChange={(e) =>
                  updateField("highlight_id", e.target.value)
                }
                placeholder="Teliti & Dapat Diandalkan"
                style={styles.input}
              />
            </label>
          </section>

          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h3 style={styles.cardTitle}>English</h3>
                <p style={styles.cardSubtitle}>
                  Content displayed when the website uses English.
                </p>
              </div>
            </div>

            <label style={styles.label}>
              Title
              <input
                value={form.title_en}
                onChange={(e) => updateField("title_en", e.target.value)}
                placeholder="Administration × Business × Technology"
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Description
              <textarea
                value={form.description_en}
                onChange={(e) =>
                  updateField("description_en", e.target.value)
                }
                rows={5}
                placeholder="About description..."
                style={styles.textarea}
              />
            </label>

            <label style={styles.label}>
              Highlight
              <input
                value={form.highlight_en}
                onChange={(e) =>
                  updateField("highlight_en", e.target.value)
                }
                placeholder="Reliable & Detail-Oriented"
                style={styles.input}
              />
            </label>
          </section>
        </div>

        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h3 style={styles.cardTitle}>About Image</h3>
              <p style={styles.cardSubtitle}>
                Upload gambar langsung dari perangkat Admin.
              </p>
            </div>
          </div>

          <div style={styles.imageLayout}>
            <div style={styles.preview}>
              {form.image_url ? (
                <img
                  src={form.image_url}
                  alt="About preview"
                  style={styles.previewImage}
                />
              ) : (
                <div style={styles.emptyImage}>
                  <ImageIcon size={30} />
                  <span>Belum ada gambar</span>
                </div>
              )}
            </div>

            <div style={styles.imageActions}>
              <label style={styles.uploadButton}>
                <Upload size={17} />
                {uploading ? "Uploading..." : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  style={{ display: "none" }}
                />
              </label>

              {form.image_url && (
                <button
                  type="button"
                  onClick={() => updateField("image_url", "")}
                  style={styles.secondaryButton}
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </section>

        <section style={styles.card}>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => updateField("is_active", e.target.checked)}
            />
            <span>Aktifkan About Content</span>
          </label>
        </section>

        <div style={styles.footer}>
          <button
            type="submit"
            disabled={saving || uploading}
            style={{
              ...styles.saveButton,
              opacity: saving || uploading ? 0.6 : 1,
            }}
          >
            <Save size={17} />
            {saving ? "Menyimpan..." : "Save About"}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "1100px",
  },
  loading: {
    minHeight: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    color: "var(--text-secondary)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "24px",
  },
  eyebrow: {
    fontSize: "0.72rem",
    fontWeight: "800",
    letterSpacing: "0.14em",
    color: "var(--accent)",
    marginBottom: "8px",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: "800",
    color: "var(--text-primary)",
  },
  subtitle: {
    margin: "8px 0 0",
    color: "var(--text-secondary)",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "var(--card-bg, rgba(255,255,255,0.04))",
    border: "1px solid var(--border, rgba(255,255,255,0.08))",
    borderRadius: "18px",
    padding: "22px",
    marginBottom: "20px",
    backdropFilter: "blur(12px)",
  },
  cardHeader: {
    marginBottom: "20px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.05rem",
    fontWeight: "750",
    color: "var(--text-primary)",
  },
  cardSubtitle: {
    margin: "6px 0 0",
    color: "var(--text-secondary)",
    fontSize: "0.85rem",
    lineHeight: 1.5,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "18px",
    color: "var(--text-primary)",
    fontSize: "0.88rem",
    fontWeight: "650",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid var(--border, rgba(255,255,255,0.1))",
    borderRadius: "10px",
    padding: "12px 13px",
    background: "rgba(0,0,0,0.12)",
    color: "var(--text-primary)",
    outline: "none",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    resize: "vertical",
    border: "1px solid var(--border, rgba(255,255,255,0.1))",
    borderRadius: "10px",
    padding: "12px 13px",
    background: "rgba(0,0,0,0.12)",
    color: "var(--text-primary)",
    outline: "none",
    fontFamily: "inherit",
    lineHeight: 1.6,
  },
  imageLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(180px, 260px) 1fr",
    gap: "20px",
    alignItems: "center",
  },
  preview: {
    aspectRatio: "4 / 3",
    borderRadius: "14px",
    overflow: "hidden",
    background: "rgba(0,0,0,0.15)",
    border: "1px solid var(--border, rgba(255,255,255,0.08))",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  emptyImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    color: "var(--text-secondary)",
    fontSize: "0.82rem",
  },
  imageActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  uploadButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
    border: "1px solid rgba(59,130,246,0.3)",
    borderRadius: "10px",
    padding: "11px 15px",
    background: "rgba(59,130,246,0.12)",
    color: "var(--text-primary)",
    fontWeight: "700",
    fontSize: "0.85rem",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    border: "1px solid var(--border, rgba(255,255,255,0.1))",
    borderRadius: "10px",
    padding: "10px 14px",
    background: "transparent",
    color: "var(--text-primary)",
    cursor: "pointer",
    fontWeight: "650",
  },
  success: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    borderRadius: "12px",
    marginBottom: "18px",
    background: "rgba(16,185,129,0.1)",
    border: "1px solid rgba(16,185,129,0.25)",
    color: "#10b981",
  },
  error: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    borderRadius: "12px",
    marginBottom: "18px",
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.25)",
    color: "#ef4444",
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "var(--text-primary)",
    fontWeight: "650",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: "20px",
  },
  saveButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    border: 0,
    borderRadius: "11px",
    padding: "12px 18px",
    background: "var(--accent)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "750",
  },
};
