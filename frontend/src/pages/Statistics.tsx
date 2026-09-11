import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface DayStatistic {
  date: string;
  visits: number;
}

interface StatisticsData {
  totalVisits: number;
  todayVisits: number;
  last7Days: DayStatistic[];
}

function Statistics() {
  const navigate = useNavigate();

  const [statistics, setStatistics] =
    useState<StatisticsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

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
      return;
    }

    const loadStatistics = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/statistics",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          navigate("/login");

          return;
        }

        const data =
          await response.json();

        if (!response.ok) {
          setMessage(
            data.message ||
              "No se pudieron cargar las estadísticas"
          );

          return;
        }

        setStatistics(data);
      } catch (error) {
        console.error(error);

        setMessage(
          "No se pudo conectar con el servidor"
        );
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, [token, navigate]);

  const formatDate = (
    date: string
  ) => {
    const parsedDate =
      new Date(`${date}T00:00:00`);

    return parsedDate.toLocaleDateString(
      "es-MX",
      {
        weekday: "short",
        day: "numeric",
      }
    );
  };

  const getMaximumVisits = () => {
    if (
      !statistics ||
      statistics.last7Days.length === 0
    ) {
      return 1;
    }

    const values =
      statistics.last7Days.map(
        (day) => day.visits
      );

    return Math.max(
      ...values,
      1
    );
  };

  if (!token || !user) {
    return null;
  }

  if (loading) {
    return (
      <div className="statistics-page">
        <div className="statistics-status">
          Cargando estadísticas...
        </div>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="statistics-page">
        <div className="statistics-status">
          <h2>
            No se pudieron cargar
            las estadísticas
          </h2>

          <p>
            {message}
          </p>

          <button
            className="secondary-button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  const maximumVisits =
    getMaximumVisits();

  return (
    <div className="statistics-page">
      <header className="statistics-header">
        <div>
          <p className="statistics-label">
            Rendimiento
          </p>

          <h1>
            Estadísticas
          </h1>

          <span>
            Consulta las visitas de tu
            portafolio profesional.
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

      <section className="statistics-cards">
        <article className="statistics-card">
          <p>
            Visitas totales
          </p>

          <h2>
            {statistics.totalVisits}
          </h2>

          <span>
            Desde la creación de tu
            portafolio
          </span>
        </article>

        <article className="statistics-card">
          <p>
            Visitas de hoy
          </p>

          <h2>
            {statistics.todayVisits}
          </h2>

          <span>
            Visitas recibidas hoy
          </span>
        </article>

        <article className="statistics-card">
          <p>
            Últimos 7 días
          </p>

          <h2>
            {statistics.last7Days.reduce(
              (total, day) =>
                total + day.visits,
              0
            )}
          </h2>

          <span>
            Visitas durante esta semana
          </span>
        </article>
      </section>

      <section className="statistics-chart-section">
        <div className="statistics-chart-header">
          <div>
            <p>
              Actividad
            </p>

            <h2>
              Visitas de los últimos
              7 días
            </h2>
          </div>

          <span>
            Total:{" "}
            {statistics.last7Days.reduce(
              (total, day) =>
                total + day.visits,
              0
            )}
          </span>
        </div>

        {statistics.last7Days.length >
        0 ? (
          <div className="statistics-chart">
            {statistics.last7Days.map(
              (day) => {
                const height =
                  Math.max(
                    (day.visits /
                      maximumVisits) *
                      100,
                    day.visits > 0
                      ? 8
                      : 2
                  );

                return (
                  <div
                    className="statistics-bar-container"
                    key={day.date}
                  >
                    <div className="statistics-bar-value">
                      {day.visits}
                    </div>

                    <div className="statistics-bar-track">
                      <div
                        className="statistics-bar"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    </div>

                    <span className="statistics-bar-date">
                      {formatDate(
                        day.date
                      )}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div className="statistics-empty">
            <h3>
              Todavía no hay visitas
            </h3>

            <p>
              Cuando alguien visite tu
              portafolio, aquí aparecerá
              la actividad.
            </p>
          </div>
        )}
      </section>

      <section className="statistics-info">
        <div>
          <p>
            Portafolio público
          </p>

          <strong>
            syndmarq.com/
            {user.username}
          </strong>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            navigate(
              `/u/${user.username}`
            )
          }
        >
          Ver portafolio
        </button>
      </section>
    </div>
  );
}

export default Statistics;