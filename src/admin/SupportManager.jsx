import { useEffect, useState } from "react";
import {
  Save,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";
import {
  optimizeImage,
  formatImageSize,
} from "../utils/imageOptimizer";

const emptyForm = {
  title_id: "Support My Work",
  title_en: "Support My Work",
  description_id:
    "Jika karya saya bermanfaat, kamu bisa mendukung pengembangan project berikutnya.",
  description_en:
    "If my work is useful to you, you can support the development of future projects.",
  qris_image_url: "",
  payment_name: "",
  payment_number: "",
  is_active: true,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,.1)",
  background: "rgba(255,255,255,.04)",
  color: "var(--text-primary)",
};

export default function SupportManager() {
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("support_content")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(error);
      setError(
        "Gagal mengambil Support My Work: " +
          error.message
      );
    } else if (data) {
      setForm({
        ...emptyForm,
        ...data,
      });
      setPreview(data.qris_image_url || "");
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function update(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran QRIS maksimal 5 MB.");
      return;
    }

    setError("");
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");

    let imageUrl = form.qris_image_url || "";
    let uploadedPath = null;

    try {
      if (imageFile) {
        const optimized = await optimizeImage(imageFile);

        console.info(
          `[Image Optimizer] QRIS: ${formatImageSize(
            imageFile.size
          )} → ${formatImageSize(optimized.size)}`
        );

        uploadedPath = `support/${Date.now()}-qris.webp`;

        const { error: uploadError } =
          await supabase.storage
            .from("project-images")
            .upload(uploadedPath, optimized, {
              cacheControl: "31536000",
              upsert: false,
              contentType: "image/webp",
            });

        if (uploadError) {
          throw new Error(
            "Upload QRIS gagal: " +
              uploadError.message
          );
        }

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("project-images")
          .getPublicUrl(uploadedPath);

        imageUrl = publicUrl;
      }

      const { data: existing } = await supabase
        .from("support_content")
        .select("id,qris_image_url")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const payload = {
        title_id: form.title_id.trim(),
        title_en: form.title_en.trim(),
        description_id:
          form.description_id.trim(),
        description_en:
          form.description_en.trim(),
        qris_image_url: imageUrl,
        payment_name: form.payment_name.trim(),
        payment_number:
          form.payment_number.trim(),
        is_active: Boolean(form.is_active),
      };

      const result = existing?.id
        ? await supabase
            .from("support_content")
            .update(payload)
            .eq("id", existing.id)
        : await supabase
            .from("support_content")
            .insert(payload);

      if (result.error) {
        if (uploadedPath) {
          await supabase.storage
            .from("project-images")
            .remove([uploadedPath]);
        }

        throw new Error(
          "Data Support gagal disimpan: " +
            result.error.message
        );
      }

      setForm((prev) => ({
        ...prev,
        qris_image_url: imageUrl,
      }));
      setImageFile(null);
      setPreview(imageUrl);
      setMessage(
        "Support My Work berhasil disimpan."
      );
    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div>Memuat Support My Work...</div>;
  }

  return (
    <div style={{ width: "100%", maxWidth: 1100 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <div>
          <div
            style={{
              color: "var(--accent)",
              fontSize: ".75rem",
              fontWeight: 800,
              letterSpacing: ".12em",
            }}
          >
            CMS
          </div>
          <h2
            style={{
              margin: "5px 0 6px",
              color: "var(--text-primary)",
              fontSize: "1.8rem",
            }}
          >
            Support My Work
          </h2>
          <p
            style={{
              margin: 0,
              color: "var(--text-secondary)",
            }}
          >
            Kelola teks dukungan dan QRIS langsung dari Admin.
          </p>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={load}
            style={buttonStyle()}
          >
            <RefreshCw size={15} />
            Refresh
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            style={buttonStyle(true)}
          >
            <Save size={15} />
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>

      {message && (
        <Notice success>
          <CheckCircle2 size={17} />
          {message}
        </Notice>
      )}

      {error && (
        <Notice>
          <AlertCircle size={17} />
          {error}
        </Notice>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: 16,
        }}
      >
        <div style={panelStyle}>
          <h3 style={headingStyle}>Content</h3>

          <Field
            label="Title Indonesia"
            value={form.title_id}
            onChange={(v) => update("title_id", v)}
          />

          <Field
            label="Title English"
            value={form.title_en}
            onChange={(v) => update("title_en", v)}
          />

          <TextArea
            label="Description Indonesia"
            value={form.description_id}
            onChange={(v) =>
              update("description_id", v)
            }
          />

          <TextArea
            label="Description English"
            value={form.description_en}
            onChange={(v) =>
              update("description_en", v)
            }
          />

          <Field
            label="Nama Pembayaran"
            value={form.payment_name}
            onChange={(v) =>
              update("payment_name", v)
            }
          />

          <Field
            label="Nomor Pembayaran"
            value={form.payment_number}
            onChange={(v) =>
              update("payment_number", v)
            }
          />

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "var(--text-secondary)",
            }}
          >
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                update(
                  "is_active",
                  e.target.checked
                )
              }
            />
            Tampilkan Support My Work
          </label>
        </div>

        <div style={panelStyle}>
          <h3 style={headingStyle}>QRIS</h3>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              minHeight: 300,
              padding: 20,
              borderRadius: 14,
              border: "1px dashed rgba(255,255,255,.15)",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={{ display: "none" }}
            />

            <Upload size={25} />

            <strong>
              Tap untuk upload QRIS
            </strong>

            <small
              style={{
                color: "var(--text-secondary)",
              }}
            >
              JPG, PNG, WEBP • Maks. 5 MB
            </small>

            {preview && (
              <img
                src={preview}
                alt="QRIS preview"
                style={{
                  maxWidth: "230px",
                  maxHeight: "230px",
                  objectFit: "contain",
                  borderRadius: 12,
                  marginTop: 8,
                }}
              />
            )}
          </label>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label style={{ display: "block", marginBottom: 13 }}>
      <span
        style={{
          display: "block",
          marginBottom: 7,
          color: "var(--text-secondary)",
          fontSize: ".78rem",
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    </label>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <label style={{ display: "block", marginBottom: 13 }}>
      <span
        style={{
          display: "block",
          marginBottom: 7,
          color: "var(--text-secondary)",
          fontSize: ".78rem",
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <textarea
        rows={4}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...inputStyle,
          resize: "vertical",
        }}
      />
    </label>
  );
}

function Notice({ success, children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 12,
        marginBottom: 15,
        borderRadius: 10,
        color: success ? "#10b981" : "#f87171",
        background: success
          ? "rgba(16,185,129,.08)"
          : "rgba(248,113,113,.08)",
      }}
    >
      {children}
    </div>
  );
}

function buttonStyle(primary = false) {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: "10px 13px",
    borderRadius: 10,
    border:
      "1px solid " +
      (primary
        ? "rgba(34,211,238,.35)"
        : "rgba(255,255,255,.1)"),
    background: primary
      ? "rgba(34,211,238,.1)"
      : "rgba(255,255,255,.04)",
    color: primary
      ? "var(--accent)"
      : "var(--text-primary)",
    cursor: "pointer",
    fontWeight: 700,
  };
}

const panelStyle = {
  padding: 20,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,.08)",
  background: "rgba(255,255,255,.035)",
};

const headingStyle = {
  margin: "0 0 16px",
  color: "var(--text-primary)",
};
