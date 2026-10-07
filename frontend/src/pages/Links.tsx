import { useEffect, useState, type FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import "../App.css";

interface LinkItem {

  id: number;

  title: string;

  url: string;

  icon: string | null;

  sort_order: number;

  is_active: boolean;

}

const API_URL = "https://portavia-api.onrender.com";

const getUrlHost = (rawUrl: string) => {
  try {
    const value = rawUrl.trim();
    const normalizedUrl = /^https?:\/\//i.test(value)
      ? value
      : `https://${value}`;
    return new URL(normalizedUrl).hostname.replace(/^www\./i, "");
  } catch {
    return "";
  }
};

const getFaviconUrl = (rawUrl: string) => {
  const host = getUrlHost(rawUrl);
  return host
    ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=128`
    : "";
};

function LinkIcon({ url, title }: { url: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const faviconUrl = getFaviconUrl(url);

  return (
    <div className="pv-link-icon" aria-hidden="true">
      {faviconUrl && !failed ? (
        <img src={faviconUrl} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span>{title.trim().charAt(0).toUpperCase() || "↗"}</span>
      )}
    </div>
  );
}

const pageStyles = `

  .pv-links {

    --ink: #17243a;

    --muted: #718096;

    --blue: #5479a8;

    --line: #e5ebf1;

    min-height: 100vh;

    padding: 38px clamp(18px, 5vw, 72px) 72px;

    color: var(--ink);

    background:

      radial-gradient(ellipse at 8% 0%, rgba(205, 224, 242, .46), transparent 33%),

      radial-gradient(ellipse at 95% 35%, rgba(226, 234, 242, .7), transparent 28%),

      #f5f8fb;

  }

  .pv-links *,

  .pv-links *::before,

  .pv-links *::after {

    box-sizing: border-box;

  }

  .pv-links-shell {

    width: min(1180px, 100%);

    margin: 0 auto;

  }

  .pv-links-header {

    display: flex;

    justify-content: space-between;

    align-items: flex-end;

    gap: 24px;

    margin-bottom: 30px;

  }

  .pv-links-eyebrow {

    display: inline-flex;

    align-items: center;

    gap: 9px;

    margin: 0 0 10px;

    color: #6f86a1;

    font-size: 11px;

    font-weight: 750;

    letter-spacing: .16em;

    text-transform: uppercase;

  }

  .pv-links-eyebrow::before {

    width: 20px;

    height: 1px;

    background: #94abc4;

    content: "";

  }

  .pv-links-header h1 {

    margin: 0;

    font-size: clamp(30px, 4vw, 43px);

    letter-spacing: -.045em;

    line-height: 1.08;

  }

  .pv-links-intro {

    max-width: 570px;

    margin: 12px 0 0;

    color: var(--muted);

    font-size: 15px;

    line-height: 1.7;

  }

  .pv-links-button {

    display: inline-flex;

    min-height: 44px;

    align-items: center;

    justify-content: center;

    gap: 9px;

    border: 1px solid transparent;

    border-radius: 13px;

    padding: 0 17px;

    font: inherit;

    font-size: 13px;

    font-weight: 700;

    text-decoration: none;

    cursor: pointer;

    transition: transform .2s ease, box-shadow .2s ease, background .2s ease;

  }

  .pv-links-button:hover:not(:disabled) {

    transform: translateY(-2px);

  }

  .pv-links-button:disabled {

    cursor: wait;

    opacity: .58;

  }

  .pv-links-primary {

    color: white;

    background: linear-gradient(135deg, #6487b3, #436994);

    box-shadow: 0 9px 20px rgba(63, 99, 143, .18);

  }

  .pv-links-secondary {

    color: #526b87;

    border-color: #dfe7ef;

    background: rgba(255,255,255,.8);

  }

  .pv-links-layout {

    display: grid;

    grid-template-columns: minmax(290px, .78fr) minmax(0, 1.5fr);

    align-items: start;

    gap: 22px;

  }

  .pv-links-panel {

    border: 1px solid rgba(223, 231, 239, .9);

    border-radius: 22px;

    background: rgba(255,255,255,.84);

    box-shadow: 0 18px 50px rgba(36, 57, 79, .055);

    backdrop-filter: blur(16px);

  }

  .pv-links-form-panel {

    position: sticky;

    top: 24px;

    padding: 24px;

  }

  .pv-links-panel-heading {

    display: flex;

    align-items: flex-start;

    justify-content: space-between;

    gap: 12px;

    margin-bottom: 22px;

  }

  .pv-links-panel-heading h2,

  .pv-links-list-heading h2 {

    margin: 0;

    font-size: 19px;

    letter-spacing: -.025em;

  }

  .pv-links-panel-heading p {

    margin: 7px 0 0;

    color: var(--muted);

    font-size: 13px;

    line-height: 1.55;

  }

  .pv-links-step {

    display: grid;

    width: 34px;

    height: 34px;

    flex: 0 0 auto;

    place-items: center;

    border: 1px solid #e1eaf3;

    border-radius: 11px;

    color: #6b87a6;

    background: #f2f7fb;

    font-size: 12px;

    font-weight: 750;

  }

  .pv-links-form {

    display: grid;

    gap: 15px;

  }

  .pv-links-field {

    display: grid;

    gap: 7px;

  }

  .pv-links-field label {

    color: #3c4c61;

    font-size: 12px;

    font-weight: 700;

  }

  .pv-links-field input {

    width: 100%;

    min-height: 44px;

    border: 1px solid #e1e8ef;

    border-radius: 12px;

    outline: none;

    padding: 11px 13px;

    color: var(--ink);

    background: rgba(255,255,255,.86);

    font: inherit;

    font-size: 13px;

    transition: border .2s ease, box-shadow .2s ease;

  }

  .pv-links-field input:focus {

    border-color: #91abc8;

    box-shadow: 0 0 0 4px rgba(112, 147, 184, .12);

  }

  .pv-links-help {

    margin: 0;

    color: #8795a5;

    font-size: 11px;

    line-height: 1.5;

  }

  .pv-links-check {

    display: flex;

    align-items: center;

    gap: 9px;

    border-top: 1px solid #edf1f5;

    padding-top: 14px;

    color: #526276;

    font-size: 12px;

    cursor: pointer;

  }

  .pv-links-check input {

    width: 15px;

    height: 15px;

    accent-color: #5e82ad;

  }

  .pv-links-form-actions {

    display: flex;

    flex-wrap: wrap;

    gap: 9px;

  }

  .pv-links-alert {

    margin: 0;

    border: 1px solid #e3eaf1;

    border-radius: 12px;

    padding: 11px 12px;

    color: #5c7188;

    background: #f4f8fb;

    font-size: 12px;

    line-height: 1.5;

    opacity: 1;

    transform: translateY(0);

    transition: opacity .35s ease, transform .35s ease;

  }

  .pv-links-alert--fading {

    opacity: 0;

    transform: translateY(-5px);

    pointer-events: none;

  }

  .pv-links-alert-success {

    border-color: #d9ebe3;

    color: #3d755d;

    background: #f1f8f4;

  }

  .pv-links-alert-error {

    border-color: #f0dede;

    color: #9a5656;

    background: #fff6f5;

  }

  .pv-links-list-panel {

    min-height: 360px;

    padding: 24px;

  }

  .pv-links-list-heading {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 14px;

    margin-bottom: 19px;

  }

  .pv-links-count {

    border: 1px solid #e2eaf1;

    border-radius: 999px;

    padding: 7px 11px;

    color: #6b7e92;

    background: #f7fafc;

    font-size: 11px;

    font-weight: 700;

    white-space: nowrap;

  }

  .pv-links-grid {

    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 13px;

  }

  .pv-link-card {

    min-width: 0;

    border: 1px solid #e6ecf2;

    border-radius: 17px;

    padding: 16px;

    background: rgba(255,255,255,.92);

    transition: transform .22s ease, box-shadow .22s ease;

    animation: pv-link-in .4s both;

  }

  .pv-link-card:hover {

    transform: translateY(-3px);

    box-shadow: 0 14px 30px rgba(41, 65, 91, .09);

  }

  @keyframes pv-link-in {

    from { opacity: 0; transform: translateY(8px); }

    to { opacity: 1; transform: translateY(0); }

  }

  .pv-link-card-top {

    display: flex;

    align-items: center;

    gap: 11px;

    min-width: 0;

  }

  .pv-link-icon {

    display: grid;

    width: 43px;

    height: 43px;

    flex: 0 0 auto;

    place-items: center;

    border: 1px solid #e2eaf2;

    border-radius: 14px;

    color: #52769d;

    background: linear-gradient(145deg, #f5f9fc, #eaf1f7);

    font-size: 16px;

    font-weight: 750;

  }

  .pv-link-icon img {

    width: 23px;

    height: 23px;

    object-fit: contain;

  }

  .pv-links-icon-preview {

    display: flex;

    align-items: center;

    gap: 10px;

    margin-top: 10px;

    color: #718096;

    font-size: 11px;

  }

  .pv-links-icon-preview .pv-link-icon {

    width: 36px;

    height: 36px;

    border-radius: 11px;

  }

  .pv-links-icon-preview .pv-link-icon img {

    width: 20px;

    height: 20px;

  }

  .pv-link-title-wrap {

    min-width: 0;

  }

  .pv-link-card h3 {

    overflow: hidden;

    margin: 0;

    font-size: 15px;

    letter-spacing: -.02em;

    text-overflow: ellipsis;

    white-space: nowrap;

  }

  .pv-link-state {

    display: inline-flex;

    align-items: center;

    gap: 6px;

    margin-top: 5px;

    color: #8995a3;

    font-size: 10px;

    font-weight: 700;

  }

  .pv-link-state::before {

    width: 7px;

    height: 7px;

    border-radius: 50%;

    background: #b9c3ce;

    content: "";

  }

  .pv-link-state-active::before {

    background: #62a486;

    box-shadow: 0 0 0 3px rgba(98,164,134,.12);

  }

  .pv-link-url {

    display: block;

    overflow: hidden;

    margin: 15px 0 13px;

    color: #6c829b;

    font-size: 11px;

    text-decoration: none;

    text-overflow: ellipsis;

    white-space: nowrap;

  }

  .pv-link-url:hover {

    color: #385b86;

    text-decoration: underline;

  }

  .pv-link-card-bottom {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 9px;

    border-top: 1px solid #edf1f5;

    padding-top: 11px;

  }

  .pv-link-position {

    color: #8995a3;

    font-size: 10px;

    white-space: nowrap;

  }

  .pv-link-actions {

    display: flex;

    flex-wrap: wrap;

    justify-content: flex-end;

    gap: 5px;

  }

  .pv-link-actions button {

    min-height: 29px;

    border: 0;

    border-radius: 8px;

    padding: 0 8px;

    color: #5d7897;

    background: #f3f7fa;

    font: inherit;

    font-size: 10px;

    font-weight: 700;

    cursor: pointer;

    transition: background .18s ease, opacity .18s ease;

  }

  .pv-link-actions button:hover:not(:disabled) {

    background: #e8eff5;

  }

  .pv-link-actions button:disabled {

    cursor: default;

    opacity: .4;

  }

  .pv-link-actions .pv-link-delete {

    color: #a56868;

    background: #fbf3f2;

  }

  .pv-links-empty,

  .pv-links-loading {

    display: grid;

    min-height: 260px;

    place-items: center;

    border: 1px dashed #d7e1ea;

    border-radius: 16px;

    padding: 28px;

    text-align: center;

    background: rgba(248,250,252,.65);

  }

  .pv-links-empty-mark {

    display: grid;

    width: 48px;

    height: 48px;

    margin: 0 auto 13px;

    place-items: center;

    border: 1px solid #e2eaf2;

    border-radius: 16px;

    color: #718ba8;

    background: #f0f5f9;

    font-size: 21px;

  }

  .pv-links-empty h3 {

    margin: 0;

    font-size: 15px;

  }

  .pv-links-empty p {

    max-width: 320px;

    margin: 8px auto 0;

    color: var(--muted);

    font-size: 12px;

    line-height: 1.6;

  }

  .pv-links-loading {

    color: var(--muted);

    font-size: 13px;

  }

  @media (max-width: 900px) {

    .pv-links-layout {

      grid-template-columns: 1fr;

    }

    .pv-links-form-panel {

      position: static;

    }

  }

  @media (max-width: 620px) {

    .pv-links {

      padding: 25px 14px 48px;

    }

    .pv-links-header {

      align-items: flex-start;

      flex-direction: column;

      gap: 17px;

      margin-bottom: 21px;

    }

    .pv-links-header > .pv-links-button {

      width: 100%;

    }

    .pv-links-intro {

      font-size: 13px;

    }

    .pv-links-form-panel,

    .pv-links-list-panel {

      padding: 18px;

      border-radius: 18px;

    }

    .pv-links-grid {

      grid-template-columns: 1fr;

    }

    .pv-links-form-actions .pv-links-button {

      flex: 1;

    }

  }

  @media (prefers-reduced-motion: reduce) {

    .pv-links *,

    .pv-links *::before,

    .pv-links *::after {

      animation-duration: .01ms !important;

      transition-duration: .01ms !important;

    }

  }

`;

function Links() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [links, setLinks] = useState<LinkItem[]>([]);

  const [title, setTitle] = useState("");

  const [url, setUrl] = useState("");

  const [isActive, setIsActive] = useState(true);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<"info" | "success" | "error">("info");

  const [messageFading, setMessageFading] = useState(false);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [busyOrderId, setBusyOrderId] = useState<number | null>(null);

  const showMessage = (

    text: string,

    type: "info" | "success" | "error" = "info",

  ) => {

    setMessage(text);

    setMessageType(type);

    setMessageFading(false);

  };

  useEffect(() => {

    if (!message || messageType === "info") {

      setMessageFading(false);

      return;

    }

    const fadeTimer = window.setTimeout(() => setMessageFading(true), 1500);

    const clearTimer = window.setTimeout(() => {

      setMessage("");

      setMessageType("info");

      setMessageFading(false);

    }, 1900);

    return () => {

      window.clearTimeout(fadeTimer);

      window.clearTimeout(clearTimer);

    };

  }, [message, messageType]);

  const loadLinks = async () => {

    try {

      const response = await fetch(`${API_URL}/api/links`, {

        headers: { Authorization: `Bearer ${token}` },

      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

        return;

      }

      if (!response.ok) {

        showMessage(data.message || "No se pudieron cargar los enlaces.", "error");

        return;

      }

      setLinks(data.links ?? []);

    } catch (error) {

      console.error(error);

      showMessage("No se pudo conectar con el servidor.", "error");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (!token) {

      navigate("/login");

      return;

    }

    void loadLinks();

    // Carga la lista al entrar a esta pantalla.

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const clearForm = () => {

    setTitle("");

    setUrl("");

    setIsActive(true);

    setEditingId(null);

    const titleInput = document.getElementById("linkTitle") as HTMLInputElement | null;

    titleInput?.focus();

  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    if (!title.trim()) {

      showMessage("El título del enlace es obligatorio.", "error");

      return;

    }

    if (!url.trim()) {

      showMessage("La URL es obligatoria.", "error");

      return;

    }

    try {

      setSaving(true);

      showMessage(editingId ? "Actualizando enlace…" : "Creando enlace…");

      const endpoint = editingId

        ? `${API_URL}/api/links/${editingId}`

        : `${API_URL}/api/links`;

      const response = await fetch(endpoint, {

        method: editingId ? "PUT" : "POST",

        headers: {

          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,

        },

        body: JSON.stringify({

          title: title.trim(),

          url: url.trim(),

          icon: getUrlHost(url),

          isActive,

        }),

      });

      const data = await response.json();

      if (!response.ok) {

        showMessage(data.message || "No se pudo guardar el enlace.", "error");

        return;

      }

      showMessage(

        editingId ? "Enlace actualizado correctamente." : "Enlace creado correctamente.",

        "success",

      );

      clearForm();

      await loadLinks();

    } catch (error) {

      console.error(error);

      showMessage("No se pudo conectar con el servidor.", "error");

    } finally {

      setSaving(false);

    }

  };

  const handleEdit = (link: LinkItem) => {

    setEditingId(link.id);

    setTitle(link.title);

    setUrl(link.url);

    setIsActive(link.is_active);

    showMessage("");

    window.scrollTo({ top: 0, behavior: "smooth" });

  };

  const handleDelete = async (id: number) => {

    if (!window.confirm("¿Seguro que deseas eliminar este enlace?")) return;

    try {

      const response = await fetch(`${API_URL}/api/links/${id}`, {

        method: "DELETE",

        headers: { Authorization: `Bearer ${token}` },

      });

      const data = await response.json();

      if (!response.ok) {

        showMessage(data.message || "No se pudo eliminar el enlace.", "error");

        return;

      }

      showMessage("Enlace eliminado correctamente.", "success");

      await loadLinks();

    } catch (error) {

      console.error(error);

      showMessage("No se pudo conectar con el servidor.", "error");

    }

  };

  const handleMove = async (id: number, direction: "up" | "down") => {

    try {

      setBusyOrderId(id);

      const response = await fetch(`${API_URL}/api/links/${id}/order`, {

        method: "PUT",

        headers: {

          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,

        },

        body: JSON.stringify({ direction }),

      });

      const data = await response.json();

      if (!response.ok) {

        showMessage(data.message || "No se pudo cambiar el orden.", "error");

        return;

      }

      showMessage("Orden actualizado correctamente.", "success");

      await loadLinks();

    } catch (error) {

      console.error(error);

      showMessage("No se pudo conectar con el servidor.", "error");

    } finally {

      setBusyOrderId(null);

    }

  };

  return (

    <main className="pv-links">

      <style>{pageStyles}</style>

      <div className="pv-links-shell">

        <header className="pv-links-header">

          <div>

            <p className="pv-links-eyebrow">Portavia · Tu espacio profesional</p>

            <h1>Mis enlaces</h1>

            <p className="pv-links-intro">

              Reúne en un solo lugar tus redes, medios de contacto y espacios de trabajo.

              Puedes ordenarlos para dar prioridad a los más importantes.

            </p>

          </div>

          <button

            className="pv-links-button pv-links-secondary"

            type="button"

            onClick={() => navigate("/dashboard")}

          >

            ← <span>Volver al dashboard</span>

          </button>

        </header>

        <div className="pv-links-layout">

          <section className="pv-links-panel pv-links-form-panel">

            <div className="pv-links-panel-heading">

              <div>

                <h2>{editingId ? "Editar enlace" : "Añade un enlace"}</h2>

                <p>

                  {editingId

                    ? "Actualiza la información y guarda los cambios."

                    : "Agrega un acceso útil para quienes visiten tu portafolio."}

                </p>

              </div>

              <span className="pv-links-step">{editingId ? "02" : "01"}</span>

            </div>

            <form className="pv-links-form" onSubmit={handleSubmit}>

              <div className="pv-links-field">

                <label htmlFor="linkTitle">Nombre del enlace</label>

                <input

                  id="linkTitle"

                  type="text"

                  placeholder="Ej. Mi perfil de GitHub"

                  value={title}

                  onChange={(event) => setTitle(event.target.value)}

                  maxLength={80}

                  required

                />

              </div>

              <div className="pv-links-field">

                <label htmlFor="linkUrl">Dirección web</label>

                <input

                  id="linkUrl"

                  type="url"

                  placeholder="https://..."

                  value={url}

                  onChange={(event) => setUrl(event.target.value)}

                  required

                />

                <p className="pv-links-help">

                  Incluye https:// al principio de la dirección.

                </p>

              </div>

              {url && (

                <div className="pv-links-icon-preview" aria-live="polite">

                  <LinkIcon key={url} url={url} title={title || "Enlace"} />

                  <span>El icono se obtiene automáticamente de esta dirección.</span>

                </div>

              )}

<label className="pv-links-check">

                <input

                  type="checkbox"

                  checked={isActive}

                  onChange={(event) => setIsActive(event.target.checked)}

                />

                Mostrar este enlace en mi portafolio

              </label>

              <div className="pv-links-form-actions">

                <button

                  className="pv-links-button pv-links-primary"

                  type="submit"

                  disabled={saving}

                >

                  {saving

                    ? "Guardando…"

                    : editingId

                      ? "Guardar cambios"

                      : "Crear enlace"}

                </button>

                {editingId && (

                  <button

                    className="pv-links-button pv-links-secondary"

                    type="button"

                    onClick={clearForm}

                    disabled={saving}

                  >

                    Cancelar

                  </button>

                )}

              </div>

              {message && (

                <p

                  className={`pv-links-alert ${

                    messageType === "success"

                      ? "pv-links-alert-success"

                      : messageType === "error"

                        ? "pv-links-alert-error"

                        : ""

                  } ${messageFading ? "pv-links-alert--fading" : ""}`}

                  role="status"

                >

                  {message}

                </p>

              )}

            </form>

          </section>

          <section className="pv-links-panel pv-links-list-panel">

            <div className="pv-links-list-heading">

              <div>

                <p className="pv-links-eyebrow">Tu colección</p>

                <h2>Enlaces del portafolio</h2>

              </div>

              <span className="pv-links-count">

                {links.length} {links.length === 1 ? "enlace" : "enlaces"}

              </span>

            </div>

            {loading ? (

              <div className="pv-links-loading">Cargando tus enlaces…</div>

            ) : links.length === 0 ? (

              <div className="pv-links-empty">

                <div>

                  <div className="pv-links-empty-mark">↗</div>

                  <h3>Todavía no agregas enlaces</h3>

                  <p>

                    Añade tus redes profesionales, tu correo o cualquier sitio que quieras

                    compartir desde tu portafolio.

                  </p>

                </div>

              </div>

            ) : (

              <div className="pv-links-grid">

                {links.map((link, index) => (

                  <article className="pv-link-card" key={link.id}>

                    <div className="pv-link-card-top">

                      <LinkIcon key={`${link.id}-${link.url}`} url={link.url} title={link.title} />

                      <div className="pv-link-title-wrap">

                        <h3>{link.title}</h3>

                        <span

                          className={`pv-link-state ${

                            link.is_active ? "pv-link-state-active" : ""

                          }`}

                        >

                          {link.is_active ? "Activo" : "Inactivo"}

                        </span>

                      </div>

                    </div>

                    <a

                      className="pv-link-url"

                      href={link.url}

                      target="_blank"

                      rel="noreferrer"

                      title={link.url}

                    >

                      {link.url}

                    </a>

                    <div className="pv-link-card-bottom">

                      <span className="pv-link-position">Posición {index + 1}</span>

                      <div className="pv-link-actions">

                        <button

                          type="button"

                          aria-label={`Subir ${link.title}`}

                          title="Subir"

                          disabled={index === 0 || busyOrderId !== null}

                          onClick={() => void handleMove(link.id, "up")}

                        >

                          ↑

                        </button>

                        <button

                          type="button"

                          aria-label={`Bajar ${link.title}`}

                          title="Bajar"

                          disabled={

                            index === links.length - 1 || busyOrderId !== null

                          }

                          onClick={() => void handleMove(link.id, "down")}

                        >

                          ↓

                        </button>

                        <button type="button" onClick={() => handleEdit(link)}>

                          Editar

                        </button>

                        <button

                          className="pv-link-delete"

                          type="button"

                          onClick={() => void handleDelete(link.id)}

                        >

                          Eliminar

                        </button>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            )}

          </section>

        </div>

      </div>

    </main>

  );

}

export default Links;