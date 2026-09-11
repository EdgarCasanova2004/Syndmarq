import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [projectCount, setProjectCount] =
    useState(0);

  const [linkCount, setLinkCount] =
    useState(0);

  const [visitCount, setVisitCount] =
    useState(0);

  const token =
    localStorage.getItem("token");

  const userData =
    localStorage.getItem("user");

  const user =
    userData
      ? JSON.parse(userData)
      : null;

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
    }
  }, [token, user, navigate]);

  useEffect(() => {
    const loadCounts = async () => {
      if (!token) {
        return;
      }

      try {
        const [
          projectsResponse,
          linksResponse,
          statisticsResponse,
        ] = await Promise.all([
          fetch(
            "http://localhost:3000/api/projects",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          ),

          fetch(
            "http://localhost:3000/api/links",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          ),

          fetch(
            "http://localhost:3000/api/statistics",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          ),
        ]);

        if (
          projectsResponse.status === 401 ||
          linksResponse.status === 401 ||
          statisticsResponse.status === 401
        ) {
          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          navigate("/login");

          return;
        }

        const projectsData =
          await projectsResponse.json();

        const linksData =
          await linksResponse.json();

        const statisticsData =
          await statisticsResponse.json();

        if (projectsResponse.ok) {
          setProjectCount(
            projectsData.projects.length
          );
        }

        if (linksResponse.ok) {
          setLinkCount(
            linksData.links.length
          );
        }

        if (statisticsResponse.ok) {
          setVisitCount(
            statisticsData.totalVisits
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadCounts();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  const handleViewPortfolio = () => {
    navigate(
      `/u/${user.username}`
    );
  };

  if (!token || !user) {
    return null;
  }

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div>
          <h2 className="dashboard-logo">
            Syndmarq
          </h2>

          <nav className="dashboard-menu">
            <button className="dashboard-menu-active">
              Dashboard
            </button>

            <button
              onClick={() =>
                navigate("/profile")
              }
            >
              Mi perfil
            </button>

            <button
              onClick={() =>
                navigate("/projects")
              }
            >
              Mis proyectos
            </button>

            <button
              onClick={() =>
                navigate("/links")
              }
            >
              Mis enlaces
            </button>

            <button
              onClick={() =>
                navigate("/design")
              }
            >
              Diseño
            </button>

            <button
              onClick={() =>
                navigate("/statistics")
              }
            >
              Estadísticas
            </button>

            <button
              onClick={() =>
                navigate("/share")
              }
            >
              Compartir
            </button>

            <button
              onClick={() =>
                navigate("/settings")
              }
            >
              Configuración
            </button>
          </nav>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-welcome">
              Bienvenido
            </p>

            <h1>
              {user.name}
            </h1>
          </div>

          <div className="dashboard-user">
            <div className="dashboard-avatar">
              {user.name
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <strong>
                {user.name}
              </strong>

              <p>
                @{user.username}
              </p>
            </div>
          </div>
        </header>

        <section className="dashboard-cards">
          <article className="dashboard-card">
            <p>
              Proyectos
            </p>

            <h2>
              {projectCount}
            </h2>

            <span>
              {projectCount === 1
                ? "Proyecto publicado"
                : "Proyectos publicados"}
            </span>
          </article>

          <article className="dashboard-card">
            <p>
              Enlaces
            </p>

            <h2>
              {linkCount}
            </h2>

            <span>
              {linkCount === 1
                ? "Enlace agregado"
                : "Enlaces agregados"}
            </span>
          </article>

          <article className="dashboard-card">
            <p>
              Visitas
            </p>

            <h2>
              {visitCount}
            </h2>

            <span>
              {visitCount === 1
                ? "Visita a tu portafolio"
                : "Visitas a tu portafolio"}
            </span>
          </article>
        </section>

        <section className="dashboard-panel">
          <div>
            <h2>
              Completa tu portafolio
            </h2>

            <p>
              Agrega tu información
              profesional, proyectos y
              enlaces para empezar a
              compartir tu perfil.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() =>
              navigate("/profile")
            }
          >
            Completar perfil
          </button>
        </section>

        <section className="dashboard-panel">
          <div>
            <h2>
              Tu portafolio público
            </h2>

            <p>
              Tu perfil ya está disponible
              mediante un enlace público que
              puedes compartir.
            </p>

            <strong>
              syndmarq.com/{user.username}
            </strong>
          </div>

          <button
            className="secondary-button"
            onClick={
              handleViewPortfolio
            }
          >
            Ver portafolio
          </button>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;