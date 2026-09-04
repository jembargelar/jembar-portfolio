import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { supabase } from "../api/supabaseClient";

const emptyForm = {
  name_id: "",
  name_en: "",
  category: "technical",
  sort_order: 0,
  is_active: true,
};

const categories = [
  {
    value: "technical",
    label: "Technical",
  },
  {
    value: "operational",
    label: "Operational",
  },
  {
    value: "administration",
    label: "Administration",
  },
];

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingSkill, setEditingSkill] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      setError("Gagal mengambil data skills.");
    } else {
      setSkills(data || []);
    }

    setLoading(false);
  }

  function openAdd() {
    const nextOrder =
      skills.length > 0
        ? Math.max(...skills.map((skill) => skill.sort_order || 0)) + 1
        : 1;

    setEditingSkill(null);
    setForm({
      ...emptyForm,
      sort_order: nextOrder,
    });
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function openEdit(skill) {
    setEditingSkill(skill);
    setForm({
      name_id: skill.name_id || "",
      name_en: skill.name_en || "",
      category: skill.category || "technical",
      sort_order: skill.sort_order ?? 0,
      is_active: Boolean(skill.is_active),
    });
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    if (saving) return;

    setShowForm(false);
    setEditingSkill(null);
    setForm(emptyForm);
  }

  function handleInput(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function saveSkill(e) {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!form.name_id.trim()) {
      setError("Nama skill Bahasa Indonesia wajib diisi.");
      return;
    }

    setSaving(true);

    const payload = {
      name_id: form.name_id.trim(),
      name_en: form.name_en.trim() || null,
      category: form.category,
      sort_order: Number(form.sort_order) || 0,
      is_active: Boolean(form.is_active),
    };

    let result;

    if (editingSkill) {
      result = await supabase
        .from("skills")
        .update(payload)
        .eq("id", editingSkill.id);
    } else {
      result = await supabase.from("skills").insert(payload);
    }

    if (result.error) {
      console.error(result.error);
      setError("Gagal menyimpan skill: " + result.error.message);
    } else {
      setMessage(
        editingSkill
          ? "Skill berhasil diperbarui."
          : "Skill berhasil ditambahkan."
      );

      await loadSkills();

      setTimeout(() => {
        setShowForm(false);
        setEditingSkill(null);
        setForm(emptyForm);
        setMessage("");
      }, 500);
    }

    setSaving(false);
  }

  async function deleteSkill(skill) {
    const confirmed = window.confirm(
      `Hapus skill "${skill.name_id}"?\n\nData ini akan dihapus dari database.`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", skill.id);

    if (error) {
      console.error(error);
      setError("Gagal menghapus skill: " + error.message);
      return;
    }

    setMessage("Skill berhasil dihapus.");
    await loadSkills();
  }

  async function toggleActive(skill) {
    setError("");
    setMessage("");

    const { error } = await supabase
      .from("skills")
      .update({
        is_active: !skill.is_active,
      })
      .eq("id", skill.id);

    if (error) {
      console.error(error);
      setError("Gagal mengubah status skill.");
      return;
    }

    await loadSkills();
  }

  async function moveSkill(skill, direction) {
    const index = skills.findIndex((item) => item.id === skill.id);

    if (index === -1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= skills.length) return;

    const current = skills[index];
    const target = skills[targetIndex];

    setError("");
    setMessage("");

    const updates = [
      supabase
        .from("skills")
        .update({ sort_order: target.sort_order })
        .eq("id", current.id),
      supabase
        .from("skills")
        .update({ sort_order: current.sort_order })
        .eq("id", target.id),
    ];

    const results = await Promise.all(updates);

    const failed = results.find((result) => result.error);

    if (failed) {
      console.error(failed.error);
      setError("Gagal mengubah urutan skill.");
      return;
    }

    await loadSkills();
  }

  const groupedSkills = categories.map((category) => ({
    ...category,
    items: skills.filter((skill) => skill.category === category.value),
  }));

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2>Skills</h2>
          <p>
            Kelola keahlian yang tampil pada halaman portfolio tanpa mengubah
            kode.
          </p>
        </div>

        <button className="admin-primary-button" onClick={openAdd}>
          <Plus size={17} />
          Tambah Skill
        </button>
      </div>

      {message && (
        <div className="admin-success-message">
          {message}
        </div>
      )}

      {error && (
        <div className="admin-error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="admin-empty-state">
          Memuat skills...
        </div>
      ) : skills.length === 0 ? (
        <div className="admin-empty-state">
          <strong>Belum ada skill.</strong>
          <span>Tambahkan skill pertama dari tombol di atas.</span>
        </div>
      ) : (
        <div className="admin-stack">
          {groupedSkills.map((group) => (
            <div key={group.value} className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h3>{group.label}</h3>
                  <span>{group.items.length} skill</span>
                </div>
              </div>

              {group.items.length === 0 ? (
                <div className="admin-muted">
                  Belum ada skill pada kategori ini.
                </div>
              ) : (
                <div className="admin-list">
                  {group.items.map((skill, index) => (
                    <div
                      key={skill.id}
                      className={`admin-list-item ${
                        !skill.is_active ? "is-disabled" : ""
                      }`}
                    >
                      <div className="admin-list-main">
                        <div className="admin-list-title">
                          {skill.name_id}
                        </div>

                        <div className="admin-list-meta">
                          {skill.name_en || "Tanpa nama EN"}
                          {" · "}
                          Order {skill.sort_order}
                        </div>
                      </div>

                      <div className="admin-list-actions">
                        <button
                          className="admin-icon-button"
                          title="Naik"
                          disabled={index === 0}
                          onClick={() => moveSkill(skill, "up")}
                        >
                          <ArrowUp size={16} />
                        </button>

                        <button
                          className="admin-icon-button"
                          title="Turun"
                          disabled={index === group.items.length - 1}
                          onClick={() => moveSkill(skill, "down")}
                        >
                          <ArrowDown size={16} />
                        </button>

                        <button
                          className="admin-secondary-button"
                          onClick={() => toggleActive(skill)}
                        >
                          {skill.is_active ? "Aktif" : "Nonaktif"}
                        </button>

                        <button
                          className="admin-icon-button"
                          title="Edit"
                          onClick={() => openEdit(skill)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="admin-icon-button danger"
                          title="Hapus"
                          onClick={() => deleteSkill(skill)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="admin-modal-backdrop" onMouseDown={closeForm}>
          <div
            className="admin-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div>
                <h3>{editingSkill ? "Edit Skill" : "Tambah Skill"}</h3>
                <p>Data akan langsung tersimpan ke Supabase.</p>
              </div>

              <button
                className="admin-icon-button"
                onClick={closeForm}
                disabled={saving}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveSkill} className="admin-form">
              <label>
                Nama Indonesia
                <input
                  name="name_id"
                  value={form.name_id}
                  onChange={handleInput}
                  placeholder="Contoh: React"
                  required
                />
              </label>

              <label>
                Nama English
                <input
                  name="name_en"
                  value={form.name_en}
                  onChange={handleInput}
                  placeholder="Example: React"
                />
              </label>

              <label>
                Kategori
                <select
                  name="category"
                  value={form.category}
                  onChange={handleInput}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Urutan
                <input
                  name="sort_order"
                  type="number"
                  value={form.sort_order}
                  onChange={handleInput}
                />
              </label>

              <label className="admin-checkbox">
                <input
                  name="is_active"
                  type="checkbox"
                  checked={form.is_active}
                  onChange={handleInput}
                />
                <span>Skill aktif dan tampil di website</span>
              </label>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="admin-primary-button"
                  disabled={saving}
                >
                  <Save size={17} />
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
