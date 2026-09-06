import { useEffect, useState } from "react";
import {
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";

const emptyForm = {
  email: "jembargelar@gmail.com",
  phone: "",
  whatsapp: "",
  github: "https://github.com/jembargelar",
  linkedin: "https://linkedin.com/in/jembargelar",
  instagram: "",
  location_id: "Garut, Jawa Barat, Indonesia",
  location_en: "Garut, West Java, Indonesia",
  contact_title_id: "Mari Bangun Sesuatu",
  contact_title_en: "Let's Build Something",
  contact_description_id:
    "Terbuka untuk peluang kerja, kolaborasi, dan project digital.",
  contact_description_en:
    "Open to job opportunities, collaborations, and digital projects.",
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
  outline: "none",
};

export default function SocialContactManager() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(error);
      setError(
        "Gagal mengambil Social & Contact: " +
          error.message
      );
    } else if (data) {
      setForm({
        ...emptyForm,
        ...data,
      });
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

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");

    const { data: existing } = await supabase
      .from("social_links")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const payload = {
      email: form.email.trim(),
      phone: form.phone.trim(),
      whatsapp: form.whatsapp.trim(),
      github: form.github.trim(),
      linkedin: form.linkedin.trim(),
      instagram: form.instagram.trim(),
      location_id: form.location_id.trim(),
      location_en: form.location_en.trim(),
      contact_title_id: form.contact_title_id.trim(),
      contact_title_en: form.contact_title_en.trim(),
      contact_description_id:
        form.contact_description_id.trim(),
      contact_description_en:
        form.contact_description_en.trim(),
      is_active: Boolean(form.is_active),
    };

    const result = existing?.id
      ? await supabase
          .from("social_links")
          .update(payload)
          .eq("id", existing.id)
      : await supabase
          .from("social_links")
          .insert(payload);

    if (result.error) {
      console.error(result.error);
      setError(
        "Gagal menyimpan Social & Contact: " +
          result.error.message
      );
    } else {
      setMessage(
        "Social & Contact berhasil disimpan."
      );
      await load();
    }

    setSaving(false);
  }

  if (loading) {
    return <div>Memuat Social & Contact...</div>;
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <Header
        title="Social & Contact"
        description="Kelola email, WhatsApp, sosial media, lokasi, dan teks contact."
        onRefresh={load}
        onSave={save}
        saving={saving}
      />

      {message && (
        <Notice type="success">
          <CheckCircle2 size={17} />
          {message}
        </Notice>
      )}

      {error && (
        <Notice type="error">
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
        <Section title="Contact">
          <Field label="Email" value={form.email} onChange={(v) => update("email", v)} />
          <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />
          <Field label="WhatsApp" value={form.whatsapp} onChange={(v) => update("whatsapp", v)} />
        </Section>

        <Section title="Social Media">
          <Field label="GitHub" value={form.github} onChange={(v) => update("github", v)} />
          <Field label="LinkedIn" value={form.linkedin} onChange={(v) => update("linkedin", v)} />
          <Field label="Instagram" value={form.instagram} onChange={(v) => update("instagram", v)} />
        </Section>

        <Section title="Location">
          <Field label="Location Indonesia" value={form.location_id} onChange={(v) => update("location_id", v)} />
          <Field label="Location English" value={form.location_en} onChange={(v) => update("location_en", v)} />
        </Section>

        <Section title="Contact Copy">
          <Field label="Title Indonesia" value={form.contact_title_id} onChange={(v) => update("contact_title_id", v)} />
          <Field label="Title English" value={form.contact_title_en} onChange={(v) => update("contact_title_en", v)} />
          <TextArea label="Description Indonesia" value={form.contact_description_id} onChange={(v) => update("contact_description_id", v)} />
          <TextArea label="Description English" value={form.contact_description_en} onChange={(v) => update("contact_description_en", v)} />
        </Section>
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 18,
          color: "var(--text-secondary)",
        }}
      >
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) =>
            update("is_active", e.target.checked)
          }
        />
        Tampilkan data contact di website
      </label>
    </div>
  );
}

function Header({
  title,
  description,
  onRefresh,
  onSave,
  saving,
}) {
  return (
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
          {title}
        </h2>
        <p
          style={{
            margin: 0,
            color: "var(--text-secondary)",
          }}
        >
          {description}
        </p>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={onRefresh} style={btn()}>
          <RefreshCw size={15} />
          Refresh
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          style={btn(true)}
        >
          <Save size={15} />
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,.08)",
        background: "rgba(255,255,255,.035)",
      }}
    >
      <h3
        style={{
          margin: "0 0 16px",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h3>
      <div style={{ display: "grid", gap: 13 }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label>
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
    <label>
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

function Notice({ type, children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 12,
        marginBottom: 15,
        borderRadius: 10,
        color:
          type === "success"
            ? "#10b981"
            : "#f87171",
        background:
          type === "success"
            ? "rgba(16,185,129,.08)"
            : "rgba(248,113,113,.08)",
      }}
    >
      {children}
    </div>
  );
}

function btn(primary = false) {
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
