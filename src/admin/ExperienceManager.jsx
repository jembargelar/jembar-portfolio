import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  BriefcaseBusiness,
  X,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";

const emptyForm = {
  company: "",
  role_id: "",
  role_en: "",
  period_id: "",
  period_en: "",
  description_id: "",
  description_en: "",
  highlights_id: "",
  highlights_en: "",
  tags: "",
  sort_order: 1,
  is_active: true,
};

export default function ExperienceManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function loadExperiences() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      setError("Gagal mengambil data experience.");
      setItems([]);
    } else {
      setItems(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadExperiences();
  }, []);

  function openAdd() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      sort_order: items.length + 1,
    });
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function openEdit(item) {
    setEditingId(item.id);
    setForm({
      company: item.company || "",
      role_id: item.role_id || "",
      role_en: item.role_en || "",
      period_id: item.period_id || "",
      period_en: item.period_en || "",
      description_id: item.description_id || "",
      description_en: item.description_en || "",
      highlights_id: (item.highlights_id || []).join("\n"),
      highlights_en: (item.highlights_en || []).join("\n"),
      tags: (item.tags || []).join(", "),
      sort_order: item.sort_order || 1,
      is_active: Boolean(item.is_active),
    });
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function parseLines(value) {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function parseTags(value) {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  async function saveExperience(e) {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    const payload = {
      company: form.company.trim(),
      role_id: form.role_id.trim(),
      role_en: form.role_en.trim(),
      period_id: form.period_id.trim(),
      period_en: form.period_en.trim(),
      description_id: form.description_id.trim(),
      description_en: form.description_en.trim(),
      highlights_id: parseLines(form.highlights_id),
      highlights_en: parseLines(form.highlights_en),
      tags: parseTags(form.tags),
      sort_order: Number(form.sort_order) || 1,
      is_active: Boolean(form.is_active),
    };

    if (!payload.company) {
      setError("Nama perusahaan wajib diisi.");
      setSaving(false);
      return;
    }

    let result;

    if (editingId) {
      result = await supabase
        .from("experiences")
        .update(payload)
        .eq("id", editingId);
    } else {
      result = await supabase
        .from("experiences")
        .insert(payload);
    }

    if (result.error) {
      console.error(result.error);
      setError("Gagal menyimpan experience.");
      setSaving(false);
      return;
    }

    setMessage(
      editingId
        ? "Experience berhasil diperbarui."
        : "Experience berhasil ditambahkan."
    );

    await loadExperiences();
    closeForm();
    setSaving(false);
  }

  async function deleteExperience(item) {
    const confirmed = window.confirm(
      `Hapus experience "${item.company}"?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    const { error } = await supabase
      .from("experiences")
      .delete()
      .eq("id", item.id);

    if (error) {
      console.error(error);
      setError("Gagal menghapus experience.");
      return;
    }

    setMessage("Experience berhasil dihapus.");
    await loadExperiences();
  }

  async function toggleActive(item) {
    const { error } = await supabase
      .from("experiences")
      .update({
        is_active: !item.is_active,
      })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      setError("Gagal mengubah status.");
      return;
    }

    await loadExperiences();
  }

  async function moveItem(item, direction) {
    const index = items.findIndex((x) => x.id === item.id);
    const targetIndex =
      direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= items.length) {
      return;
    }

    const target = items[targetIndex];

    const { error: firstError } = await supabase
      .from("experiences")
      .update({ sort_order: target.sort_order })
      .eq("id", item.id);

    if (firstError) {
      console.error(firstError);
      setError("Gagal mengubah urutan.");
      return;
    }

    const { error: secondError } = await supabase
      .from("experiences")
      .update({ sort_order: item.sort_order })
      .eq("id", target.id);

    if (secondError) {
      console.error(secondError);
      setError("Gagal mengubah urutan.");
      await loadExperiences();
      return;
    }

    await loadExperiences();
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              color: "var(--accent)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            CMS
          </div>

          <h2
            style={{
              margin: "5px 0 6px",
              color: "var(--text-primary)",
              fontSize: "1.8rem",
              fontWeight: 800,
            }}
          >
            Experience
          </h2>

          <p
            style={{
              margin: 0,
              color: "var(--text-secondary)",
            }}
          >
            Kelola riwayat pengalaman kerja portfolio.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <button
            type="button"
            onClick={loadExperiences}
            style={buttonStyle("secondary")}
          >
            <RefreshCw size={15} />
            Refresh
          </button>

          <button
            type="button"
            onClick={openAdd}
            style={buttonStyle("primary")}
          >
            <Plus size={15} />
            Tambah Experience
          </button>
        </div>
      </div>

      {message && (
        <div style={noticeStyle("success")}>
          <CheckCircle2 size={17} />
          {message}
        </div>
      )}

      {error && (
        <div style={noticeStyle("error")}>
          <AlertCircle size={17} />
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={saveExperience}
          style={{
            background: "rgba(255,255,255,.035)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "18px",
            padding: "22px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "var(--text-primary)",
              }}
            >
              {editingId
                ? "Edit Experience"
                : "Tambah Experience"}
            </h3>

            <button
              type="button"
              onClick={closeForm}
              style={iconButtonStyle}
            >
              <X size={17} />
            </button>
          </div>

          <div className="experience-form-grid">
            <Field
              label="Company"
              value={form.company}
              onChange={(v) => updateField("company", v)}
              placeholder="PT Syahrendra Megawatt Indonesia"
            />

            <Field
              label="Sort Order"
              type="number"
              value={form.sort_order}
              onChange={(v) => updateField("sort_order", v)}
            />

            <Field
              label="Role Indonesia"
              value={form.role_id}
              onChange={(v) => updateField("role_id", v)}
              placeholder="Admin / Data Entry"
            />

            <Field
              label="Role English"
              value={form.role_en}
              onChange={(v) => updateField("role_en", v)}
              placeholder="Admin / Data Entry"
            />

            <Field
              label="Period Indonesia"
              value={form.period_id}
              onChange={(v) => updateField("period_id", v)}
              placeholder="November 2025 – Agustus 2026"
            />

            <Field
              label="Period English"
              value={form.period_en}
              onChange={(v) => updateField("period_en", v)}
              placeholder="Nov 2025 – Aug 2026"
            />

            <TextArea
              label="Description Indonesia"
              value={form.description_id}
              onChange={(v) => updateField("description_id", v)}
            />

            <TextArea
              label="Description English"
              value={form.description_en}
              onChange={(v) => updateField("description_en", v)}
            />

            <TextArea
              label="Highlights Indonesia"
              value={form.highlights_id}
              onChange={(v) => updateField("highlights_id", v)}
              placeholder={"Satu highlight per baris"}
            />

            <TextArea
              label="Highlights English"
              value={form.highlights_en}
              onChange={(v) => updateField("highlights_en", v)}
              placeholder={"One highlight per line"}
            />

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>
                Tags
              </label>

              <input
                value={form.tags}
                onChange={(e) =>
                  updateField("tags", e.target.value)
                }
                placeholder="Excel Advanced, Document Control, Reporting"
                style={inputStyle}
              />

              <small style={helpStyle}>
                Pisahkan dengan koma.
              </small>
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) =>
                  updateField("is_active", e.target.checked)
                }
              />
              Tampilkan di website
            </label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={closeForm}
              style={buttonStyle("secondary")}
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={saving}
              style={buttonStyle("primary")}
            >
              {saving ? "Menyimpan..." : "Simpan Experience"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div style={emptyStyle}>
          Memuat experience...
        </div>
      ) : items.length === 0 ? (
        <div style={emptyStyle}>
          <BriefcaseBusiness size={30} />
          <p>Belum ada data experience.</p>
          <button
            type="button"
            onClick={openAdd}
            style={buttonStyle("primary")}
          >
            <Plus size={15} />
            Tambah Experience
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "12px",
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              style={{
                background: "rgba(255,255,255,.035)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "16px",
                padding: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "13px",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      background: "rgba(34,211,238,.08)",
                      color: "var(--accent)",
                    }}
                  >
                    <BriefcaseBusiness size={20} />
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <h3
                      style={{
                        margin: 0,
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                      }}
                    >
                      {item.company}
                    </h3>

                    <div
                      style={{
                        color: "var(--accent)",
                        marginTop: "5px",
                        fontSize: ".9rem",
                      }}
                    >
                      {item.role_id}
                    </div>

                    <div
                      style={{
                        color: "var(--text-secondary)",
                        marginTop: "4px",
                        fontSize: ".82rem",
                      }}
                    >
                      {item.period_id}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => moveItem(item, "up")}
                    disabled={index === 0}
                    style={smallButtonStyle}
                    title="Naik"
                  >
                    <ArrowUp size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveItem(item, "down")}
                    disabled={index === items.length - 1}
                    style={smallButtonStyle}
                    title="Turun"
                  >
                    <ArrowDown size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleActive(item)}
                    style={{
                      ...smallButtonStyle,
                      color: item.is_active
                        ? "#22d3ee"
                        : "#888",
                    }}
                  >
                    {item.is_active ? "Active" : "Hidden"}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    style={smallButtonStyle}
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteExperience(item)}
                    style={{
                      ...smallButtonStyle,
                      color: "#fb7185",
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div
                style={{
                  marginTop: "14px",
                  color: "var(--text-secondary)",
                  fontSize: ".86rem",
                  lineHeight: 1.55,
                }}
              >
                {item.description_id}
              </div>

              {item.tags?.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: "7px",
                    flexWrap: "wrap",
                    marginTop: "12px",
                  }}
                >
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tech-pill"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .experience-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 720px) {
          .experience-form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        style={{
          ...inputStyle,
          resize: "vertical",
          minHeight: "120px",
        }}
      />
    </div>
  );
}

const labelStyle = {
  display: "block",
  color: "var(--text-secondary)",
  fontSize: ".8rem",
  fontWeight: 600,
  marginBottom: "7px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,.1)",
  background: "rgba(0,0,0,.2)",
  color: "var(--text-primary)",
  outline: "none",
};

const helpStyle = {
  display: "block",
  marginTop: "5px",
  color: "var(--text-secondary)",
  fontSize: ".72rem",
};

const iconButtonStyle = {
  width: "34px",
  height: "34px",
  borderRadius: "9px",
  border: "1px solid rgba(255,255,255,.08)",
  background: "rgba(255,255,255,.04)",
  color: "var(--text-secondary)",
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
};

const smallButtonStyle = {
  minHeight: "34px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,.08)",
  background: "rgba(255,255,255,.035)",
  color: "var(--text-secondary)",
  padding: "0 9px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  cursor: "pointer",
};

function buttonStyle(type) {
  return {
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "9px",
    padding: "9px 13px",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: ".8rem",
    background:
      type === "primary"
        ? "var(--accent)"
        : "rgba(255,255,255,.05)",
    color:
      type === "primary"
        ? "#061018"
        : "var(--text-primary)",
  };
}

function noticeStyle(type) {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "11px 13px",
    borderRadius: "10px",
    marginBottom: "16px",
    background:
      type === "success"
        ? "rgba(34,211,238,.08)"
        : "rgba(251,113,133,.08)",
    color:
      type === "success"
        ? "#22d3ee"
        : "#fb7185",
    fontSize: ".85rem",
  };
}

const emptyStyle = {
  minHeight: "180px",
  display: "grid",
  placeItems: "center",
  alignContent: "center",
  gap: "10px",
  textAlign: "center",
  borderRadius: "16px",
  border: "1px dashed rgba(255,255,255,.1)",
  color: "var(--text-secondary)",
};
