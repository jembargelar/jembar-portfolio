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
  GraduationCap,
  X,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";

const emptyForm = {
  institution: "",
  degree_id: "",
  degree_en: "",
  period_id: "",
  period_en: "",
  description_id: "",
  description_en: "",
  sort_order: 1,
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

const buttonStyle = (type = "secondary") => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "7px",
  padding: "10px 13px",
  borderRadius: "10px",
  border:
    type === "primary"
      ? "1px solid rgba(34,211,238,.35)"
      : "1px solid rgba(255,255,255,.1)",
  background:
    type === "primary"
      ? "rgba(34,211,238,.1)"
      : "rgba(255,255,255,.04)",
  color:
    type === "primary"
      ? "var(--accent)"
      : "var(--text-primary)",
  cursor: "pointer",
  fontWeight: 700,
});

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  color: "var(--text-secondary)",
  fontSize: ".78rem",
  fontWeight: 700,
};

export default function EducationManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadEducation() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      setError("Gagal mengambil data pendidikan.");
      setItems([]);
    } else {
      setItems(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadEducation();
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
      institution: item.institution || "",
      degree_id: item.degree_id || "",
      degree_en: item.degree_en || "",
      period_id: item.period_id || "",
      period_en: item.period_en || "",
      description_id: item.description_id || "",
      description_en: item.description_en || "",
      sort_order: item.sort_order || 1,
      is_active: Boolean(item.is_active),
    });
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    if (saving) return;
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

  async function saveEducation(e) {
    e.preventDefault();

    const payload = {
      institution: form.institution.trim(),
      degree_id: form.degree_id.trim(),
      degree_en: form.degree_en.trim(),
      period_id: form.period_id.trim(),
      period_en: form.period_en.trim(),
      description_id: form.description_id.trim(),
      description_en: form.description_en.trim(),
      sort_order: Number(form.sort_order) || 1,
      is_active: Boolean(form.is_active),
    };

    if (!payload.institution) {
      setError("Nama institusi wajib diisi.");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    const result = editingId
      ? await supabase
          .from("education")
          .update(payload)
          .eq("id", editingId)
      : await supabase.from("education").insert(payload);

    if (result.error) {
      console.error(result.error);
      setError(
        "Gagal menyimpan pendidikan: " +
          result.error.message
      );
      setSaving(false);
      return;
    }

    setMessage(
      editingId
        ? "Pendidikan berhasil diperbarui."
        : "Pendidikan berhasil ditambahkan."
    );

    await loadEducation();
    closeForm();
    setSaving(false);
  }

  async function deleteEducation(item) {
    if (
      !window.confirm(
        `Hapus pendidikan "${item.institution}"?`
      )
    ) {
      return;
    }

    const { error } = await supabase
      .from("education")
      .delete()
      .eq("id", item.id);

    if (error) {
      console.error(error);
      setError(
        "Gagal menghapus pendidikan: " + error.message
      );
      return;
    }

    setMessage("Pendidikan berhasil dihapus.");
    await loadEducation();
  }

  async function toggleActive(item) {
    const { error } = await supabase
      .from("education")
      .update({
        is_active: !item.is_active,
      })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      setError("Gagal mengubah status.");
      return;
    }

    await loadEducation();
  }

  async function moveItem(item, direction) {
    const index = items.findIndex((x) => x.id === item.id);
    const targetIndex =
      direction === "up" ? index - 1 : index + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= items.length
    ) {
      return;
    }

    const target = items[targetIndex];

    const first = await supabase
      .from("education")
      .update({ sort_order: target.sort_order })
      .eq("id", item.id);

    if (first.error) {
      console.error(first.error);
      setError("Gagal mengubah urutan.");
      return;
    }

    const second = await supabase
      .from("education")
      .update({ sort_order: item.sort_order })
      .eq("id", target.id);

    if (second.error) {
      console.error(second.error);
      setError("Gagal mengubah urutan.");
      await loadEducation();
      return;
    }

    await loadEducation();
  }

  return (
    <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto" }}>
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
              fontWeight: 800,
            }}
          >
            Education
          </h2>

          <p
            style={{
              margin: 0,
              color: "var(--text-secondary)",
            }}
          >
            Kelola riwayat pendidikan portfolio.
          </p>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={loadEducation}
            style={buttonStyle()}
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
            Tambah Pendidikan
          </button>
        </div>
      </div>

      {message && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: 12,
            marginBottom: 15,
            borderRadius: 10,
            color: "#10b981",
            background: "rgba(16,185,129,.08)",
            border: "1px solid rgba(16,185,129,.2)",
          }}
        >
          <CheckCircle2 size={17} />
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: 12,
            marginBottom: 15,
            borderRadius: 10,
            color: "#f87171",
            background: "rgba(248,113,113,.08)",
            border: "1px solid rgba(248,113,113,.2)",
          }}
        >
          <AlertCircle size={17} />
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={saveEducation}
          style={{
            padding: 22,
            marginBottom: 24,
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,.08)",
            background: "rgba(255,255,255,.035)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "var(--text-primary)",
              }}
            >
              {editingId
                ? "Edit Pendidikan"
                : "Tambah Pendidikan"}
            </h3>

            <button
              type="button"
              onClick={closeForm}
              style={buttonStyle()}
            >
              <X size={17} />
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: 16,
            }}
          >
            <Field
              label="Institusi"
              value={form.institution}
              onChange={(v) =>
                updateField("institution", v)
              }
              placeholder="Universitas Terbuka"
            />

            <Field
              label="Sort Order"
              type="number"
              value={form.sort_order}
              onChange={(v) =>
                updateField("sort_order", v)
              }
            />

            <Field
              label="Degree Indonesia"
              value={form.degree_id}
              onChange={(v) =>
                updateField("degree_id", v)
              }
              placeholder="S1 Manajemen"
            />

            <Field
              label="Degree English"
              value={form.degree_en}
              onChange={(v) =>
                updateField("degree_en", v)
              }
              placeholder="Bachelor of Management"
            />

            <Field
              label="Period Indonesia"
              value={form.period_id}
              onChange={(v) =>
                updateField("period_id", v)
              }
              placeholder="September 2026 – Sekarang"
            />

            <Field
              label="Period English"
              value={form.period_en}
              onChange={(v) =>
                updateField("period_en", v)
              }
              placeholder="September 2026 – Present"
            />

            <TextArea
              label="Description Indonesia"
              value={form.description_id}
              onChange={(v) =>
                updateField("description_id", v)
              }
            />

            <TextArea
              label="Description English"
              value={form.description_en}
              onChange={(v) =>
                updateField("description_en", v)
              }
            />
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 16,
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                updateField(
                  "is_active",
                  e.target.checked
                )
              }
            />
            Tampilkan di website
          </label>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 20,
            }}
          >
            <button
              type="button"
              onClick={closeForm}
              style={buttonStyle()}
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={saving}
              style={buttonStyle("primary")}
            >
              {saving ? "Menyimpan..." : "Simpan Pendidikan"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div style={{ padding: 40, textAlign: "center" }}>
          Memuat pendidikan...
        </div>
      ) : items.length === 0 ? (
        <div
          style={{
            padding: 40,
            textAlign: "center",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <GraduationCap size={30} />
          <p>Belum ada data pendidikan.</p>
          <button
            type="button"
            onClick={openAdd}
            style={buttonStyle("primary")}
          >
            <Plus size={15} />
            Tambah Pendidikan
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((item, index) => (
            <div
              key={item.id}
              style={{
                padding: 18,
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,.08)",
                background: "rgba(255,255,255,.035)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 15,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 13,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      background: "rgba(34,211,238,.08)",
                      color: "var(--accent)",
                    }}
                  >
                    <GraduationCap size={20} />
                  </div>

                  <div>
                    <h3
                      style={{
                        margin: 0,
                        color: "var(--text-primary)",
                      }}
                    >
                      {item.degree_id ||
                        item.degree_en ||
                        "Pendidikan"}
                    </h3>

                    <p
                      style={{
                        margin: "5px 0",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {item.institution}
                    </p>

                    <small
                      style={{
                        color: "var(--text-secondary)",
                      }}
                    >
                      {item.period_id ||
                        item.period_en ||
                        "-"}
                    </small>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleActive(item)}
                    style={buttonStyle()}
                  >
                    {item.is_active
                      ? "Aktif"
                      : "Nonaktif"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      moveItem(item, "up")
                    }
                    disabled={index === 0}
                    style={buttonStyle()}
                  >
                    <ArrowUp size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      moveItem(item, "down")
                    }
                    disabled={
                      index === items.length - 1
                    }
                    style={buttonStyle()}
                  >
                    <ArrowDown size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    style={buttonStyle()}
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteEducation(item)
                    }
                    style={{
                      ...buttonStyle(),
                      color: "#f87171",
                    }}
                  >
                    <Trash2 size={15} />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
        rows={4}
        style={{
          ...inputStyle,
          resize: "vertical",
        }}
      />
    </div>
  );
}
