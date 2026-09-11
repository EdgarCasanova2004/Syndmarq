import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setName(data.user.name || "");
        setProfession(data.user.profession || "");
        setBio(data.user.bio || "");
      } catch (error) {
        console.error(error);
        setMessage("No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage("Guardando...");

    try {
      const response = await fetch(
        "http://localhost:3000/api/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name,
            profession,
            bio,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Ocurrió un error");
        return;
      }

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const currentUser = JSON.parse(storedUser);

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...currentUser,
            name: data.user.name,
          })
        );
      }

      setMessage("Perfil actualizado correctamente");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo conectar con el servidor");
    }
  };

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-card">
          <p>Cargando perfil...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <p>Portafolio</p>
          <h1>Mi perfil</h1>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/dashboard")}
        >
          Volver al Dashboard
        </button>
      </div>

      <div className="profile-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Nombre
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="profession">
            Título profesional
          </label>

          <input
            id="profession"
            type="text"
            placeholder="Ej. Desarrollador de Software"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />

          <label htmlFor="bio">
            Biografía
          </label>

          <textarea
            id="bio"
            placeholder="Cuéntanos un poco sobre ti..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={6}
          />

          <button
            type="submit"
            className="primary-button"
          >
            Guardar cambios
          </button>

          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;