import {
  useState,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import "../App.css";

function Register() {
  const navigate =
    useNavigate();

  const [
    name,
    setName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    username,
    setUsername,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    isSuccess,
    setIsSuccess,
  ] = useState(false);

  const clearFeedback = () => {
    setMessage("");
    setIsSuccess(false);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response =
        await fetch(
          "http://localhost:3000/api/auth/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              email,
              username,
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "No se pudo crear la cuenta"
        );

        return;
      }

      setIsSuccess(true);

      setMessage(
        "Tu cuenta se creó correctamente. Ya puedes iniciar sesión."
      );

      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);

      setMessage(
        "No se pudo conectar con el servidor"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-background-grid" />

      <div className="register-orb register-orb-one" />
      <div className="register-orb register-orb-two" />

      <Link
        to="/"
        className="register-brand"
        aria-label="Volver al inicio"
      >
        <span className="register-brand-mark">
          S
        </span>

        <span>
          Syndmarq
        </span>
      </Link>

      <section className="register-shell">
        <aside className="register-showcase">
          <div className="register-showcase-content">
            <span className="register-showcase-label">
              CREA TU ESPACIO PROFESIONAL
            </span>

            <h2>
              Todo lo que haces,
              en un lugar que sí
              te represente.
            </h2>

            <p>
              Construye un portafolio
              claro, profesional y
              preparado para compartir
              tus proyectos, experiencia
              y enlaces.
            </p>

            <div className="register-feature-list">
              <div>
                <span className="register-feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="m12 3 8 4-8 4-8-4 8-4Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />

                    <path
                      d="m4 12 8 4 8-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div>
                  <strong>
                    Perfil centralizado
                  </strong>

                  <small>
                    Reúne tu información,
                    proyectos y enlaces.
                  </small>
                </div>
              </div>

              <div>
                <span className="register-feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      cx="18"
                      cy="5"
                      r="2.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <circle
                      cx="6"
                      cy="12"
                      r="2.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <circle
                      cx="18"
                      cy="19"
                      r="2.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <path
                      d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                </span>

                <div>
                  <strong>
                    Comparte en segundos
                  </strong>

                  <small>
                    Usa tu URL pública
                    o código QR.
                  </small>
                </div>
              </div>

              <div>
                <span className="register-feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 20V10M10 20V4M16 20v-7M22 20V7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <div>
                  <strong>
                    Mide tu alcance
                  </strong>

                  <small>
                    Consulta las visitas
                    de tu portafolio.
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="register-preview">
            <div className="register-preview-top">
              <div className="register-preview-dots">
                <span />
                <span />
                <span />
              </div>

              <span>
                syndmarq.app/u/tuusuario
              </span>
            </div>

            <div className="register-preview-body">
              <div className="register-preview-profile">
                <div className="register-preview-avatar">
                  T
                </div>

                <div>
                  <strong>
                    Tu nombre
                  </strong>

                  <span>
                    Tu profesión
                  </span>
                </div>
              </div>

              <div className="register-preview-copy">
                <span />
                <span />
              </div>

              <div className="register-preview-projects">
                <div>
                  <small>
                    PROYECTO
                  </small>

                  <strong>
                    01
                  </strong>
                </div>

                <div>
                  <small>
                    PROYECTO
                  </small>

                  <strong>
                    02
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="register-panel">
          <div className="register-panel-inner">
            <div className="register-heading">
              <span className="register-heading-kicker">
                COMIENZA AHORA
              </span>

              <h1>
                Crear cuenta
              </h1>

              <p>
                Crea tu espacio profesional
                y empieza a construir tu
                portafolio.
              </p>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="register-form"
            >
              <div className="register-field">
                <label
                  htmlFor="name"
                >
                  Nombre
                </label>

                <div className="register-input-wrap">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <path
                      d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>

                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre completo"
                    value={name}
                    onChange={(
                      e
                    ) => {
                      setName(
                        e.target.value
                      );

                      clearFeedback();
                    }}
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <label
                  htmlFor="email"
                >
                  Correo electrónico
                </label>

                <div className="register-input-wrap">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6h16v12H4z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />

                    <path
                      d="m4 7 8 6 8-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(
                      e
                    ) => {
                      setEmail(
                        e.target.value
                      );

                      clearFeedback();
                    }}
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <label
                  htmlFor="username"
                >
                  Username
                </label>

                <div className="register-input-wrap">
                  <span className="register-username-prefix">
                    @
                  </span>

                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="tuusuario"
                    value={username}
                    onChange={(
                      e
                    ) => {
                      setUsername(
                        e.target.value
                      );

                      clearFeedback();
                    }}
                    minLength={3}
                    required
                  />
                </div>

                <span className="register-field-help">
                  Este será parte de tu URL pública.
                </span>
              </div>

              <div className="register-field">
                <label
                  htmlFor="password"
                >
                  Contraseña
                </label>

                <div className="register-input-wrap">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <path
                      d="M8 10V7a4 4 0 0 1 8 0v3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Crea una contraseña"
                    value={password}
                    onChange={(
                      e
                    ) => {
                      setPassword(
                        e.target.value
                      );

                      clearFeedback();
                    }}
                    required
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (
                          current
                        ) =>
                          !current
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                  >
                    {showPassword
                      ? "Ocultar"
                      : "Ver"}
                  </button>
                </div>
              </div>

              {message && (
                <div
                  className={
                    isSuccess
                      ? "register-alert register-alert-success"
                      : "register-alert register-alert-error"
                  }
                >
                  <div className="register-alert-icon">
                    {isSuccess
                      ? "✓"
                      : "i"}
                  </div>

                  <div>
                    {isSuccess && (
                      <strong>
                        Cuenta creada
                      </strong>
                    )}

                    <p>
                      {message}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="register-submit"
                disabled={
                  isLoading
                }
              >
                <span>
                  {isLoading
                    ? "Creando cuenta..."
                    : "Crear cuenta"}
                </span>

                {!isLoading && (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="m13 6 6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </form>

            {isSuccess ? (
              <button
                type="button"
                className="register-login-after-success"
                onClick={() =>
                  navigate(
                    "/login"
                  )
                }
              >
                Ir a iniciar sesión
              </button>
            ) : (
              <>
                <div className="register-divider">
                  <span />
                  <p>
                    ¿Ya tienes una cuenta?
                  </p>
                  <span />
                </div>

                <Link
                  to="/login"
                  className="register-login-link"
                >
                  Iniciar sesión
                </Link>
              </>
            )}

            <Link
              to="/"
              className="register-back"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M19 12H5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="m11 18-6-6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              Volver al inicio
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Register;
