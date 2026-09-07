import { useEffect, useState } from "react";
import {
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";

const emptyForm = {
  site_name: "JEMBAR.DEV",
  site_title_id:
    "Jembar Gelar Kusumah Wibawa | Portfolio",
  site_title_en:
    "Jembar Gelar Kusumah Wibawa | Portfolio",
  seo_description_id:
    "Portfolio Jembar Gelar Kusumah Wibawa - Administrative Professional & Web Developer.",
  seo_description_en:
    "Portfolio of Jembar Gelar Kusumah Wibawa - Administrative Professional & Web Developer.",
  favicon_url: "/favicon.svg",
  default_language: "id",
  default_theme: "dark",
  entry_enabled: true,
  entry_kicker_id: "Digital Portfolio",
  entry_kicker_en: "Digital Portfolio",
  entry_title: "JEMBAR.DEV",
  entry_tagline_id:
    "Membangun solusi digital untuk operasional bisnis modern.",
  entry_tagline_en:
    "Building digital solutions for modern business operations.",
  entry_location_id: "GARUT · INDONESIA",
  entry_location_en: "GARUT · INDONESIA",
  entry_button_id: "MASUK",
  entry_button_en: "ENTER",
  entry_skip_returning: true,
  entry_transition_ms: 450,
  maintenance_mode: false,
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

export default function SiteSettingsManager() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(error);
      setError(
        "Gagal mengambil Site Settings: " +
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
      .from("site_settings")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const payload = {
      site_name: form.site_name.trim(),
      site_title_id: form.site_title_id.trim(),
      site_title_en: form.site_title_en.trim(),
      seo_description_id:
        form.seo_description_id.trim(),
      seo_description_en:
        form.seo_description_en.trim(),
      favicon_url: form.favicon_url.trim(),
      default_language: form.default_language,
      default_theme: form.default_theme,
      entry_enabled: form.entry_enabled,
      entry_kicker_id: form.entry_kicker_id.trim(),
      entry_kicker_en: form.entry_kicker_en.trim(),
      entry_title: form.entry_title.trim(),
      entry_tagline_id: form.entry_tagline_id.trim(),
      entry_tagline_en: form.entry_tagline_en.trim(),
      entry_location_id: form.entry_location_id.trim(),
      entry_location_en: form.entry_location_en.trim(),
      entry_button_id: form.entry_button_id.trim(),
      entry_button_en: form.entry_button_en.trim(),
      entry_skip_returning: form.entry_skip_returning,
      entry_transition_ms: Number(form.entry_transition_ms) || 450,
      maintenance_mode: Boolean(
        form.maintenance_mode
      ),
    };

    const result = existing?.id
      ? await supabase
          .from("site_settings")
          .update(payload)
          .eq("id", existing.id)
      : await supabase
          .from("site_settings")
          .insert(payload);

    if (result.error) {
      console.error(result.error);
      setError(
        "Gagal menyimpan Site Settings: " +
          result.error.message
      );
    } else {
      setMessage("Site Settings berhasil disimpan.");
      await load();
    }

    setSaving(false);
  }

  if (loading) {
    return <div>Memuat Site Settings...</div>;
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
            Site Settings
          </h2>
          <p
            style={{
              margin: 0,
              color: "var(--text-secondary)",
            }}
          >
            Kelola identitas website, SEO, bahasa, dan tema.
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
        <Panel title="Identity">
          <Field label="Site Name" value={form.site_name} onChange={(v) => update("site_name", v)} />
          <Field label="Title Indonesia" value={form.site_title_id} onChange={(v) => update("site_title_id", v)} />
          <Field label="Title English" value={form.site_title_en} onChange={(v) => update("site_title_en", v)} />
          <Field label="Favicon URL" value={form.favicon_url} onChange={(v) => update("favicon_url", v)} />
        </Panel>

        <Panel title="SEO">
          <TextArea label="SEO Description Indonesia" value={form.seo_description_id} onChange={(v) => update("seo_description_id", v)} />
          <TextArea label="SEO Description English" value={form.seo_description_en} onChange={(v) => update("seo_description_en", v)} />
        </Panel>

        <Panel title="Preferences">
          <label style={labelStyle}>
            Default Language
            <select
              value={form.default_language}
              onChange={(e) =>
                update(
                  "default_language",
                  e.target.value
                )
              }
              style={inputStyle}
            >
              <option value="id">Indonesia</option>
              <option value="en">English</option>
            </select>
          </label>

          <label style={labelStyle}>
            Default Theme
            <select
              value={form.default_theme}
              onChange={(e) =>
                update(
                  "default_theme",
                  e.target.value
                )
              }
              style={inputStyle}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </label>

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
              checked={form.maintenance_mode}
              onChange={(e) =>
                update(
                  "maintenance_mode",
                  e.target.checked
                )
              }
            />
            Maintenance Mode
          </label>
        </Panel>

        <Panel title="Entry Experience">
          <label style={labelStyle}>
            Entry Experience
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <input
                type="checkbox"
                checked={Boolean(form.entry_enabled)}
                onChange={(e) =>
                  update("entry_enabled", e.target.checked)
                }
              />
              <span>
                {form.entry_enabled ? "Aktif" : "Nonaktif"}
              </span>
            </div>
          </label>

          <Field
            label="Kicker Indonesia"
            value={form.entry_kicker_id}
            onChange={(v) => update("entry_kicker_id", v)}
          />

          <Field
            label="Kicker English"
            value={form.entry_kicker_en}
            onChange={(v) => update("entry_kicker_en", v)}
          />

          <Field
            label="Title"
            value={form.entry_title}
            onChange={(v) => update("entry_title", v)}
          />

          <TextArea
            label="Tagline Indonesia"
            value={form.entry_tagline_id}
            onChange={(v) => update("entry_tagline_id", v)}
          />

          <TextArea
            label="Tagline English"
            value={form.entry_tagline_en}
            onChange={(v) => update("entry_tagline_en", v)}
          />

          <Field
            label="Location Indonesia"
            value={form.entry_location_id}
            onChange={(v) => update("entry_location_id", v)}
          />

          <Field
            label="Location English"
            value={form.entry_location_en}
            onChange={(v) => update("entry_location_en", v)}
          />

          <Field
            label="Button Indonesia"
            value={form.entry_button_id}
            onChange={(v) => update("entry_button_id", v)}
          />

          <Field
            label="Button English"
            value={form.entry_button_en}
            onChange={(v) => update("entry_button_en", v)}
          />

          <label style={labelStyle}>
            Transition Duration (ms)
            <input
              type="number"
              min="0"
              max="5000"
              step="50"
              value={form.entry_transition_ms}
              onChange={(e) =>
                update("entry_transition_ms", e.target.value)
              }
              style={inputStyle}
            />
          </label>

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
              checked={Boolean(form.entry_skip_returning)}
              onChange={(e) =>
                update("entry_skip_returning", e.target.checked)
              }
            />
            Skip untuk returning visitor
          </label>
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, children }) {
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

      <div style={{ display: "grid", gap: 14 }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label style={labelStyle}>
      {label}
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
    <label style={labelStyle}>
      {label}
      <textarea
        rows={5}
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

const labelStyle = {
  display: "grid",
  gap: 7,
  color: "var(--text-secondary)",
  fontSize: ".78rem",
  fontWeight: 700,
};
