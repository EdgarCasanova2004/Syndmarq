import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

interface PublicUser {
  name: string;
  username: string;
  profession: string | null;
  bio: string | null;
  theme: string;
}

interface PublicProject {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  project_url: string | null;
  is_featured: boolean;
  sort_order: number;
  category_name: string | null;
}

interface PublicLink {
  id: number;
  title: string;
  url: string;
  icon: string | null;
  sort_order: number;
}

interface PublicPortfolioData {
  user: PublicUser;
  projects: PublicProject[];
  links: PublicLink[];
}

function PublicPortfolio() {
  const { username } = useParams();

  const [data, setData] =
    useState<PublicPortfolioData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const loadPortfolio = async () => {
      if (!username) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/public/${username}`
        );

        const result =
          await response.json();

        if (!response.ok) {
          setMessage(
            result.message ||
              "No se pudo cargar el portafolio"
          );

          setLoading(false);
          return;
        }

        setData(result);

        const visitKey =
          `syndmarq_visit_${username}`;

        const lastVisit =
          localStorage.getItem(
            visitKey
          );

        const now =
          Date.now();

        const thirtyMinutes =
          30 * 60 * 1000;

        const shouldRegisterVisit =
          !lastVisit ||
          now - Number(lastVisit) >=
            thirtyMinutes;

        if (shouldRegisterVisit) {
          localStorage.setItem(
            visitKey,
            String(now)
          );

          try {
            const visitResponse =
              await fetch(
                `http://localhost:3000/api/public/${username}/visit`,
                {
                  method: "POST",
                }
              );

            if (!visitResponse.ok) {
              localStorage.removeItem(
                visitKey
              );
            }
          } catch (visitError) {
            localStorage.removeItem(
              visitKey
            );

            console.error(
              "No se pudo registrar la visita:",
              visitError
            );
          }
        }
      } catch (error) {
        console.error(error);

        setMessage(
          "No se pudo conectar con el servidor"
        );
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [username]);

  if (loading) {
    return (
      <main className="public-portfolio-page">
        <div className="public-status">
          Cargando portafolio...
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="public-portfolio-page">
        <div className="public-status">
          <h1>
            Portafolio no encontrado
          </h1>

          <p>
            {message ||
              "El perfil que buscas no existe."}
          </p>
        </div>
      </main>
    );
  }

  const theme =
    data.user.theme || "default";

  return (
    <main
      className={`public-portfolio-page theme-${theme}`}
    >
      <section className="public-profile">
        <div className="public-avatar">
          {data.user.name
            .charAt(0)
            .toUpperCase()}
        </div>

        <h1>
          {data.user.name}
        </h1>

        {data.user.profession && (
          <p className="public-profession">
            {data.user.profession}
          </p>
        )}

        {data.user.bio && (
          <p className="public-bio">
            {data.user.bio}
          </p>
        )}

        <p className="public-username">
          @{data.user.username}
        </p>
      </section>

      {data.links.length > 0 && (
        <section className="public-section">
          <div className="public-section-title">
            <h2>
              Mis enlaces
            </h2>
          </div>

          <div className="public-links">
            {data.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="public-link-card"
              >
                <div className="public-link-icon">
                  {link.icon
                    ? link.icon
                        .charAt(0)
                        .toUpperCase()
                    : "L"}
                </div>

                <span>
                  {link.title}
                </span>

                <strong>
                  →
                </strong>
              </a>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="public-section">
          <div className="public-section-title">
            <h2>
              Mis proyectos
            </h2>
          </div>

          <div className="public-projects-grid">
            {data.projects.map(
              (project) => (
                <article
                  className="public-project-card"
                  key={project.id}
                >
                  {project.image_url ? (
                    <img
                      src={
                        project.image_url
                      }
                      alt={
                        project.title
                      }
                    />
                  ) : (
                    <div className="public-project-placeholder">
                      Proyecto
                    </div>
                  )}

                  <div className="public-project-content">
                    <div className="public-project-top">
                      <span>
                        {project.category_name ||
                          "Proyecto"}
                      </span>

                      {project.is_featured && (
                        <strong>
                          Destacado
                        </strong>
                      )}
                    </div>

                    <h3>
                      {project.title}
                    </h3>

                    {project.description && (
                      <p>
                        {
                          project.description
                        }
                      </p>
                    )}

                    {project.project_url && (
                      <a
                        href={
                          project.project_url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ver proyecto
                      </a>
                    )}
                  </div>
                </article>
              )
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default PublicPortfolio;