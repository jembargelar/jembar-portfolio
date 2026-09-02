import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Plus,
  Upload,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  X,
  Menu,
  LogOut,
  ArrowUpRight,
  LockKeyhole,
  Pencil,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
  },
];

const emptyForm = {
  title: "",
  description_id: "",
  description_en: "",
  category_id: "",
  category_en: "",
  tech: "",
  project_url: "",
  featured: false,
};

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingProject, setEditingProject] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setSession(session);
        setAuthLoading(false);
      }
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session && activeMenu === "projects") {
      loadProjects();
    }
  }, [session, activeMenu]);

  async function login(e) {
    e.preventDefault();

    setLoginError("");

    if (!email.trim() || !password) {
      setLoginError("Email dan password wajib diisi.");
      return;
    }

    setLoginLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      console.error(error);
      setLoginError("Login gagal: " + error.message);
    }

    setLoginLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setSession(null);
    setActiveMenu("dashboard");
  }

  async function loadProjects() {
    setLoadingProjects(true);
    setError("");

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError("Gagal mengambil data project.");
    } else {
      setProjects(data || []);
    }

    setLoadingProjects(false);
  }

  function openAddProject() {
    setEditingProject(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function openEditProject(project) {
    setEditingProject(project);
    setForm({
      title: project.title || "",
      description_id: project.description_id || "",
      description_en: project.description_en || "",
      category_id: project.category_id || "",
      category_en: project.category_en || "",
      tech: Array.isArray(project.tech)
        ? project.tech.join(", ")
        : project.tech || "",
      project_url:
        project.project_url && project.project_url !== "#"
          ? project.project_url
          : "",
      featured: Boolean(project.featured),
    });

    setImageFile(null);
    setImagePreview(project.image_url || "");
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    if (saving) return;

    setShowForm(false);
    setEditingProject(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
  }

  function handleInput(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      setError("Ukuran gambar maksimal 5 MB.");
      return;
    }

    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function saveProject(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Nama project wajib diisi.");
      return;
    }

    if (!editingProject && !imageFile) {
      setError("Pilih foto project terlebih dahulu.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    let uploadedPath = null;

    try {
      const techArray = form.tech
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      // =====================================================
      // EDIT PROJECT
      // =====================================================

      if (editingProject) {
        let imageUrl = editingProject.image_url || "";

        // Upload foto baru hanya jika admin memilih foto baru.
        if (imageFile) {
          const extension =
            imageFile.name.split(".").pop()?.toLowerCase() || "jpg";

          const safeName =
            form.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "") || "project";

          const fileName = `${Date.now()}-${safeName}.${extension}`;
          uploadedPath = `projects/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("project-images")
            .upload(uploadedPath, imageFile, {
              cacheControl: "3600",
              upsert: false,
              contentType: imageFile.type,
            });

          if (uploadError) {
            throw new Error(
              "Upload gambar baru gagal: " + uploadError.message
            );
          }

          const {
            data: { publicUrl },
          } = supabase.storage
            .from("project-images")
            .getPublicUrl(uploadedPath);

          imageUrl = publicUrl;
        }

        const { error: updateError } = await supabase
          .from("projects")
          .update({
            title: form.title.trim(),
            description_id: form.description_id.trim(),
            description_en: form.description_en.trim(),
            category_id: form.category_id.trim(),
            category_en: form.category_en.trim(),
            tech: techArray,
            image_url: imageUrl,
            project_url: form.project_url.trim() || "#",
            featured: form.featured,
          })
          .eq("id", editingProject.id);

        if (updateError) {
          // Kalau DB gagal, foto baru yang tadi diupload dibersihkan.
          if (uploadedPath) {
            await supabase.storage
              .from("project-images")
              .remove([uploadedPath]);
          }

          throw new Error(
            "Data project gagal diperbarui: " + updateError.message
          );
        }

        // Hapus foto lama hanya setelah database berhasil diperbarui.
        if (imageFile && editingProject.image_url) {
          const marker =
            "/storage/v1/object/public/project-images/";

          if (editingProject.image_url.includes(marker)) {
            const oldPath = decodeURIComponent(
              editingProject.image_url.split(marker)[1]
            );

            if (oldPath && oldPath !== uploadedPath) {
              const { error: oldImageError } =
                await supabase.storage
                  .from("project-images")
                  .remove([oldPath]);

              if (oldImageError) {
                console.warn(
                  "Foto lama gagal dihapus:",
                  oldImageError
                );
              }
            }
          }
        }

        setMessage("Project berhasil diperbarui.");
      }

      // =====================================================
      // ADD PROJECT
      // =====================================================

      else {
        const extension =
          imageFile.name.split(".").pop()?.toLowerCase() || "jpg";

        const safeName =
          form.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") || "project";

        const fileName = `${Date.now()}-${safeName}.${extension}`;
        uploadedPath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(uploadedPath, imageFile, {
            cacheControl: "3600",
            upsert: false,
            contentType: imageFile.type,
          });

        if (uploadError) {
          throw new Error(
            "Upload gambar gagal: " + uploadError.message
          );
        }

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("project-images")
          .getPublicUrl(uploadedPath);

        const { error: insertError } = await supabase
          .from("projects")
          .insert({
            title: form.title.trim(),
            description_id: form.description_id.trim(),
            description_en: form.description_en.trim(),
            category_id: form.category_id.trim(),
            category_en: form.category_en.trim(),
            tech: techArray,
            image_url: publicUrl,
            project_url: form.project_url.trim() || "#",
            featured: form.featured,
          });

        if (insertError) {
          await supabase.storage
            .from("project-images")
            .remove([uploadedPath]);

          throw new Error(
            "Data project gagal disimpan: " + insertError.message
          );
        }

        setMessage("Project berhasil ditambahkan.");
      }

      setShowForm(false);
      setEditingProject(null);
      setForm(emptyForm);
      setImageFile(null);
      setImagePreview("");

      await loadProjects();
    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(project) {
    const confirmed = window.confirm(
      `Hapus project "${project.title}"?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      if (project.image_url) {
        const marker =
          "/storage/v1/object/public/project-images/";

        if (project.image_url.includes(marker)) {
          const path = decodeURIComponent(
            project.image_url.split(marker)[1]
          );

          const { error: storageError } =
            await supabase.storage
              .from("project-images")
              .remove([path]);

          if (storageError) {
            console.warn(
              "Gambar gagal dihapus:",
              storageError
            );
          }
        }
      }

      const { error: deleteError } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      setMessage("Project berhasil dihapus.");
      await loadProjects();
    } catch (err) {
      console.error(err);
      setError(
        "Gagal menghapus project: " + err.message
      );
    }
  }

  if (authLoading) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <LockKeyhole size={38} />
          <h1>Memeriksa akses...</h1>
          <p>Menyiapkan Admin Panel.</p>
        </div>

        <style>{authStyles}</style>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-icon">
            <LockKeyhole size={28} />
          </div>

          <div className="auth-eyebrow">
            JEMBAR.DEV
          </div>

          <h1>Admin Login</h1>

          <p className="auth-description">
            Login untuk mengelola portfolio.
          </p>

          {loginError && (
            <div className="auth-error">
              {loginError}
            </div>
          )}

          <form onSubmit={login}>
            <label className="auth-label">
              Email
            </label>

            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
              autoComplete="email"
            />

            <label className="auth-label">
              Password
            </label>

            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />

            <button
              className="auth-button"
              type="submit"
              disabled={loginLoading}
            >
              {loginLoading ? "Memproses..." : "Login Admin"}
            </button>
          </form>
        </div>

        <style>{authStyles}</style>
      </div>
    );
  }

  return (
    <div className="admin-root">
      <style>{`
        .admin-root {
          min-height: 100vh;
          background:
            radial-gradient(circle at 10% 10%, rgba(34,211,238,.08), transparent 30%),
            radial-gradient(circle at 90% 80%, rgba(139,92,246,.07), transparent 30%),
            #05070b;
          color: #fff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          display: flex;
        }

        .admin-sidebar {
          width: 250px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          padding: 24px 16px;
          background: rgba(8,11,17,.92);
          border-right: 1px solid rgba(255,255,255,.08);
          backdrop-filter: blur(24px);
          z-index: 50;
          box-sizing: border-box;
        }

        .admin-logo {
          padding: 8px 12px 28px;
          font-size: 1.2rem;
          font-weight: 900;
        }

        .admin-logo span {
          color: #22d3ee;
        }

        .admin-menu {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .admin-menu-button {
          width: 100%;
          border: 1px solid transparent;
          background: transparent;
          color: rgba(255,255,255,.55);
          padding: 11px 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: .86rem;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
        }

        .admin-menu-button:hover,
        .admin-menu-button.active {
          color: #22d3ee;
          background: rgba(34,211,238,.08);
          border-color: rgba(34,211,238,.13);
        }

        .admin-main {
          margin-left: 250px;
          width: calc(100% - 250px);
          min-height: 100vh;
          padding: 32px;
          box-sizing: border-box;
        }

        .admin-content {
          max-width: 1150px;
          margin: 0 auto;
        }

        .admin-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          gap: 20px;
        }

        .admin-eyebrow {
          color: #22d3ee;
          font-size: .7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .12em;
          margin-bottom: 8px;
        }

        .admin-title {
          margin: 0;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 900;
        }

        .admin-subtitle {
          color: rgba(255,255,255,.5);
          margin: 8px 0 0;
          font-size: .9rem;
        }

        .admin-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .admin-stat,
        .admin-panel {
          background: rgba(255,255,255,.045);
          border: 1px solid rgba(255,255,255,.08);
          backdrop-filter: blur(18px);
        }

        .admin-stat {
          padding: 22px;
          border-radius: 18px;
        }

        .admin-stat-label {
          color: rgba(255,255,255,.48);
          font-size: .75rem;
        }

        .admin-stat-number {
          margin-top: 9px;
          font-size: 1.8rem;
          font-weight: 900;
        }

        .admin-panel {
          margin-top: 20px;
          padding: 24px;
          border-radius: 20px;
        }

        .admin-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .admin-panel-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 800;
        }

        .admin-add-button,
        .admin-save-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: none;
          border-radius: 10px;
          padding: 10px 14px;
          background: #22d3ee;
          color: #031018;
          font-weight: 800;
          font-size: .78rem;
          cursor: pointer;
        }

        .admin-save-button:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .project-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .project-card {
          overflow: hidden;
          border-radius: 16px;
          background: rgba(255,255,255,.035);
          border: 1px solid rgba(255,255,255,.07);
        }

        .project-image {
          width: 100%;
          height: 190px;
          object-fit: cover;
          display: block;
        }

        .project-body {
          padding: 18px;
        }

        .project-title {
          margin: 0 0 7px;
          font-size: 1.05rem;
          font-weight: 800;
        }

        .project-category {
          color: #22d3ee;
          font-size: .72rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .project-description {
          color: rgba(255,255,255,.5);
          font-size: .82rem;
          line-height: 1.6;
          margin: 12px 0;
        }

        .project-actions {
          display: flex;
          gap: 8px;
        }

        .project-action {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 10px;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.04);
          color: #fff;
          cursor: pointer;
          text-decoration: none;
          font-size: .75rem;
        }

        .project-action.delete {
          color: #fb7185;
        }

        .empty-state {
          padding: 45px 20px;
          text-align: center;
          color: rgba(255,255,255,.45);
        }

        .message {
          margin-bottom: 15px;
          padding: 12px 14px;
          border-radius: 10px;
          background: rgba(34,211,238,.08);
          border: 1px solid rgba(34,211,238,.15);
          color: #67e8f9;
          font-size: .82rem;
        }

        .error {
          margin-bottom: 15px;
          padding: 12px 14px;
          border-radius: 10px;
          background: rgba(239,68,68,.08);
          border: 1px solid rgba(239,68,68,.15);
          color: #fca5a5;
          font-size: .82rem;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0,0,0,.72);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          overflow-y: auto;
        }

        .modal {
          width: 100%;
          max-width: 650px;
          max-height: 92vh;
          overflow-y: auto;
          background: #0b0f17;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 22px;
          padding: 22px;
          box-sizing: border-box;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.2rem;
        }

        .close-button {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.05);
          color: #fff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-label {
          font-size: .75rem;
          color: rgba(255,255,255,.65);
          font-weight: 700;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.045);
          color: #fff;
          border-radius: 10px;
          padding: 11px 12px;
          outline: none;
          font-family: inherit;
        }

        .form-textarea {
          min-height: 90px;
          resize: vertical;
        }

        .form-input:focus,
        .form-textarea:focus {
          border-color: rgba(34,211,238,.5);
        }

        .upload-box {
          border: 1px dashed rgba(34,211,238,.35);
          background: rgba(34,211,238,.04);
          border-radius: 14px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }

        .upload-box input {
          display: none;
        }

        .upload-icon {
          color: #22d3ee;
          margin-bottom: 8px;
        }

        .upload-text {
          font-size: .8rem;
          color: rgba(255,255,255,.6);
        }

        .preview {
          width: 100%;
          max-height: 230px;
          object-fit: cover;
          border-radius: 12px;
          margin-top: 12px;
        }

        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 9px;
          color: rgba(255,255,255,.7);
          font-size: .8rem;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 22px;
        }

        .cancel-button {
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.04);
          color: #fff;
          cursor: pointer;
        }

        .admin-mobile-header {
          display: none;
        }

        @media (max-width: 800px) {
          .admin-sidebar {
            transform: translateX(-100%);
            transition: transform .25s ease;
          }

          .admin-sidebar.open {
            transform: translateX(0);
          }

          .admin-main {
            margin-left: 0;
            width: 100%;
            padding: 18px;
            padding-top: 80px;
          }

          .admin-mobile-header {
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: space-between;
            top: 0;
            left: 0;
            right: 0;
            height: 62px;
            padding: 0 16px;
            background: rgba(5,7,11,.9);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255,255,255,.08);
            z-index: 40;
          }

          .admin-mobile-button {
            width: 38px;
            height: 38px;
            border: 1px solid rgba(255,255,255,.1);
            border-radius: 10px;
            background: rgba(255,255,255,.05);
            color: #fff;
          }

          .admin-grid {
            grid-template-columns: 1fr 1fr;
          }

          .project-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 500px) {
          .admin-grid,
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full {
            grid-column: auto;
          }
        }
      `}</style>

      <div className="admin-mobile-header">
        <strong>
          JEMBAR<span style={{ color: "#22d3ee" }}>.dev</span>
        </strong>

        <button
          className="admin-mobile-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="admin-logo">
          JEMBAR<span>.dev</span>
        </div>

        <nav className="admin-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`admin-menu-button ${
                  activeMenu === item.id ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu(item.id);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 20,
          }}
        >
          <button
            className="admin-menu-button"
            onClick={logout}
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-content">
          <div className="admin-topbar">
            <div>
              <div className="admin-eyebrow">
                Control Center
              </div>

              <h1 className="admin-title">
                {activeMenu === "dashboard"
                  ? "Dashboard"
                  : "Projects"}
              </h1>

              <p className="admin-subtitle">
                Kelola portfolio lu dari satu tempat.
              </p>
            </div>

            {activeMenu === "projects" && (
              <button
                className="admin-add-button"
                onClick={openAddProject}
              >
                <Plus size={15} />
                Tambah Project
              </button>
            )}
          </div>

          {message && (
            <div className="message">
              {message}
            </div>
          )}

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {activeMenu === "dashboard" && (
            <>
              <div className="admin-grid">
                <div className="admin-stat">
                  <div className="admin-stat-label">
                    Projects
                  </div>

                  <div className="admin-stat-number">
                    {projects.length}
                  </div>
                </div>

                <div className="admin-stat">
                  <div className="admin-stat-label">
                    Database
                  </div>

                  <div
                    className="admin-stat-number"
                    style={{
                      color: "#22d3ee",
                      fontSize: "1rem",
                      marginTop: 17,
                    }}
                  >
                    SUPABASE
                  </div>
                </div>

                <div className="admin-stat">
                  <div className="admin-stat-label">
                    Status
                  </div>

                  <div
                    className="admin-stat-number"
                    style={{
                      color: "#22d3ee",
                      fontSize: "1rem",
                      marginTop: 17,
                    }}
                  >
                    ONLINE
                  </div>
                </div>
              </div>

              <div className="admin-panel">
                <div className="admin-panel-header">
                  <h2 className="admin-panel-title">
                    Quick Actions
                  </h2>

                  <button
                    className="admin-add-button"
                    onClick={() =>
                      setActiveMenu("projects")
                    }
                  >
                    <FolderKanban size={15} />
                    Manage Projects
                  </button>
                </div>

                <button
                  className="admin-menu-button"
                  onClick={openAddProject}
                >
                  <Plus size={17} />
                  Tambah project baru
                  <ArrowUpRight
                    size={16}
                    style={{ marginLeft: "auto" }}
                  />
                </button>
              </div>
            </>
          )}

          {activeMenu === "projects" && (
            <div className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h2 className="admin-panel-title">
                    Daftar Project
                  </h2>

                  <p
                    style={{
                      margin: "6px 0 0",
                      color: "rgba(255,255,255,.4)",
                      fontSize: ".78rem",
                    }}
                  >
                    Upload gambar langsung dari galeri HP.
                  </p>
                </div>
              </div>

              {loadingProjects ? (
                <div className="empty-state">
                  Memuat project...
                </div>
              ) : projects.length === 0 ? (
                <div className="empty-state">
                  <ImageIcon
                    size={35}
                    style={{
                      opacity: 0.4,
                      marginBottom: 10,
                    }}
                  />

                  <div>Belum ada project.</div>
                </div>
              ) : (
                <div className="project-list">
                  {projects.map((project) => (
                    <div
                      className="project-card"
                      key={project.id}
                    >
                      {project.image_url ? (
                        <img
                          className="project-image"
                          src={project.image_url}
                          alt={project.title}
                        />
                      ) : (
                        <div
                          style={{
                            height: 190,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                              "rgba(255,255,255,.04)",
                          }}
                        >
                          <ImageIcon />
                        </div>
                      )}

                      <div className="project-body">
                        <div className="project-category">
                          {project.category_id || "Project"}
                        </div>

                        <h3 className="project-title">
                          {project.title}
                        </h3>

                        <p className="project-description">
                          {project.description_id ||
                            "Tidak ada deskripsi."}
                        </p>

                        <div className="project-actions">
                          {project.project_url &&
                            project.project_url !== "#" && (
                              <a
                                className="project-action"
                                href={project.project_url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <ExternalLink size={14} />
                                Buka
                              </a>
                            )}

                          <button
                            type="button"
                            className="project-action"
                            onClick={() =>
                              openEditProject(project)
                            }
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            className="project-action delete"
                            onClick={() =>
                              deleteProject(project)
                            }
                          >
                            <Trash2 size={14} />
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                {editingProject ? "Edit Project" : "Tambah Project"}
              </h2>

              <button
                className="close-button"
                onClick={closeForm}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveProject}>
              <div className="form-grid">
                <div className="form-group full">
                  <label className="form-label">
                    {editingProject
                      ? "Foto Project"
                      : "Foto Project *"}
                  </label>

                  <label className="upload-box">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                    />

                    <Upload
                      className="upload-icon"
                      size={25}
                    />

                    <div className="upload-text">
                      {editingProject
                        ? "Tap untuk ganti foto dari Galeri"
                        : "Tap untuk pilih foto dari Galeri"}
                    </div>

                    <div
                      style={{
                        marginTop: 5,
                        fontSize: ".68rem",
                        color: "rgba(255,255,255,.35)",
                      }}
                    >
                      JPG, PNG, WEBP • Maks. 5 MB
                    </div>

                    {imagePreview && (
                      <img
                        className="preview"
                        src={imagePreview}
                        alt="Preview"
                      />
                    )}
                  </label>
                </div>

                <div className="form-group full">
                  <label className="form-label">
                    Nama Project *
                  </label>

                  <input
                    className="form-input"
                    name="title"
                    value={form.title}
                    onChange={handleInput}
                    placeholder="Contoh: COREÉATERY"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Kategori ID
                  </label>

                  <input
                    className="form-input"
                    name="category_id"
                    value={form.category_id}
                    onChange={handleInput}
                    placeholder="Website"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Kategori EN
                  </label>

                  <input
                    className="form-input"
                    name="category_en"
                    value={form.category_en}
                    onChange={handleInput}
                    placeholder="Website"
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">
                    Deskripsi Indonesia
                  </label>

                  <textarea
                    className="form-textarea"
                    name="description_id"
                    value={form.description_id}
                    onChange={handleInput}
                    placeholder="Deskripsi project..."
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">
                    English Description
                  </label>

                  <textarea
                    className="form-textarea"
                    name="description_en"
                    value={form.description_en}
                    onChange={handleInput}
                    placeholder="Project description..."
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">
                    Teknologi
                  </label>

                  <input
                    className="form-input"
                    name="tech"
                    value={form.tech}
                    onChange={handleInput}
                    placeholder="React, Vite, Tailwind CSS, Supabase"
                  />

                  <span
                    style={{
                      fontSize: ".68rem",
                      color: "rgba(255,255,255,.35)",
                    }}
                  >
                    Pisahkan dengan koma.
                  </span>
                </div>

                <div className="form-group full">
                  <label className="form-label">
                    Link Project
                  </label>

                  <input
                    className="form-input"
                    name="project_url"
                    value={form.project_url}
                    onChange={handleInput}
                    placeholder="https://contoh.vercel.app"
                    type="url"
                  />
                </div>

                <div className="form-group full">
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleInput}
                    />
                    Jadikan project unggulan
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="admin-save-button"
                  disabled={saving}
                >
                  {saving ? (
                    editingProject
                      ? "Menyimpan perubahan..."
                      : "Mengupload..."
                  ) : (
                    <>
                      {editingProject ? (
                        <>
                          <Pencil size={15} />
                          Simpan Perubahan
                        </>
                      ) : (
                        <>
                          <Upload size={15} />
                          Upload & Simpan
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const authStyles = `
  * {
    box-sizing: border-box;
  }

  .auth-page {
    min-height: 100vh;
    background:
      radial-gradient(circle at 20% 20%, rgba(34,211,238,.1), transparent 35%),
      radial-gradient(circle at 80% 80%, rgba(139,92,246,.09), transparent 35%),
      #05070b;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .auth-card {
    width: 100%;
    max-width: 420px;
    padding: 32px;
    border-radius: 24px;
    background: rgba(255,255,255,.045);
    border: 1px solid rgba(255,255,255,.09);
    backdrop-filter: blur(24px);
    box-shadow: 0 25px 80px rgba(0,0,0,.35);
  }

  .auth-icon {
    width: 54px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background: rgba(34,211,238,.1);
    color: #22d3ee;
    margin-bottom: 22px;
  }

  .auth-eyebrow {
    color: #22d3ee;
    font-size: .7rem;
    font-weight: 800;
    letter-spacing: .12em;
    margin-bottom: 7px;
  }

  .auth-card h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 900;
  }

  .auth-description {
    color: rgba(255,255,255,.5);
    font-size: .88rem;
    margin: 8px 0 25px;
  }

  .auth-label {
    display: block;
    color: rgba(255,255,255,.65);
    font-size: .76rem;
    font-weight: 700;
    margin: 0 0 7px;
  }

  .auth-input {
    width: 100%;
    border: 1px solid rgba(255,255,255,.1);
    background: rgba(255,255,255,.045);
    color: #fff;
    border-radius: 11px;
    padding: 12px;
    margin-bottom: 15px;
    outline: none;
    font-family: inherit;
  }

  .auth-input:focus {
    border-color: rgba(34,211,238,.55);
  }

  .auth-button {
    width: 100%;
    border: none;
    border-radius: 11px;
    padding: 13px;
    margin-top: 4px;
    background: #22d3ee;
    color: #031018;
    font-weight: 900;
    cursor: pointer;
  }

  .auth-button:disabled {
    opacity: .55;
    cursor: not-allowed;
  }

  .auth-error {
    padding: 11px 12px;
    border-radius: 10px;
    margin-bottom: 15px;
    background: rgba(239,68,68,.08);
    border: 1px solid rgba(239,68,68,.15);
    color: #fca5a5;
    font-size: .78rem;
    line-height: 1.5;
  }
`;
