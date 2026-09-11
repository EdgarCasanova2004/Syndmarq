import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage("Iniciando sesión...");

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Ocurrió un error");
        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage("Inicio de sesión correcto");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo conectar con el servidor");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Iniciar sesión</h1>

        <p className="auth-subtitle">
          Accede a tu portafolio profesional
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Correo electrónico
          </label>

          <input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">
            Contraseña
          </label>

          <input
            id="password"
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="primary-button"
          >
            Iniciar sesión
          </button>
        </form>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        <p className="auth-footer">
          ¿No tienes una cuenta?{" "}
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