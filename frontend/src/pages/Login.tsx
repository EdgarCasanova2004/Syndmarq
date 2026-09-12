import {
  useState,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

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
    setMessage(
      "Iniciando sesión..."
    );

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
          setMessage("");
          return;
        }

        setMessage(
          data.message ||
            "Ocurrió un error"
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

      setMessage(
        "Inicio de sesión correcto"
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

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>
          Iniciar sesión
        </h1>

        <p className="auth-subtitle">
          Accede a tu portafolio
          profesional
        </p>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <label
            htmlFor="email"
          >
            Correo electrónico
          </label>

          <input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(
              e
            ) => {
              setEmail(
                e.target.value
              );

              setIsBlocked(
                false
              );

              setMessage("");
            }}
            required
          />

          <label
            htmlFor="password"
          >
            Contraseña
          </label>

          <input
            id="password"
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(
              e
            ) => {
              setPassword(
                e.target.value
              );

              setIsBlocked(
                false
              );

              setMessage("");
            }}
            required
          />

          <button
            type="submit"
            className="primary-button"
            disabled={
              isLoading
            }
          >
            {isLoading
              ? "Verificando..."
              : "Iniciar sesión"}
          </button>
        </form>

        {isBlocked && (
          <div className="login-blocked-card">
            <div className="login-blocked-icon">
              !
            </div>

            <div className="login-blocked-content">
              <strong>
                Acceso restringido
              </strong>

              <p>
                Tu cuenta se
                encuentra temporalmente
                bloqueada.
              </p>

              <span>
                No podrás acceder
                a tu portafolio hasta
                que un administrador
                reactive tu cuenta.
              </span>
            </div>
          </div>
        )}

        {!isBlocked &&
          message && (
            <p className="auth-message">
              {message}
            </p>
          )}

        <p className="auth-footer">
          ¿No tienes una
          cuenta?{" "}

          <Link to="/register">
            Crear cuenta
          </Link>
        </p>

        <Link to="/">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}

export default Login;