import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ThemeOption {
  id: string;
  name: string;
  description: string;
}

const themes: ThemeOption[] = [
  {
    id: "default",
    name: "Default",
    description:
      "Diseño limpio, elegante y profesional.",
  },
  {
    id: "midnight",
    name: "Midnight",
    description:
      "Tema oscuro con profundidad y efectos luminosos.",
  },
  {
    id: "aurora",
    name: "Aurora",
    description:
      "Degradados modernos con movimiento y colores vibrantes.",
  },
  {
    id: "glass",
    name: "Glass",
    description:
      "Glassmorphism moderno con transparencias y desenfoque.",
  },
  {
    id: "neo",
    name: "Neo",
    description:
      "Estilo tecnológico con bordes brillantes y efectos futuristas.",
  },
];

function Design() {
  const navigate = useNavigate();

  const [selectedTheme, setSelectedTheme] =
    useState("default");

  const [savedTheme, setSavedTheme] =
    useState("default");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const token = localStorage.getItem("token");

  const userData =
    localStorage.getItem("user");

  const user = userData
    ? JSON.parse(userData)
    : null;

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
      return;
    }

    const loadTheme = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/design",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        const data = await response.json();

        if (response.ok) {
          setSelectedTheme(
            data.theme || "default"
          );

          setSavedTheme(
            data.theme || "default"
          );
        }
      } catch (error) {
        console.error(error);

        setMessage(
          "No se pudo cargar el diseño"
        );
      } finally {
        setLoading(false);
      }
    };

    loadTheme();
  }, [token, navigate]);

  const handleSave = async () => {
    if (!token) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/design",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            theme: selectedTheme,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "No se pudo guardar el diseño"
        );

        return;
      }

      setSavedTheme(selectedTheme);

      setMessage(
        "Diseño guardado correctamente"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "No se pudo conectar con el servidor"
      );
    } finally {
      setSaving(false);
    }
  };

  if (!token || !user) {
    return null;
  }

  if (loading) {
    return (
      <div className="design-page">
        <div className="design-loading">
          Cargando diseños...
        </div>
      </div>
    );
  }

  return (
    <div className="design-page">
      <header className="design-header">
        <div>
          <p>
            Personalización
          </p>

          <h1>
            Diseño de tu portafolio
          </h1>

          <span>
            Elige cómo quieres que se vea
            tu perfil público.
          </span>
        </div>

        <button
          className="secondary-button"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Volver
        </button>
      </header>

      <section className="theme-grid">
        {themes.map((theme) => (
          <article
            key={theme.id}
            className={`theme-card ${
              selectedTheme === theme.id
                ? "theme-card-selected"
                : ""
            }`}
            onClick={() =>
              setSelectedTheme(theme.id)
            }
          >
            <div
              className={`theme-preview theme-preview-${theme.id}`}
            >
              <div className="theme-preview-glow" />

              <div className="theme-preview-profile">
                <div className="theme-preview-avatar">
                  U
                </div>

                <div className="theme-preview-lines">
                  <span />
                  <span />
                </div>
              </div>

              <div className="theme-preview-link" />
              <div className="theme-preview-link" />

              <div className="theme-preview-projects">
                <div />
                <div />
              </div>
            </div>

            <div className="theme-card-content">
              <div>
                <h2>
                  {theme.name}
                </h2>

                <p>
                  {theme.description}
                </p>
              </div>

              {savedTheme === theme.id && (
                <span className="theme-current">
                  Actual
                </span>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="design-actions">
        <div>
          <p>
            Tema seleccionado
          </p>

          <strong>
            {
              themes.find(
                (theme) =>
                  theme.id === selectedTheme
              )?.name
            }
          </strong>
        </div>

        <button
          className="primary-button"
          onClick={handleSave}
          disabled={
            saving ||
            selectedTheme === savedTheme
          }
        >
          {saving
            ? "Guardando..."
            : selectedTheme === savedTheme
            ? "Diseño guardado"
            : "Guardar diseño"}
        </button>
      </section>

      {message && (
        <div className="design-message">
          {message}
        </div>
      )}
    </div>
  );
}

export default Design;