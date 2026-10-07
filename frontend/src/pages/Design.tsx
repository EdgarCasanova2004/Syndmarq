import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface ThemeOption {
  id: string;
  name: string;
  description: string;
}

const themes: ThemeOption[] = [
  {
    id: "default",
    name: "Default",
    description: "Diseño limpio, elegante y profesional.",
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Tema oscuro con profundidad y efectos luminosos.",
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Degradados modernos con movimiento y colores vibrantes.",
  },
  {
    id: "glass",
    name: "Glass",
    description: "Transparencias suaves y efecto de cristal esmerilado.",
  },
  {
    id: "neo",
    name: "Neo",
    description: "Estilo tecnológico con bordes brillantes y detalles futuristas.",
  },
];

const API_URL = "https://portavia-api.onrender.com";

const designStyles = `
  .dv-page {
    --dv-ink: #17243a;
    --dv-muted: #718096;
    --dv-blue: #5479a8;
    min-height: 100vh;
    padding: 38px clamp(18px, 5vw, 72px) 72px;
    color: var(--dv-ink);
    background:
      radial-gradient(ellipse at 8% 0%, rgba(205, 224, 242, .46), transparent 33%),
      radial-gradient(ellipse at 95% 35%, rgba(226, 234, 242, .7), transparent 28%),
      #f5f8fb;
  }

  .dv-page *,
  .dv-page *::before,
  .dv-page *::after {
    box-sizing: border-box;
  }

  .dv-shell {
    width: min(1180px, 100%);
    margin: 0 auto;
  }

  .dv-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 26px;
  }

  .dv-eyebrow {
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

  .dv-eyebrow::before {
    width: 20px;
    height: 1px;
    background: #94abc4;
    content: "";
  }

  .dv-header h1 {
    margin: 0;
    font-size: clamp(29px, 4vw, 42px);
    letter-spacing: -.045em;
    line-height: 1.08;
  }

  .dv-intro {
    max-width: 570px;
    margin: 12px 0 0;
    color: var(--dv-muted);
    font-size: 14px;
    line-height: 1.7;
  }

  .dv-button {
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
    cursor: pointer;
    transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
  }

  .dv-button:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  .dv-button:disabled {
    cursor: default;
    opacity: .62;
  }

  .dv-button-secondary {
    color: #526b87;
    border-color: #dfe7ef;
    background: rgba(255,255,255,.8);
  }

  .dv-button-primary {
    color: white;
    background: linear-gradient(135deg, #6487b3, #436994);
    box-shadow: 0 9px 20px rgba(63, 99, 143, .18);
  }

  .dv-button-primary:hover:not(:disabled) {
    box-shadow: 0 12px 24px rgba(63, 99, 143, .25);
  }

  .dv-showcase {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(250px, .78fr);
    align-items: center;
    gap: 26px;
    overflow: hidden;
    min-height: 245px;
    margin-bottom: 25px;
    border: 1px solid rgba(223, 231, 239, .9);
    border-radius: 23px;
    padding: clamp(22px, 4vw, 38px);
    background: rgba(255,255,255,.78);
    box-shadow: 0 18px 50px rgba(36, 57, 79, .055);
    backdrop-filter: blur(16px);
  }

  .dv-showcase-copy {
    animation: dv-copy-in .45s both;
  }

  @keyframes dv-copy-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .dv-showcase-copy .dv-eyebrow {
    margin-bottom: 12px;
  }

  .dv-showcase-copy h2 {
    margin: 0;
    font-size: clamp(24px, 3vw, 34px);
    letter-spacing: -.04em;
  }

  .dv-showcase-copy p {
    max-width: 460px;
    margin: 10px 0 0;
    color: var(--dv-muted);
    font-size: 13px;
    line-height: 1.65;
  }

  .dv-current-label {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-top: 18px;
    border: 1px solid #e1eaf1;
    border-radius: 999px;
    padding: 7px 11px;
    color: #587492;
    background: #f6f9fb;
    font-size: 11px;
    font-weight: 700;
  }

  .dv-current-label::before {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #72a78a;
    content: "";
  }

  .dv-live-frame {
    display: grid;
    min-height: 178px;
    place-items: center;
    perspective: 900px;
  }

  .dv-live-preview {
    position: relative;
    overflow: hidden;
    width: min(100%, 310px);
    min-height: 168px;
    border: 1px solid rgba(215, 225, 235, .9);
    border-radius: 19px;
    padding: 16px;
    background: #fff;
    box-shadow: 0 18px 42px rgba(40, 64, 91, .15);
    animation: dv-preview-in .55s cubic-bezier(.2,.8,.2,1) both;
  }

  @keyframes dv-preview-in {
    from { opacity: 0; transform: translateY(12px) rotateX(5deg) scale(.97); }
    to { opacity: 1; transform: translateY(0) rotateX(0) scale(1); }
  }

  .dv-live-preview::before {
    position: absolute;
    top: -45px;
    right: -28px;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: rgba(146, 184, 218, .2);
    filter: blur(18px);
    content: "";
  }

  .dv-preview-profile {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .dv-preview-avatar {
    display: grid;
    width: 36px;
    height: 36px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    color: #54779c;
    background: #e8f0f7;
    font-size: 13px;
    font-weight: 750;
  }

  .dv-preview-person {
    display: grid;
    gap: 6px;
  }

  .dv-preview-person span:first-child {
    width: 90px;
    height: 8px;
    border-radius: 5px;
    background: currentColor;
    opacity: .78;
  }

  .dv-preview-person span:last-child {
    width: 65px;
    height: 5px;
    border-radius: 5px;
    background: currentColor;
    opacity: .35;
  }

  .dv-preview-links {
    position: relative;
    display: grid;
    gap: 7px;
    margin-top: 15px;
  }

  .dv-preview-link {
    height: 18px;
    border: 1px solid rgba(150, 170, 190, .22);
    border-radius: 7px;
    background: rgba(255,255,255,.72);
  }

  .dv-preview-projects {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7px;
    margin-top: 9px;
  }

  .dv-preview-projects span {
    height: 34px;
    border-radius: 8px;
    background: rgba(119, 151, 183, .16);
  }

  .dv-theme-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .dv-theme-card {
    display: block;
    min-width: 0;
    overflow: hidden;
    border: 1px solid #e3eaf1;
    border-radius: 19px;
    padding: 10px;
    color: inherit;
    background: rgba(255,255,255,.82);
    text-align: left;
    cursor: pointer;
    transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease;
  }

  .dv-theme-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 30px rgba(41, 65, 91, .09);
  }

  .dv-theme-card-selected {
    border-color: #89a6c5;
    box-shadow: 0 0 0 3px rgba(112, 147, 184, .13), 0 14px 30px rgba(41, 65, 91, .07);
  }

  .dv-theme-card:focus-visible {
    outline: 3px solid rgba(84, 121, 168, .35);
    outline-offset: 3px;
  }

  .dv-theme-art {
    position: relative;
    display: flex;
    min-height: 130px;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    border-radius: 13px;
    padding: 16px;
    transition: filter .3s ease, transform .3s ease;
  }

  .dv-theme-card:hover .dv-theme-art {
    filter: saturate(1.08);
  }

  .dv-art-profile {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .dv-art-avatar {
    width: 22px;
    height: 22px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: rgba(112, 147, 184, .32);
  }

  .dv-art-lines {
    display: grid;
    gap: 5px;
  }

  .dv-art-lines span {
    display: block;
    width: 64px;
    height: 5px;
    border-radius: 4px;
    background: currentColor;
    opacity: .65;
  }

  .dv-art-lines span:last-child {
    width: 42px;
    opacity: .3;
  }

  .dv-art-link {
    height: 13px;
    margin-top: 7px;
    border: 1px solid currentColor;
    border-radius: 5px;
    opacity: .19;
  }

  .dv-art-projects {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-top: 7px;
  }

  .dv-art-projects span {
    height: 20px;
    border-radius: 5px;
    background: currentColor;
    opacity: .12;
  }

  .dv-art-default {
    color: #435a73;
    background: linear-gradient(145deg, #f8fbfd, #e8f0f6);
  }

  .dv-art-midnight {
    color: #e6edf7;
    background: linear-gradient(145deg, #101a2c, #243a59);
  }

  .dv-art-midnight .dv-art-avatar {
    background: linear-gradient(135deg, #6f94c0, #8b76bb);
    box-shadow: 0 0 18px rgba(123, 153, 213, .45);
  }

  .dv-art-aurora {
    color: #34435b;
    background:
      radial-gradient(circle at 82% 12%, rgba(255, 185, 217, .8), transparent 36%),
      radial-gradient(circle at 14% 92%, rgba(132, 207, 210, .75), transparent 40%),
      linear-gradient(140deg, #f1efff, #e8f8f4);
  }

  .dv-art-aurora::after {
    position: absolute;
    inset: -50% auto -50% -60%;
    width: 35%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.42), transparent);
    transform: rotate(22deg);
    animation: dv-shimmer 5s ease-in-out infinite;
    content: "";
  }

  @keyframes dv-shimmer {
    0%, 35% { left: -60%; }
    70%, 100% { left: 140%; }
  }

  .dv-art-glass {
    color: #405a75;
    background:
      radial-gradient(circle at 80% 20%, #c8dbef, transparent 37%),
      linear-gradient(140deg, #e8f2f8, #f5f7fa);
  }

  .dv-art-glass::before {
    position: absolute;
    inset: 13px;
    border: 1px solid rgba(255,255,255,.8);
    border-radius: 10px;
    background: rgba(255,255,255,.27);
    box-shadow: 0 8px 18px rgba(67, 97, 127, .1);
    backdrop-filter: blur(7px);
    content: "";
  }

  .dv-art-glass > * {
    z-index: 1;
  }

  .dv-art-neo {
    color: #c9f8f1;
    background: linear-gradient(145deg, #101c27, #172c38);
  }

  .dv-art-neo .dv-art-avatar {
    border: 1px solid #64e7d2;
    background: rgba(81, 225, 201, .2);
    box-shadow: 0 0 15px rgba(81, 225, 201, .32);
  }

  .dv-art-neo .dv-art-link {
    border-color: rgba(99, 230, 210, .58);
    opacity: .5;
  }

  .dv-theme-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    padding: 13px 6px 5px;
  }

  .dv-theme-info h3 {
    margin: 0;
    font-size: 14px;
    letter-spacing: -.015em;
  }

  .dv-theme-info p {
    margin: 5px 0 0;
    color: var(--dv-muted);
    font-size: 11px;
    line-height: 1.5;
  }

  .dv-selected-mark {
    display: grid;
    width: 22px;
    height: 22px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: #5e82ad;
    font-size: 12px;
    animation: dv-check-in .24s ease both;
  }

  @keyframes dv-check-in {
    from { opacity: 0; transform: scale(.6); }
    to { opacity: 1; transform: scale(1); }
  }

  .dv-theme-saved {
    display: inline-flex;
    align-items: center;
    margin-top: 7px;
    border: 1px solid #e1eaf1;
    border-radius: 999px;
    padding: 4px 7px;
    color: #68809a;
    background: #f6f9fb;
    font-size: 9px;
    font-weight: 700;
  }

  .dv-actions {
    position: sticky;
    z-index: 5;
    bottom: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 22px;
    border: 1px solid rgba(223, 231, 239, .95);
    border-radius: 17px;
    padding: 13px 16px;
    background: rgba(255,255,255,.88);
    box-shadow: 0 14px 38px rgba(36, 57, 79, .1);
    backdrop-filter: blur(16px);
  }

  .dv-actions-label {
    margin: 0 0 3px;
    color: #8795a5;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  .dv-actions strong {
    font-size: 14px;
  }

  .dv-message {
    margin: 13px 0 0;
    border: 1px solid #e3eaf1;
    border-radius: 12px;
    padding: 11px 13px;
    color: #5c7188;
    background: rgba(255,255,255,.8);
    font-size: 12px;
  }

  .dv-message-error {
    border-color: #f0dede;
    color: #9a5656;
    background: #fff6f5;
  }

  .dv-loading {
    display: grid;
    min-height: 60vh;
    place-items: center;
    color: var(--dv-muted);
    font-size: 14px;
  }

  @media (max-width: 850px) {
    .dv-theme-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 650px) {
    .dv-page {
      padding: 25px 14px 48px;
    }

    .dv-header {
      align-items: flex-start;
      flex-direction: column;
      gap: 17px;
      margin-bottom: 20px;
    }

    .dv-header > .dv-button {
      width: 100%;
    }

    .dv-intro {
      font-size: 13px;
    }

    .dv-showcase {
      grid-template-columns: 1fr;
      gap: 18px;
      padding: 22px 18px;
      border-radius: 19px;
    }

    .dv-live-frame {
      min-height: 145px;
    }

    .dv-live-preview {
      min-height: 150px;
    }

    .dv-theme-grid {
      grid-template-columns: 1fr;
      gap: 11px;
    }

    .dv-theme-card {
      display: grid;
      grid-template-columns: minmax(105px, .72fr) minmax(0, 1fr);
      align-items: center;
      gap: 10px;
      padding: 9px;
    }

    .dv-theme-art {
      min-height: 98px;
      padding: 11px;
    }

    .dv-theme-info {
      padding: 6px 4px;
    }

    .dv-actions {
      bottom: 8px;
      margin-top: 16px;
      padding: 11px 12px;
    }

    .dv-actions .dv-button {
      min-height: 42px;
      padding: 0 13px;
    }
  }

  @media (max-width: 380px) {
    .dv-theme-card {
      grid-template-columns: 100px minmax(0, 1fr);
    }

    .dv-theme-info p {
      font-size: 10px;
    }

    .dv-actions {
      align-items: flex-start;
      flex-direction: column;
    }

    .dv-actions .dv-button {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dv-page *,
    .dv-page *::before,
    .dv-page *::after {
      animation-duration: .01ms !important;
      transition-duration: .01ms !important;
    }
  }
`;

function Design() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const hasUser = Boolean(localStorage.getItem("user"));

  const [selectedTheme, setSelectedTheme] = useState("default");
  const [savedTheme, setSavedTheme] = useState("default");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);

  useEffect(() => {
    if (!token || !hasUser) {
      navigate("/login");
      return;
    }

    const loadTheme = async () => {
      try {
        const response = await fetch(`${API_URL}/api/design`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "No se pudo cargar el diseño.");
          setMessageIsError(true);
          return;
        }

        const theme = themes.some((item) => item.id === data.theme)
          ? data.theme
          : "default";

        setSelectedTheme(theme);
        setSavedTheme(theme);
      } catch (error) {
        console.error(error);
        setMessage("No se pudo conectar con el servidor.");
        setMessageIsError(true);
      } finally {
        setLoading(false);
      }
    };

    void loadTheme();
  }, [token, hasUser, navigate]);

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    setMessage("");
    setMessageIsError(false);
  };

  const handleSave = async () => {
    if (!token || selectedTheme === savedTheme) return;

    setSaving(true);
    setMessage("");
    setMessageIsError(false);

    try {
      const response = await fetch(`${API_URL}/api/design`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ theme: selectedTheme }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        setMessage(data.message || "No se pudo guardar el diseño.");
        setMessageIsError(true);
        return;
      }

      setSavedTheme(selectedTheme);
      setMessage("Diseño guardado correctamente.");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo conectar con el servidor.");
      setMessageIsError(true);
    } finally {
      setSaving(false);
    }
  };

  if (!token || !hasUser) {
    return null;
  }

  if (loading) {
    return (
      <main className="dv-page">
        <style>{designStyles}</style>
        <div className="dv-loading">Preparando tus diseños…</div>
      </main>
    );
  }

  const activeTheme =
    themes.find((theme) => theme.id === selectedTheme) ?? themes[0];

  return (
    <main className="dv-page">
      <style>{designStyles}</style>

      <div className="dv-shell">
        <header className="dv-header">
          <div>
            <p className="dv-eyebrow">Portavia · Personalización</p>
            <h1>Diseño de tu portafolio</h1>
            <p className="dv-intro">
              Elige la apariencia que mejor representa tu trabajo. Puedes cambiar de tema
              y guardar tu selección cuando estés listo.
            </p>
          </div>

          <button
            className="dv-button dv-button-secondary"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            ← Volver al dashboard
          </button>
        </header>

        <section className="dv-showcase" aria-live="polite">
          <div key={activeTheme.id} className="dv-showcase-copy">
            <p className="dv-eyebrow">Vista previa seleccionada</p>
            <h2>{activeTheme.name}</h2>
            <p>{activeTheme.description}</p>
            <span className="dv-current-label">
              {savedTheme === selectedTheme
                ? "Este tema está aplicado"
                : "Vista previa · Aún no guardado"}
            </span>
          </div>

          <div className="dv-live-frame">
            <div
              key={selectedTheme}
              className={`dv-live-preview dv-art-${selectedTheme}`}
              aria-label={`Vista previa del tema ${activeTheme.name}`}
            >
              <div className="dv-preview-profile">
                <div className="dv-preview-avatar">U</div>
                <div className="dv-preview-person">
                  <span />
                  <span />
                </div>
              </div>

              <div className="dv-preview-links">
                <div className="dv-preview-link" />
                <div className="dv-preview-link" />
              </div>

              <div className="dv-preview-projects">
                <span />
                <span />
              </div>
            </div>
          </div>
        </section>

        <section className="dv-theme-grid" aria-label="Temas disponibles">
          {themes.map((theme) => {
            const isSelected = selectedTheme === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                className={`dv-theme-card ${
                  isSelected ? "dv-theme-card-selected" : ""
                }`}
                onClick={() => handleSelectTheme(theme.id)}
                aria-pressed={isSelected}
              >
                <div className={`dv-theme-art dv-art-${theme.id}`}>
                  <div className="dv-art-profile">
                    <span className="dv-art-avatar" />
                    <span className="dv-art-lines">
                      <span />
                      <span />
                    </span>
                  </div>
                  <div className="dv-art-link" />
                  <div className="dv-art-link" />
                  <div className="dv-art-projects">
                    <span />
                    <span />
                  </div>
                </div>

                <div className="dv-theme-info">
                  <div>
                    <h3>{theme.name}</h3>
                    <p>{theme.description}</p>
                    {savedTheme === theme.id && (
                      <span className="dv-theme-saved">Aplicado</span>
                    )}
                  </div>
                  {isSelected && (
                    <span className="dv-selected-mark" aria-label="Seleccionado">
                      ✓
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </section>

        <section className="dv-actions">
          <div>
            <p className="dv-actions-label">Tema seleccionado</p>
            <strong>{activeTheme.name}</strong>
          </div>

          <button
            className="dv-button dv-button-primary"
            type="button"
            onClick={() => void handleSave()}
            disabled={saving || selectedTheme === savedTheme}
          >
            {saving
              ? "Guardando…"
              : selectedTheme === savedTheme
                ? "Diseño guardado"
                : "Guardar diseño"}
          </button>
        </section>

        {message && (
          <p
            className={`dv-message ${messageIsError ? "dv-message-error" : ""}`}
            role="status"
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
}

export default Design;