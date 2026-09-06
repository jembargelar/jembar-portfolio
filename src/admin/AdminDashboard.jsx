import "./admin.css";
import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
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
  Sparkles,
  UserRound,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";
import { optimizeImage, formatImageSize } from "../utils/imageOptimizer";
import GalleryManager from "./GalleryManager";
import HeroManager from "./HeroManager";
import AboutManager from "./AboutManager";
import WhatIBuildManager from "./WhatIBuildManager";
import ExperienceManager from "./ExperienceManager";
import SkillsManager from "./SkillsManager";
import EducationManager from "./EducationManager";
import SocialContactManager from "./SocialContactManager";
import SupportManager from "./SupportManager";
import SiteSettingsManager from "./SiteSettingsManager";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "hero",
    label: "Hero",
    icon: Sparkles,
  },
  {
    id: "about",
    label: "About",
    icon: UserRound,
  },
  {
    id: "what-i-build",
    label: "What I Build",
    icon: Sparkles,
  },
  {
    id: "experience",
    label: "Experience",
    icon: BriefcaseBusiness,
  },
  {
    id: "skills",
    label: "Skills",
    icon: Sparkles,
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
  },
  {
    id: "social-contact",
    label: "Social & Contact",
    icon: ContactIcon,
  },
  {
    id: "support",
    label: "Support My Work",
    icon: Heart,
  },
  {
    id: "settings",
    label: "Site Settings",
    icon: Settings,
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

  // Case Study
  problem_id: "",
  problem_en: "",
  solution_id: "",
  solution_en: "",
  features_id: "",
  features_en: "",
  result_id: "",
  result_en: "",
};

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authorizationLoading, setAuthorizationLoading] = useState(true);

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
    let mounted = true;

    async function verifyAdminAccess() {
      if (!session?.user?.id) {
        if (mounted) {
          setIsAdmin(false);
          setAuthorizationLoading(false);
        }
        return;
      }

      setAuthorizationLoading(true);

      const { data, error } = await supabase.rpc("is_admin");

      if (!mounted) return;

      if (error || data !== true) {
        console.error(
          "Admin authorization failed:",
          error || "User bukan admin."
        );

        setIsAdmin(false);
        setAuthorizationLoading(false);

        await supabase.auth.signOut();
        return;
      }

      setIsAdmin(true);
      setAuthorizationLoading(false);
    }

    verifyAdminAccess();

    return () => {
      mounted = false;
    };
  }, [session]);

  useEffect(() => {
    if (session && isAdmin && activeMenu === "projects") {
      loadProjects();
    }
  }, [session, isAdmin, activeMenu]);

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
    } else {
      setLoginError("");
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

      // Case Study
      problem_id: project.problem_id || "",
      problem_en: project.problem_en || "",
      solution_id: project.solution_id || "",
      solution_en: project.solution_en || "",
      features_id: Array.isArray(project.features_id)
        ? project.features_id.join("\n")
        : project.features_id || "",
      features_en: Array.isArray(project.features_en)
        ? project.features_en.join("\n")
        : project.features_en || "",
      result_id: project.result_id || "",
      result_en: project.result_en || "",
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

      const featuresIdArray = form.features_id
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const featuresEnArray = form.features_en
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      // =====================================================
      // EDIT PROJECT
      // =====================================================

      if (editingProject) {
        let imageUrl = editingProject.image_url || "";

        // Upload foto baru hanya jika admin memilih foto baru.
        if (imageFile) {
          const optimizedImage = await optimizeImage(imageFile);

          console.info(
            `[Image Optimizer] Project update: ${formatImageSize(imageFile.size)} → ${formatImageSize(optimizedImage.size)}`
          );

          const safeName =
            form.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "") || "project";

          const fileName = `${Date.now()}-${safeName}.webp`;
          uploadedPath = `projects/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("project-images")
            .upload(uploadedPath, optimizedImage, {
              cacheControl: "3600",
              upsert: false,
              contentType: "image/webp",
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

            // Case Study
            problem_id: form.problem_id.trim(),
            problem_en: form.problem_en.trim(),
            solution_id: form.solution_id.trim(),
            solution_en: form.solution_en.trim(),
            features_id: featuresIdArray,
            features_en: featuresEnArray,
            result_id: form.result_id.trim(),
            result_en: form.result_en.trim(),
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
        const optimizedImage = await optimizeImage(imageFile);

        console.info(
          `[Image Optimizer] Project: ${formatImageSize(imageFile.size)} → ${formatImageSize(optimizedImage.size)}`
        );

        const safeName =
          form.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") || "project";

        const fileName = `${Date.now()}-${safeName}.webp`;
        uploadedPath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(uploadedPath, optimizedImage, {
            cacheControl: "3600",
            upsert: false,
            contentType: "image/webp",
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

            // Case Study
            problem_id: form.problem_id.trim(),
            problem_en: form.problem_en.trim(),
            solution_id: form.solution_id.trim(),
            solution_en: form.solution_en.trim(),
            features_id: featuresIdArray,
            features_en: featuresEnArray,
            result_id: form.result_id.trim(),
            result_en: form.result_en.trim(),
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

  if (authLoading || (session && authorizationLoading)) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <LockKeyhole size={38} />
          <h1>Memeriksa akses...</h1>
          <p>
            {session
              ? "Memverifikasi hak akses admin."
              : "Menyiapkan Admin Panel."}
          </p>
        </div>

        <style>{authStyles}</style>
      </div>
    );
  }

  if (!session || !isAdmin) {
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
                {{
                  dashboard: "Dashboard",
                  hero: "Hero",
                  about: "About",
                  "what-i-build": "What I Build",
                  experience: "Experience",
                  skills: "Skills",
                  education: "Education",
                  "social-contact": "Social & Contact",
                  support: "Support My Work",
                  settings: "Site Settings",
                  projects: "Projects",
                }[activeMenu] || "Dashboard"}
              </h1>

              <p className="admin-subtitle">
                Kelola portfolio lu dari satu tempat.
              </p>
            </div>

            {activeMenu === "hero" && (
              <HeroManager />
            )}

            {activeMenu === "about" && (
              <AboutManager />
            )}

            {activeMenu === "what-i-build" && (
              <WhatIBuildManager />
            )}

            {activeMenu === "experience" && (
              <ExperienceManager />
            )}

            {activeMenu === "skills" && (
              <SkillsManager />
            )}

            {activeMenu === "education" && (
              <EducationManager />
            )}

            {activeMenu === "social-contact" && (
              <SocialContactManager />
            )}

            {activeMenu === "support" && (
              <SupportManager />
            )}

            {activeMenu === "settings" && (
              <SiteSettingsManager />
            )}



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

                {/* =====================================================
                    PROJECT GALLERY
                    ===================================================== */}

                {editingProject?.id && (
                  <GalleryManager
                    projectId={editingProject.id}
                  />
                )}

                {/* =====================================================
                    CASE STUDY
                    ===================================================== */}

                <div
                  className="form-group full"
                  style={{
                    marginTop: "1.5rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".65rem",
                      marginBottom: ".35rem",
                    }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>📋</span>

                    <label
                      className="form-label"
                      style={{
                        margin: 0,
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      Case Study
                    </label>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: ".72rem",
                      lineHeight: 1.6,
                      color: "rgba(255,255,255,.42)",
                    }}
                  >
                    Isi detail project agar halaman detail project memiliki
                    Problem, Solution, Features, dan Result.
                  </p>
                </div>

                {/* Bahasa Indonesia */}

                <div
                  className="form-group full"
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    borderRadius: "14px",
                    background: "rgba(0,220,255,.035)",
                    border: "1px solid rgba(0,220,255,.1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".8rem",
                      fontWeight: 700,
                      marginBottom: "1rem",
                      color: "#67e8f9",
                    }}
                  >
                    🇮🇩 Bahasa Indonesia
                  </div>

                  <div className="form-group full">
                    <label className="form-label">
                      Problem / Masalah
                    </label>

                    <textarea
                      className="form-input"
                      name="problem_id"
                      value={form.problem_id}
                      onChange={handleInput}
                      placeholder="Contoh: Proses pencatatan pesanan masih manual sehingga rawan kesalahan."
                      rows="4"
                    />
                  </div>

                  <div
                    className="form-group full"
                    style={{ marginTop: "1rem" }}
                  >
                    <label className="form-label">
                      Solution / Solusi
                    </label>

                    <textarea
                      className="form-input"
                      name="solution_id"
                      value={form.solution_id}
                      onChange={handleInput}
                      placeholder="Contoh: Membangun sistem digital untuk mengelola menu, pesanan, dan operasional."
                      rows="4"
                    />
                  </div>

                  <div
                    className="form-group full"
                    style={{ marginTop: "1rem" }}
                  >
                    <label className="form-label">
                      Features / Fitur Utama
                    </label>

                    <textarea
                      className="form-input"
                      name="features_id"
                      value={form.features_id}
                      onChange={handleInput}
                      placeholder={`Satu fitur per baris.
Contoh:
Manajemen menu
Manajemen pesanan
Dashboard operasional
Integrasi Supabase`}
                      rows="6"
                    />

                    <span
                      style={{
                        fontSize: ".68rem",
                        color: "rgba(255,255,255,.35)",
                      }}
                    >
                      Satu fitur per baris.
                    </span>
                  </div>

                  <div
                    className="form-group full"
                    style={{ marginTop: "1rem" }}
                  >
                    <label className="form-label">
                      Result / Hasil
                    </label>

                    <textarea
                      className="form-input"
                      name="result_id"
                      value={form.result_id}
                      onChange={handleInput}
                      placeholder="Contoh: Operasional menjadi lebih terstruktur dan informasi pesanan lebih mudah dipantau."
                      rows="4"
                    />
                  </div>
                </div>

                {/* English */}

                <div
                  className="form-group full"
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,.025)",
                    border: "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".8rem",
                      fontWeight: 700,
                      marginBottom: "1rem",
                      color: "rgba(255,255,255,.75)",
                    }}
                  >
                    🇬🇧 English
                  </div>

                  <div className="form-group full">
                    <label className="form-label">
                      Problem
                    </label>

                    <textarea
                      className="form-input"
                      name="problem_en"
                      value={form.problem_en}
                      onChange={handleInput}
                      placeholder="Example: The restaurant still relied on manual order recording, increasing the risk of errors."
                      rows="4"
                    />
                  </div>

                  <div
                    className="form-group full"
                    style={{ marginTop: "1rem" }}
                  >
                    <label className="form-label">
                      Solution
                    </label>

                    <textarea
                      className="form-input"
                      name="solution_en"
                      value={form.solution_en}
                      onChange={handleInput}
                      placeholder="Example: Built a digital system to manage menus, orders, and restaurant operations."
                      rows="4"
                    />
                  </div>

                  <div
                    className="form-group full"
                    style={{ marginTop: "1rem" }}
                  >
                    <label className="form-label">
                      Features
                    </label>

                    <textarea
                      className="form-input"
                      name="features_en"
                      value={form.features_en}
                      onChange={handleInput}
                      placeholder={`One feature per line.
Example:
Menu management
Order management
Operations dashboard
Supabase integration`}
                      rows="6"
                    />

                    <span
                      style={{
                        fontSize: ".68rem",
                        color: "rgba(255,255,255,.35)",
                      }}
                    >
                      One feature per line.
                    </span>
                  </div>

                  <div
                    className="form-group full"
                    style={{ marginTop: "1rem" }}
                  >
                    <label className="form-label">
                      Result
                    </label>

                    <textarea
                      className="form-input"
                      name="result_en"
                      value={form.result_en}
                      onChange={handleInput}
                      placeholder="Example: Operations became more structured and order information became easier to monitor."
                      rows="4"
                    />
                  </div>
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
