import {
  useState,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import "../App.css";

function Login() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

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
    isBlocked,
    setIsBlocked,
  ] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);
    setIsBlocked(false);
    setMessage("");

    try {
      const response =
        await fetch(
          "http://localhost:3000/api/auth/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        if (
          response.status === 403 &&
          data.message ===
            "Tu cuenta ha sido bloqueada"
        ) {
          setIsBlocked(true);
          return;
        }

        setMessage(
          data.message ||
            "No se pudo iniciar sesión"
        );

        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      navigate(
        "/dashboard"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "No se pudo conectar con el servidor"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearFeedback = () => {
    setIsBlocked(false);
    setMessage("");
  };

  return (
    <main className="login-page">
      <div className="login-background-grid" />

      <div className="login-orb login-orb-one" />
      <div className="login-orb login-orb-two" />

      <Link
        to="/"
        className="login-brand"
        aria-label="Volver al inicio"
      >
        <span className="login-brand-mark">
          S
        </span>

        <span>
          Syndmarq
        </span>
      </Link>

      <section className="login-shell">
        <aside className="login-showcase">
          <div className="login-showcase-content">
            <span className="login-showcase-label">
              ESPACIO PROFESIONAL
            </span>

            <h2>
              Tu trabajo merece
              una presencia a su altura.
            </h2>

            <p>
              Organiza tu perfil, proyectos, enlaces y métricas desde un espacio claro, rápido y profesional.
            </p>

            <div className="login-showcase-points">
              <div>
                <span className="login-point-index">
                  01
                </span>

                <div>
                  <strong>
                    Todo centralizado
                  </strong>

                  <small>
                    Perfil, proyectos
                    y enlaces
                  </small>
                </div>
              </div>

              <div>
                <span className="login-point-index">
                  02
                </span>

                <div>
                  <strong>
                    Comparte fácilmente
                  </strong>

                  <small>
                    URL pública y
                    código QR
                  </small>
                </div>
              </div>

              <div>
                <span className="login-point-index">
                  03
                </span>

                <div>
                  <strong>
                    Mide tu alcance
                  </strong>

                  <small>
                    Estadísticas de
                    visitas
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="login-showcase-preview">
            <div className="login-preview-top">
              <div className="login-preview-dots">
                <span />
                <span />
                <span />
              </div>

              <span>
                syndmarq.app/u/uriel
              </span>
            </div>

            <div className="login-preview-body">
              <div className="login-preview-profile">
                <div className="login-preview-avatar">
                  U
                </div>

                <div>
                  <strong>
                    Uriel Casanova
                  </strong>

                  <span>
                    Desarrollador
                    de Software
                  </span>
                </div>
              </div>

              <div className="login-preview-line login-preview-line-long" />
              <div className="login-preview-line login-preview-line-short" />

              <div className="login-preview-projects">
                <div>
                  <span>WEB</span>
                </div>

                <div>
                  <span>APP</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="login-panel">
          <div className="login-panel-inner">
            <div className="login-heading">
              <span className="login-heading-kicker">
                ACCESO A TU CUENTA
              </span>

              <h1>
                Iniciar sesión
              </h1>

              <p>
                Continúa administrando tu portafolio y mantén tu presencia profesional al día.
              </p>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="login-form"
            >
              <div className="login-field">
                <label
                  htmlFor="email"
                >
                  Correo electrónico
                </label>

                <div className="login-input-wrap">
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

              <div className="login-field">
                <div className="login-label-row">
                  <label
                    htmlFor="password"
                  >
                    Contraseña
                  </label>

                  <button
                    type="button"
                    className="login-forgot"
                    onClick={() =>
                      setMessage(
                        "La recuperación de contraseña estará disponible próximamente."
                      )
                    }
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <div className="login-input-wrap">
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
                    autoComplete="current-password"
                    placeholder="Tu contraseña"
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
                    className="login-password-toggle"
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

              {isBlocked && (
                <div className="login-alert login-alert-blocked">
                  <div className="login-alert-icon">
                    !
                  </div>

                  <div>
                    <strong>
                      Acceso restringido
                    </strong>

                    <p>
                      Tu cuenta se encuentra
                      temporalmente bloqueada.
                      Un administrador debe
                      reactivarla para que
                      puedas ingresar.
                    </p>
                  </div>
                </div>
              )}

              {!isBlocked &&
                message && (
                  <div className="login-alert login-alert-error">
                    <div className="login-alert-icon">
                      i
                    </div>

                    <p>
                      {message}
                    </p>
                  </div>
                )}

              <button
                type="submit"
                className="login-submit"
                disabled={
                  isLoading
                }
              >
                <span>
                  {isLoading
                    ? "Verificando..."
                    : "Iniciar sesión"}
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

            <div className="login-divider">
              <span />
              <p>
                ¿Nuevo en Syndmarq?
              </p>
              <span />
            </div>

            <Link
              to="/register"
              className="login-create-account"
            >
              Crear una cuenta
            </Link>

            <Link
              to="/"
              className="login-back"
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

export default Login;
