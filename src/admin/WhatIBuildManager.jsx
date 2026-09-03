import { useEffect, useState } from "react";
import {
  Save,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";

const emptyService = {
  title_id: "",
  title_en: "",
  description_id: "",
  description_en: "",
  icon: "Globe2",
  sort_order: 1,
  is_active: true,
};

const iconOptions = [
  "Globe2",
  "LayoutDashboard",
  "Database",
  "PanelsTopLeft",
];

export default function WhatIBuildManager() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyService);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadServices() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("build_services")
      .select(
        "id,title_id,title_en,description_id,description_en,icon,sort_order,is_active"
      )
      .order("sort_order", { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
      setServices([]);
    } else {
      setServices(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadServices();
  }, []);

  function startNew() {
    setEditingId(null);

    setForm({
      ...emptyService,
      sort_order: services.length + 1,
    });

    setMessage("");
    setError("");
  }

  function editService(service) {
    setEditingId(service.id);

    setForm({
      title_id: service.title_id || "",
      title_en: service.title_en || "",
      description_id: service.description_id || "",
      description_en: service.description_en || "",
      icon: service.icon || "Globe2",
      sort_order: service.sort_order || 0,
      is_active: service.is_active !== false,
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveService() {
    setMessage("");
    setError("");

    if (!form.title_id.trim()) {
      setError("Judul Bahasa Indonesia wajib diisi.");
      return;
    }

    if (!form.title_en.trim()) {
      setError("Judul Bahasa Inggris wajib diisi.");
      return;
    }

    setSaving(true);

    const payload = {
      title_id: form.title_id.trim(),
      title_en: form.title_en.trim(),
      description_id: form.description_id.trim(),
      description_en: form.description_en.trim(),
      icon: form.icon,
      sort_order: Number(form.sort_order) || 0,
      is_active: Boolean(form.is_active),
    };

    let result;

    if (editingId) {
      result = await supabase
        .from("build_services")
        .update(payload)
        .eq("id", editingId);
    } else {
      result = await supabase
        .from("build_services")
        .insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    setMessage(
      editingId
        ? "What I Build berhasil diperbarui."
        : "What I Build berhasil ditambahkan."
    );

    setSaving(false);
    setEditingId(null);
    setForm(emptyService);

    await loadServices();
  }

  async function deleteService(id) {
    const confirmed = window.confirm(
      "Hapus service ini? Tindakan ini tidak dapat dibatalkan."
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    const { error: deleteError } = await supabase
      .from("build_services")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setMessage("Service berhasil dihapus.");
    await loadServices();
  }

  async function toggleActive(service) {
    setError("");
    setMessage("");

    const { error: updateError } = await supabase
      .from("build_services")
      .update({
        is_active: !service.is_active,
      })
      .eq("id", service.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    await loadServices();
  }

  async function moveService(service, direction) {
    const sorted = [...services].sort(
      (a, b) => a.sort_order - b.sort_order
    );

    const index = sorted.findIndex((item) => item.id === service.id);

    const targetIndex =
      direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= sorted.length) {
      return;
    }

    const target = sorted[targetIndex];

    const currentOrder = service.sort_order;
    const targetOrder = target.sort_order;

    const first = await supabase
      .from("build_services")
      .update({ sort_order: targetOrder })
      .eq("id", service.id);

    if (first.error) {
      setError(first.error.message);
      return;
    }

    const second = await supabase
      .from("build_services")
      .update({ sort_order: currentOrder })
      .eq("id", target.id);

    if (second.error) {
      setError(second.error.message);
      await loadServices();
      return;
    }

    await loadServices();
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            }}
          >
            What I Build
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "var(--text-secondary, #94a3b8)",
            }}
          >
            Kelola service yang tampil di website tanpa coding.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={loadServices}
            style={buttonStyle("secondary")}
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            onClick={startNew}
            style={buttonStyle("primary")}
          >
            <Plus size={16} />
            Tambah
          </button>
        </div>
      </div>

      {(message || error) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 16px",
            marginBottom: "20px",
            borderRadius: "14px",
            background: error
              ? "rgba(239,68,68,.1)"
              : "rgba(34,197,94,.1)",
            border: `1px solid ${
              error
                ? "rgba(239,68,68,.25)"
                : "rgba(34,197,94,.25)"
            }`,
            color: error ? "#fca5a5" : "#86efac",
          }}
        >
          {error ? (
            <AlertCircle size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}

          <span>{error || message}</span>
        </div>
      )}

      <div
        style={{
          padding: "22px",
          borderRadius: "22px",
          border: "1px solid var(--border-color, rgba(255,255,255,.1))",
          background: "var(--card-bg, rgba(255,255,255,.04))",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            margin: "0 0 20px",
            fontSize: "1.1rem",
          }}
        >
          {editingId ? "Edit Service" : "Tambah Service"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          <Field
            label="Judul Indonesia"
            value={form.title_id}
            onChange={(value) => updateField("title_id", value)}
            placeholder="Contoh: Website"
          />

          <Field
            label="Judul English"
            value={form.title_en}
            onChange={(value) => updateField("title_en", value)}
            placeholder="Example: Websites"
          />

          <Field
            label="Deskripsi Indonesia"
            value={form.description_id}
            onChange={(value) =>
              updateField("description_id", value)
            }
            placeholder="Deskripsi service..."
            textarea
          />

          <Field
            label="Deskripsi English"
            value={form.description_en}
            onChange={(value) =>
              updateField("description_en", value)
            }
            placeholder="Service description..."
            textarea
          />

          <div>
            <label style={labelStyle}>Icon</label>

            <select
              value={form.icon}
              onChange={(event) =>
                updateField("icon", event.target.value)
              }
              style={inputStyle}
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>

          <Field
            label="Urutan"
            type="number"
            value={form.sort_order}
            onChange={(value) => updateField("sort_order", value)}
          />
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "18px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(event) =>
              updateField("is_active", event.target.checked)
            }
          />

          <span>Aktif dan tampil di website</span>
        </label>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "22px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={saveService}
            disabled={saving}
            style={buttonStyle("primary")}
          >
            <Save size={16} />
            {saving ? "Menyimpan..." : "Simpan"}
          </button>

          {editingId && (
            <button
              onClick={startNew}
              style={buttonStyle("secondary")}
            >
              Batal
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: "14px",
        }}
      >
        {loading ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "var(--text-secondary, #94a3b8)",
            }}
          >
            Memuat service...
          </div>
        ) : services.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              borderRadius: "18px",
              border: "1px solid var(--border-color, rgba(255,255,255,.1))",
            }}
          >
            Belum ada service.
          </div>
        ) : (
          services.map((service, index) => (
            <div
              key={service.id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "auto minmax(0, 1fr) auto",
                gap: "16px",
                alignItems: "center",
                padding: "18px",
                borderRadius: "18px",
                border: "1px solid var(--border-color, rgba(255,255,255,.1))",
                background: "var(--card-bg, rgba(255,255,255,.04))",
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "14px",
                  background: "var(--accent-soft, rgba(34,211,238,.1))",
                  color: "var(--accent-color, #22d3ee)",
                  fontWeight: 700,
                }}
              >
                {index + 1}
              </div>

              <div
                style={{
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <strong>{service.title_id}</strong>

                  <span
                    style={{
                      opacity: 0.5,
                    }}
                  >
                    /
                  </span>

                  <strong>{service.title_en}</strong>

                  <span
                    style={{
                      fontSize: ".75rem",
                      padding: "4px 8px",
                      borderRadius: "999px",
                      background: service.is_active
                        ? "rgba(34,197,94,.12)"
                        : "rgba(148,163,184,.12)",
                      color: service.is_active
                        ? "#86efac"
                        : "#94a3b8",
                    }}
                  >
                    {service.is_active ? "Aktif" : "Nonaktif"}
                  </span>
                </div>

                <p
                  style={{
                    margin: "8px 0 0",
                    color: "var(--text-secondary, #94a3b8)",
                    lineHeight: 1.5,
                  }}
                >
                  {service.description_id}
                </p>

                <small
                  style={{
                    display: "block",
                    marginTop: "6px",
                    opacity: 0.55,
                  }}
                >
                  Icon: {service.icon} · Urutan:{" "}
                  {service.sort_order}
                </small>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => moveService(service, "up")}
                  disabled={index === 0}
                  title="Naik"
                  style={iconButtonStyle}
                >
                  <ArrowUp size={16} />
                </button>

                <button
                  onClick={() => moveService(service, "down")}
                  disabled={index === services.length - 1}
                  title="Turun"
                  style={iconButtonStyle}
                >
                  <ArrowDown size={16} />
                </button>

                <button
                  onClick={() => toggleActive(service)}
                  title={
                    service.is_active
                      ? "Nonaktifkan"
                      : "Aktifkan"
                  }
                  style={iconButtonStyle}
                >
                  {service.is_active ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

                <button
                  onClick={() => editService(service)}
                  style={iconButtonStyle}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteService(service.id)}
                  style={{
                    ...iconButtonStyle,
                    color: "#fca5a5",
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
  type = "text",
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={4}
          style={{
            ...inputStyle,
            resize: "vertical",
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontSize: ".85rem",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid var(--border-color, rgba(255,255,255,.12))",
  background: "var(--input-bg, rgba(255,255,255,.05))",
  color: "var(--text-primary, #fff)",
  outline: "none",
  font: "inherit",
};

const iconButtonStyle = {
  minWidth: "38px",
  minHeight: "38px",
  padding: "8px 10px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  borderRadius: "10px",
  border: "1px solid var(--border-color, rgba(255,255,255,.12))",
  background: "transparent",
  color: "inherit",
  cursor: "pointer",
};

function buttonStyle(type) {
  const primary = type === "primary";

  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minHeight: "40px",
    padding: "10px 15px",
    borderRadius: "11px",
    border: primary
      ? "1px solid var(--accent-color, #22d3ee)"
      : "1px solid var(--border-color, rgba(255,255,255,.12))",
    background: primary
      ? "var(--accent-color, #22d3ee)"
      : "transparent",
    color: primary ? "#061018" : "inherit",
    cursor: "pointer",
    fontWeight: 700,
  };
}
