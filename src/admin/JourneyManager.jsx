import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";

const emptyForm = {
  year_label: "",
  title_id: "",
  title_en: "",
  description_id: "",
  description_en: "",
  icon: "BriefcaseBusiness",
  sort_order: 1,
  is_active: true,
};

export default function JourneyManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    const { data, error: loadError } = await supabase
      .from("journey_items")
      .select("*")
      .order("sort_order", { ascending: true });

    if (loadError) {
      setError(loadError.message);
      setItems([]);
    } else {
      setItems(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function reset() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      sort_order: items.length + 1,
    });
    setMessage("");
    setError("");
  }

  function edit(item) {
    setEditingId(item.id);
    setForm({
      year_label: item.year_label || "",
      title_id: item.title_id || "",
      title_en: item.title_en || "",
      description_id: item.description_id || "",
      description_en: item.description_en || "",
      icon: item.icon || "BriefcaseBusiness",
      sort_order: item.sort_order || 1,
      is_active: Boolean(item.is_active),
    });
    setMessage("");
    setError("");
  }

  async function save() {
    if (
      !form.year_label.trim() ||
      !form.title_id.trim() ||
      !form.title_en.trim()
    ) {
      setError(
        "Tahun, judul Indonesia, dan judul English wajib diisi."
      );
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    const payload = {
      year_label: form.year_label.trim(),
      title_id: form.title_id.trim(),
      title_en: form.title_en.trim(),
      description_id: form.description_id.trim(),
      description_en: form.description_en.trim(),
      icon: form.icon.trim() || "BriefcaseBusiness",
      sort_order: Number(form.sort_order) || 1,
      is_active: Boolean(form.is_active),
    };

    const result = editingId
      ? await supabase
          .from("journey_items")
          .update(payload)
          .eq("id", editingId)
      : await supabase
          .from("journey_items")
          .insert(payload);

    if (result.error) {
      setError(result.error.message);
    } else {
      setMessage("Journey berhasil disimpan.");
      await load();
      reset();
    }

    setSaving(false);
  }

  async function remove(id) {
    if (!window.confirm("Hapus item Journey ini?")) {
      return;
    }

    setError("");
    setMessage("");

    const { error: removeError } = await supabase
      .from("journey_items")
      .delete()
      .eq("id", id);

    if (removeError) {
      setError(removeError.message);
      return;
    }

    setMessage("Journey berhasil dihapus.");
    await load();
  }

  async function toggle(item) {
    setError("");
    setMessage("");

    const { error: toggleError } = await supabase
      .from("journey_items")
      .update({
        is_active: !item.is_active,
      })
      .eq("id", item.id);

    if (toggleError) {
      setError(toggleError.message);
      return;
    }

    await load();
  }

  async function move(item, direction) {
    const index = items.findIndex((x) => x.id === item.id);

    if (index === -1) {
      return;
    }

    const targetIndex =
      direction === "up" ? index - 1 : index + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= items.length
    ) {
      return;
    }

    const target = items[targetIndex];

    const firstUpdate = await supabase
      .from("journey_items")
      .update({
        sort_order: target.sort_order,
      })
      .eq("id", item.id);

    if (firstUpdate.error) {
      setError(firstUpdate.error.message);
      return;
    }

    const secondUpdate = await supabase
      .from("journey_items")
      .update({
        sort_order: item.sort_order,
      })
      .eq("id", target.id);

    if (secondUpdate.error) {
      setError(secondUpdate.error.message);
      await load();
      return;
    }

    await load();
  }

  if (loading) {
    return (
      <div className="admin-panel">
        Memuat Journey...
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <h2>My Journey</h2>
          <p>
            Kelola perjalanan profesional dan pendidikan.
          </p>
        </div>

        <button
          className="admin-add-button"
          onClick={reset}
        >
          <Plus size={15} />
          Tambah Journey
        </button>
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

      <div className="admin-form-grid">
        <label>
          Tahun
          <input
            value={form.year_label}
            onChange={(e) =>
              setForm((previous) => ({
                ...previous,
                year_label: e.target.value,
              }))
            }
            placeholder="2026"
          />
        </label>

        <label>
          Icon
          <input
            value={form.icon}
            onChange={(e) =>
              setForm((previous) => ({
                ...previous,
                icon: e.target.value,
              }))
            }
            placeholder="Code2"
          />
        </label>

        <label>
          Judul Indonesia
          <input
            value={form.title_id}
            onChange={(e) =>
              setForm((previous) => ({
                ...previous,
                title_id: e.target.value,
              }))
            }
          />
        </label>

        <label>
          Judul English
          <input
            value={form.title_en}
            onChange={(e) =>
              setForm((previous) => ({
                ...previous,
                title_en: e.target.value,
              }))
            }
          />
        </label>

        <label>
          Urutan
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) =>
              setForm((previous) => ({
                ...previous,
                sort_order: e.target.value,
              }))
            }
          />
        </label>

        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) =>
              setForm((previous) => ({
                ...previous,
                is_active: e.target.checked,
              }))
            }
          />
          Aktif
        </label>

        <label className="admin-form-full">
          Deskripsi Indonesia
          <textarea
            value={form.description_id}
            onChange={(e) =>
              setForm((previous) => ({
                ...previous,
                description_id: e.target.value,
              }))
            }
          />
        </label>

        <label className="admin-form-full">
          Deskripsi English
          <textarea
            value={form.description_en}
            onChange={(e) =>
              setForm((previous) => ({
                ...previous,
                description_en: e.target.value,
              }))
            }
          />
        </label>
      </div>

      <div className="admin-form-actions">
        <button
          className="admin-primary-button"
          onClick={save}
          disabled={saving}
        >
          <Save size={15} />
          {saving ? "Menyimpan..." : "Simpan"}
        </button>

        {editingId && (
          <button
            className="admin-secondary-button"
            onClick={reset}
          >
            <X size={15} />
            Batal
          </button>
        )}
      </div>

      <div className="admin-list">
        {items.map((item, index) => (
          <div
            className="admin-list-item"
            key={item.id}
          >
            <div className="admin-list-main">
              <strong>
                {item.year_label} · {item.title_id}
              </strong>

              <span>
                {item.description_id ||
                  "Tidak ada deskripsi"}
              </span>
            </div>

            <div className="admin-list-actions">
              <button
                className="admin-icon-button"
                onClick={() => move(item, "up")}
                disabled={index === 0}
                title="Naik"
              >
                <ArrowUp size={15} />
              </button>

              <button
                className="admin-icon-button"
                onClick={() => move(item, "down")}
                disabled={
                  index === items.length - 1
                }
                title="Turun"
              >
                <ArrowDown size={15} />
              </button>

              <button
                className="admin-icon-button"
                onClick={() => toggle(item)}
                title="Aktif/nonaktif"
              >
                {item.is_active ? "ON" : "OFF"}
              </button>

              <button
                className="admin-icon-button"
                onClick={() => edit(item)}
                title="Edit"
              >
                <Pencil size={15} />
              </button>

              <button
                className="admin-icon-button admin-danger-button"
                onClick={() => remove(item.id)}
                title="Hapus"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
