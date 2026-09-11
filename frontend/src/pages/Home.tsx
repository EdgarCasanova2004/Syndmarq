import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="app">
      <header className="navbar">
        <h2 className="logo">Syndmarq</h2>

        <nav>
          <a href="#">Inicio</a>
          <a href="#">Cómo funciona</a>
          <a href="#">Beneficios</a>
          <a href="#">Contacto</a>
        </nav>

        <Link to="/login" className="login-button link-button">
          Iniciar sesión
        </Link>
      </header>

      <main className="hero">
        <section className="hero-content">
          <p className="hero-label">
            Tu identidad profesional en un solo lugar
          </p>

          <h1>
            Tu talento merece más que un simple enlace.
          </h1>

          <p className="hero-description">
            Crea tu portafolio profesional, reúne tus mejores
            proyectos y comparte todo lo que sabes hacer desde
            un solo enlace.
          </p>

          <div className="hero-buttons">
            <Link
              to="/register"
              className="primary-button link-button"
            >
              Crear mi portafolio gratis
            </Link>

            <button className="secondary-button">
              Ver ejemplo
            </button>
          </div>
        </section>

        <section className="preview-card">
          <div className="profile-image">
            U
          </div>

          <h3>Uriel Casanova</h3>

          <p className="profession">
            Desarrollador de Software
          </p>

          <p className="bio">
            Creo soluciones digitales y proyectos que
            combinan tecnología, diseño y creatividad.
          </p>

          <div className="preview-links">
            <button>GitHub</button>
            <button>LinkedIn</button>
            <button>Portafolio</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;