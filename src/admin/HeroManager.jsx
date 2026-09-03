import { useEffect, useState } from "react";
import {
  Save,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { supabase } from "../api/supabaseClient";

const emptyHero = {
  id: "",
  name: "",
  role_id: "",
  role_en: "",
  tagline_id: "",
  tagline_en: "",
  description_id: "",
  description_en: "",
  location_id: "",
  location_en: "",
  profile_image_url: "",
  cv_url: "",
  primary_cta_id: "",
  primary_cta_en: "",
  secondary_cta_id: "",
  secondary_cta_en: "",
  is_active: true,
};

export default function HeroManager() {
  const [hero, setHero] = useState(emptyHero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadHero();
  }, []);

  async function loadHero() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error: fetchError } = await supabase
        .from("hero_content")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      if (data) {
        setHero({
          ...emptyHero,
          ...data,
        });

        setImagePreview(data.profile_image_url || "");
      } else {
        setHero(emptyHero);
        setImagePreview("");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal memuat Hero: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleInput(e) {
    const { name, value, type, checked } = e.target;

    setHero((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleImage(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran foto maksimal 5 MB.");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setImagePreview(localPreview);

    setUploadingImage(true);

    let uploadedPath = null;

    try {
      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${Date.now()}-profile.${extension}`;
      uploadedPath = `profile/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(uploadedPath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("project-images")
        .getPublicUrl(uploadedPath);

      setHero((current) => ({
        ...current,
        profile_image_url: publicUrl,
      }));

      setImagePreview(publicUrl);
      setMessage("Foto berhasil diupload. Jangan lupa klik Simpan Hero.");
    } catch (err) {
      console.error(err);

      setError("Upload foto gagal: " + err.message);

      setImagePreview(hero.profile_image_url || "");

      if (uploadedPath) {
        await supabase.storage
          .from("project-images")
          .remove([uploadedPath]);
      }
    } finally {
      setUploadingImage(false);

      if (localPreview) {
        URL.revokeObjectURL(localPreview);
      }
    }
  }

  async function saveHero(e) {
    e.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        name: hero.name.trim(),
        role_id: hero.role_id.trim(),
        role_en: hero.role_en.trim(),
        tagline_id: hero.tagline_id.trim(),
        tagline_en: hero.tagline_en.trim(),
        description_id: hero.description_id.trim(),
        description_en: hero.description_en.trim(),
        location_id: hero.location_id.trim(),
        location_en: hero.location_en.trim(),
        profile_image_url: hero.profile_image_url.trim(),
        cv_url: hero.cv_url.trim(),
        primary_cta_id: hero.primary_cta_id.trim(),
        primary_cta_en: hero.primary_cta_en.trim(),
        secondary_cta_id: hero.secondary_cta_id.trim(),
        secondary_cta_en: hero.secondary_cta_en.trim(),
        is_active: hero.is_active,
      };

      if (!payload.name) {
        throw new Error("Nama wajib diisi.");
      }

      let result;

      if (hero.id) {
        result = await supabase
          .from("hero_content")
          .update(payload)
          .eq("id", hero.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from("hero_content")
          .insert(payload)
          .select()
          .single();
      }

      if (result.error) {
        throw new Error(result.error.message);
      }

      setHero({
        ...emptyHero,
        ...result.data,
      });

      setImagePreview(result.data.profile_image_url || "");

      setMessage("Hero berhasil disimpan.");
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan Hero: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="hero-manager-loading">
        <RefreshCw size={20} className="spin" />
        Memuat konten Hero...
      </div>
    );
  }

  return (
    <form onSubmit={saveHero}>
      <div className="cms-panel">
        <div className="cms-panel-header">
          <div>
            <div className="cms-eyebrow">HERO CMS</div>
            <h2 className="cms-title">
              Hero Website
            </h2>
            <p className="cms-description">
              Kelola seluruh konten bagian Hero tanpa menyentuh kode.
            </p>
          </div>

          <div className="cms-status">
            <span
              className={`status-dot ${
                hero.is_active ? "active" : "inactive"
              }`}
            />
            {hero.is_active ? "Aktif" : "Nonaktif"}
          </div>
        </div>

        {message && (
          <div className="cms-message">
            <CheckCircle2 size={17} />
            {message}
          </div>
        )}

        {error && (
          <div className="cms-error">
            <AlertCircle size={17} />
            {error}
          </div>
        )}

        <div className="cms-section">
          <div className="cms-section-title">
            Identitas
          </div>

          <div className="cms-grid">
            <div className="cms-field full">
              <label>Nama</label>
              <input
                className="cms-input"
                name="name"
                value={hero.name}
                onChange={handleInput}
                placeholder="Jembar Gelar Kusumah Wibawa"
              />
            </div>

            <div className="cms-field">
              <label>Role Indonesia</label>
              <input
                className="cms-input"
                name="role_id"
                value={hero.role_id}
                onChange={handleInput}
                placeholder="Administrative Professional × Web Developer"
              />
            </div>

            <div className="cms-field">
              <label>Role English</label>
              <input
                className="cms-input"
                name="role_en"
                value={hero.role_en}
                onChange={handleInput}
                placeholder="Administrative Professional × Web Developer"
              />
            </div>

            <div className="cms-field">
              <label>Lokasi Indonesia</label>
              <input
                className="cms-input"
                name="location_id"
                value={hero.location_id}
                onChange={handleInput}
                placeholder="Garut, Indonesia"
              />
            </div>

            <div className="cms-field">
              <label>Location English</label>
              <input
                className="cms-input"
                name="location_en"
                value={hero.location_en}
                onChange={handleInput}
                placeholder="Garut, Indonesia"
              />
            </div>
          </div>
        </div>

        <div className="cms-section">
          <div className="cms-section-title">
            Tagline
          </div>

          <div className="cms-grid">
            <div className="cms-field">
              <label>Tagline Indonesia</label>
              <textarea
                className="cms-input cms-textarea"
                name="tagline_id"
                value={hero.tagline_id}
                onChange={handleInput}
                rows="3"
              />
            </div>

            <div className="cms-field">
              <label>Tagline English</label>
              <textarea
                className="cms-input cms-textarea"
                name="tagline_en"
                value={hero.tagline_en}
                onChange={handleInput}
                rows="3"
              />
            </div>
          </div>
        </div>

        <div className="cms-section">
          <div className="cms-section-title">
            Deskripsi
          </div>

          <div className="cms-grid">
            <div className="cms-field">
              <label>Deskripsi Indonesia</label>
              <textarea
                className="cms-input cms-textarea"
                name="description_id"
                value={hero.description_id}
                onChange={handleInput}
                rows="6"
              />
            </div>

            <div className="cms-field">
              <label>Description English</label>
              <textarea
                className="cms-input cms-textarea"
                name="description_en"
                value={hero.description_en}
                onChange={handleInput}
                rows="6"
              />
            </div>
          </div>
        </div>

        <div className="cms-section">
          <div className="cms-section-title">
            Foto Profil
          </div>

          <div className="profile-upload-layout">
            <div className="profile-preview-box">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview profile"
                  className="profile-preview"
                />
              ) : (
                <div className="profile-empty">
                  <ImageIcon size={35} />
                  <span>Belum ada foto</span>
                </div>
              )}
            </div>

            <div>
              <label className="cms-upload-button">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  disabled={uploadingImage}
                />

                <Upload size={17} />

                {uploadingImage
                  ? "Mengupload..."
                  : "Pilih Foto dari Galeri"}
              </label>

              <p className="cms-help">
                JPG, PNG, WEBP • Maks. 5 MB
              </p>

              <p className="cms-help">
                Foto akan langsung disimpan ke storage website.
              </p>
            </div>
          </div>
        </div>

        <div className="cms-section">
          <div className="cms-section-title">
            File & CTA
          </div>

          <div className="cms-grid">
            <div className="cms-field full">
              <label>CV URL / Path</label>
              <input
                className="cms-input"
                name="cv_url"
                value={hero.cv_url}
                onChange={handleInput}
                placeholder="/Jembar_CV.pdf"
              />
              <span className="cms-help">
                Untuk sekarang gunakan path file yang sudah tersedia.
              </span>
            </div>

            <div className="cms-field">
              <label>Primary CTA Indonesia</label>
              <input
                className="cms-input"
                name="primary_cta_id"
                value={hero.primary_cta_id}
                onChange={handleInput}
              />
            </div>

            <div className="cms-field">
              <label>Primary CTA English</label>
              <input
                className="cms-input"
                name="primary_cta_en"
                value={hero.primary_cta_en}
                onChange={handleInput}
              />
            </div>

            <div className="cms-field">
              <label>Secondary CTA Indonesia</label>
              <input
                className="cms-input"
                name="secondary_cta_id"
                value={hero.secondary_cta_id}
                onChange={handleInput}
              />
            </div>

            <div className="cms-field">
              <label>Secondary CTA English</label>
              <input
                className="cms-input"
                name="secondary_cta_en"
                value={hero.secondary_cta_en}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>

        <div className="cms-section">
          <label className="cms-toggle">
            <input
              type="checkbox"
              name="is_active"
              checked={hero.is_active}
              onChange={handleInput}
            />
            <span>
              Tampilkan Hero di website
            </span>
          </label>
        </div>

        <div className="cms-footer">
          <button
            type="submit"
            className="cms-save-button"
            disabled={saving || uploadingImage}
          >
            {saving ? (
              <>
                <RefreshCw size={17} className="spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save size={17} />
                Simpan Hero
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .cms-panel {
          background: rgba(255,255,255,.045);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(18px);
        }

        .cms-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 25px;
        }

        .cms-eyebrow {
          color: #22d3ee;
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .13em;
          margin-bottom: 7px;
        }

        .cms-title {
          margin: 0;
          font-size: 1.4rem;
          font-weight: 900;
        }

        .cms-description {
          margin: 7px 0 0;
          color: rgba(255,255,255,.45);
          font-size: .82rem;
        }

        .cms-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 11px;
          border-radius: 999px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.08);
          color: rgba(255,255,255,.65);
          font-size: .72rem;
          font-weight: 700;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #64748b;
        }

        .status-dot.active {
          background: #22d3ee;
          box-shadow: 0 0 12px rgba(34,211,238,.7);
        }

        .cms-message,
        .cms-error {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px 14px;
          border-radius: 11px;
          margin-bottom: 18px;
          font-size: .78rem;
        }

        .cms-message {
          background: rgba(34,211,238,.08);
          border: 1px solid rgba(34,211,238,.15);
          color: #67e8f9;
        }

        .cms-error {
          background: rgba(239,68,68,.08);
          border: 1px solid rgba(239,68,68,.15);
          color: #fca5a5;
        }

        .cms-section {
          padding: 20px 0;
          border-top: 1px solid rgba(255,255,255,.07);
        }

        .cms-section:first-of-type {
          border-top: none;
        }

        .cms-section-title {
          margin-bottom: 15px;
          font-size: .86rem;
          font-weight: 800;
          color: rgba(255,255,255,.85);
        }

        .cms-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .cms-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .cms-field.full {
          grid-column: 1 / -1;
        }

        .cms-field label {
          font-size: .72rem;
          color: rgba(255,255,255,.58);
          font-weight: 700;
        }

        .cms-input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.045);
          color: #fff;
          border-radius: 10px;
          padding: 11px 12px;
          outline: none;
          font: inherit;
          font-size: .8rem;
        }

        .cms-input:focus {
          border-color: rgba(34,211,238,.5);
          box-shadow: 0 0 0 3px rgba(34,211,238,.06);
        }

        .cms-textarea {
          resize: vertical;
          min-height: 90px;
          line-height: 1.55;
        }

        .profile-upload-layout {
          display: grid;
          grid-template-columns: 170px 1fr;
          gap: 20px;
          align-items: center;
        }

        .profile-preview-box {
          width: 170px;
          height: 170px;
          border-radius: 18px;
          overflow: hidden;
          background: rgba(255,255,255,.035);
          border: 1px solid rgba(255,255,255,.08);
        }

        .profile-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .profile-empty {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: rgba(255,255,255,.3);
          font-size: .7rem;
        }

        .cms-upload-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 14px;
          border-radius: 10px;
          background: rgba(34,211,238,.1);
          border: 1px solid rgba(34,211,238,.2);
          color: #67e8f9;
          font-size: .78rem;
          font-weight: 800;
          cursor: pointer;
        }

        .cms-upload-button input {
          display: none;
        }

        .cms-help {
          margin: 7px 0 0;
          color: rgba(255,255,255,.32);
          font-size: .67rem;
          line-height: 1.5;
        }

        .cms-toggle {
          display: flex;
          align-items: center;
          gap: 9px;
          color: rgba(255,255,255,.72);
          font-size: .8rem;
          font-weight: 700;
          cursor: pointer;
        }

        .cms-footer {
          display: flex;
          justify-content: flex-end;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,.07);
        }

        .cms-save-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          border-radius: 11px;
          padding: 12px 17px;
          background: #22d3ee;
          color: #031018;
          font-weight: 900;
          cursor: pointer;
        }

        .cms-save-button:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .hero-manager-loading {
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: rgba(255,255,255,.5);
          font-size: .82rem;
        }

        .spin {
          animation: cms-spin 1s linear infinite;
        }

        @keyframes cms-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 700px) {
          .cms-panel {
            padding: 17px;
          }

          .cms-panel-header {
            flex-direction: column;
          }

          .cms-grid {
            grid-template-columns: 1fr;
          }

          .cms-field.full {
            grid-column: auto;
          }

          .profile-upload-layout {
            grid-template-columns: 1fr;
          }

          .profile-preview-box {
            width: 150px;
            height: 150px;
          }

          .cms-footer {
            justify-content: stretch;
          }

          .cms-save-button {
            width: 100%;
          }
        }
      `}</style>
    </form>
  );
}
