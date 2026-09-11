import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage("Registrando...");

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Ocurrió un error");
        return;
      }

      setMessage("Cuenta creada correctamente");

      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo conectar con el servidor");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Crear cuenta</h1>

        <p className="auth-subtitle">
          Crea tu portafolio profesional
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <label htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="urielcasanova"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            required
          />

          <label htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Crea una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="primary-button"
          >
            Crear cuenta
          </button>
        </form>

        {message && (
          <p className="auth-message">{message}</p>
        )}

        <p className="auth-footer">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login">
            Iniciar sesión
          </Link>
        </p>

        <Link to="/">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}

export default Register;