import {
  useEffect,
  useState,
  type CSSProperties,
} from "react";
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
  last30Days: DayStatistic[];
}

interface StatisticsUser {
  username: string;
}

const API_URL = "http://localhost:3000";

const styles = `
  .stats-page {
    --blue: #5479a8;
    --blue-deep: #17243a;
    --blue-light: #dce9f5;
    --blue-soft: #9eb7d3;
    --ink: #17243a;
    --muted: #718096;
    --surface: #ffffff;
    min-height: 100vh;
    padding: 36px clamp(16px, 5vw, 70px) 60px;
    color: var(--ink);
    background:
      radial-gradient(ellipse at 8% 0%, rgba(205,224,242,.46), transparent 33%),
      radial-gradient(ellipse at 95% 35%, rgba(226,234,242,.7), transparent 28%),
      #f5f8fb;
  }

  .stats-page *,
  .stats-page *::before,
  .stats-page *::after {
    box-sizing: border-box;
  }

  .stats-shell {
    width: min(1150px, 100%);
    margin: 0 auto;
  }

  .stats-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 20px;
    margin-bottom: 24px;
  }

  .stats-kicker {
    margin: 0 0 9px;
    color: #7188a2;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .16em;
    text-transform: uppercase;
  }

  .stats-header h1 {
    margin: 0;
    color: var(--blue-deep);
    font-size: clamp(30px, 4vw, 42px);
    letter-spacing: -.045em;
    line-height: 1.08;
  }

  .stats-intro {
    max-width: 560px;
    margin: 10px 0 0;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.65;
  }

  .stats-button {
    display: inline-flex;
    min-height: 43px;
    align-items: center;
    justify-content: center;
    border: 1px solid #dfe7ef;
    border-radius: 12px;
    padding: 0 16px;
    color: #526b87;
    background: rgba(255,255,255,.9);
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: transform .2s ease, box-shadow .2s ease;
  }

  .stats-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(41,65,91,.09);
  }

  .stats-overview {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 13px;
    margin-bottom: 17px;
  }

  .stats-card,
  .stats-panel {
    border: 1px solid rgba(223,231,239,.95);
    background: rgba(255,255,255,.88);
    box-shadow: 0 15px 42px rgba(36,57,79,.05);
  }

  .stats-card {
    position: relative;
    overflow: hidden;
    min-height: 150px;
    border-radius: 16px;
    padding: 18px;
    animation: stats-rise .45s both;
  }

  .stats-card:nth-child(2) { animation-delay: 60ms; }
  .stats-card:nth-child(3) { animation-delay: 120ms; }
  .stats-card:nth-child(4) { animation-delay: 180ms; }

  @keyframes stats-rise {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .stats-card::after {
    position: absolute;
    right: -36px;
    bottom: -54px;
    width: 112px;
    height: 112px;
    border-radius: 50%;
    background: rgba(172,197,221,.17);
    content: "";
  }

  .stats-card:nth-child(2)::after { background: rgba(169,198,223,.18); }
  .stats-card:nth-child(3)::after { background: rgba(194,185,220,.18); }
  .stats-card:nth-child(4)::after { background: rgba(182,201,221,.2); }

  .stats-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .stats-card-label {
    margin: 0;
    color: #718095;
    font-size: 11px;
    font-weight: 700;
  }

  .stats-card-mark {
    width: 8px;
    height: 8px;
    background: #dce9f5;
  }

  .stats-card:nth-child(2) .stats-card-mark { background: #a9c6df; }
  .stats-card:nth-child(3) .stats-card-mark { background: #c2b9dc; }
  .stats-card:nth-child(4) .stats-card-mark { background: #b6c9dd; }

  .stats-card h2 {
    position: relative;
    z-index: 1;
    margin: 20px 0 7px;
    color: var(--blue-deep);
    font-size: clamp(30px, 3vw, 39px);
    letter-spacing: -.055em;
    line-height: 1;
  }

  .stats-card-caption {
    position: relative;
    z-index: 1;
    margin: 0;
    color: #8996a5;
    font-size: 10px;
  }

  .stats-panel {
    overflow: hidden;
    border-radius: 18px;
    padding: clamp(17px, 3vw, 24px);
    animation: stats-rise .5s .1s both;
  }

  .stats-panel + .stats-panel {
    margin-top: 16px;
  }

  .stats-panel-dark {
    border-color: #243a59;
    color: #f2f6fa;
    background: linear-gradient(135deg, #1d304a, #2a4465);
  }

  .stats-chart-heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 14px;
    margin-bottom: 20px;
  }

  .stats-chart-heading .stats-kicker {
    margin-bottom: 5px;
  }

  .stats-panel-dark .stats-kicker {
    color: #c6d9eb;
  }

  .stats-chart-heading h2 {
    margin: 0;
    color: var(--blue-deep);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -.025em;
  }

  .stats-panel-dark .stats-chart-heading h2 {
    color: #ffffff;
  }

  .stats-period-total {
    border-left: 2px solid #9eb7d3;
    padding: 4px 0 4px 10px;
    color: #6b7e92;
    font-size: 10px;
    font-weight: 700;
    white-space: nowrap;
  }

  .stats-panel-dark .stats-period-total {
    border-color: #c5d9ec;
    color: #d9e5f0;
  }

  .stats-chart-scroll {
    overflow-x: auto;
    padding: 2px 0 0;
  }

  .stats-chart {
    position: relative;
    display: grid;
    grid-template-columns: repeat(var(--bar-count), minmax(26px, 1fr));
    align-items: stretch;
    gap: clamp(6px, 1.5vw, 15px);
    height: 230px;
    min-width: 0;
    border-bottom: 1px solid rgba(117,138,158,.28);
    padding: 9px 3px 0;
    background: repeating-linear-gradient(
      to top,
      transparent 0,
      transparent 55px,
      rgba(151,171,190,.17) 56px,
      transparent 57px
    );
  }

  .stats-panel-dark .stats-chart {
    border-bottom-color: rgba(218,230,241,.24);
    background: repeating-linear-gradient(
      to top,
      transparent 0,
      transparent 55px,
      rgba(218,230,241,.12) 56px,
      transparent 57px
    );
  }

  .stats-chart-month {
    min-width: 690px;
    gap: 6px;
  }

  .stats-bar-column {
    display: grid;
    grid-template-rows: 19px 1fr 28px;
    justify-items: center;
    height: 100%;
    min-width: 0;
  }

  .stats-bar-value {
    color: #8290a0;
    font-size: 9px;
    font-variant-numeric: tabular-nums;
  }

  .stats-panel-dark .stats-bar-value {
    color: #d0dce8;
  }

  .stats-bar-track {
    display: flex;
    width: min(100%, 34px);
    height: 100%;
    align-items: flex-end;
    background: rgba(218,228,237,.45);
  }

  .stats-panel-dark .stats-bar-track {
    background: rgba(255,255,255,.08);
  }

  .stats-chart-month .stats-bar-track {
    width: min(100%, 19px);
  }

  .stats-bar {
    position: relative;
    width: 100%;
    min-height: 2px;
    background: linear-gradient(180deg, #89a9ca, #5479a8);
    transform: scaleY(.02);
    transform-origin: bottom;
    animation: stats-bar-in .8s cubic-bezier(.2,.75,.2,1) forwards;
    transition: filter .18s ease;
  }

  .stats-panel-dark .stats-bar {
    background: linear-gradient(180deg, #dce9f5, #9eb7d3);
  }

  .stats-bar-column:nth-child(3n) .stats-bar {
    background: #9eb7d3;
  }

  .stats-panel-dark .stats-bar-column:nth-child(3n) .stats-bar {
    background: #a9c6df;
  }

  .stats-bar-column:hover .stats-bar {
    filter: brightness(1.1) saturate(1.1);
  }

  @keyframes stats-bar-in {
    to { transform: scaleY(1); }
  }

  .stats-bar-date {
    align-self: end;
    color: #7d8b9b;
    font-size: 9px;
    text-align: center;
    text-transform: capitalize;
    white-space: nowrap;
  }

  .stats-panel-dark .stats-bar-date {
    color: #d0dce8;
  }

  .stats-chart-empty {
    display: grid;
    min-height: 185px;
    place-items: center;
    border: 1px dashed #d7e1ea;
    border-radius: 13px;
    padding: 22px;
    color: var(--muted);
    background: rgba(248,250,252,.65);
    text-align: center;
  }

  .stats-chart-empty h3 {
    margin: 0;
    color: var(--blue-deep);
    font-size: 14px;
  }

  .stats-chart-empty p {
    max-width: 390px;
    margin: 8px auto 0;
    font-size: 11px;
    line-height: 1.6;
  }

  .stats-chart-note {
    margin: 12px 0 0;
    color: #8795a5;
    font-size: 10px;
    line-height: 1.5;
  }

  .stats-status {
    display: grid;
    min-height: 55vh;
    place-items: center;
    color: var(--muted);
    text-align: center;
  }

  .stats-status h2 {
    color: var(--blue-deep);
    font-size: 17px;
  }

  .stats-status p {
    font-size: 12px;
  }

  @media (max-width: 850px) {
    .stats-overview {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 600px) {
    .stats-page {
      padding: 24px 14px 42px;
    }

    .stats-header {
      align-items: stretch;
      flex-direction: column;
    }

    .stats-header .stats-button {
      width: 100%;
    }

    .stats-card {
      min-height: 126px;
      padding: 14px;
    }

    .stats-card h2 {
      margin-top: 18px;
      font-size: 31px;
    }

    .stats-chart-heading {
      align-items: flex-start;
      flex-direction: column;
    }

    .stats-panel {
      padding: 16px 12px;
    }

    .stats-chart {
      height: 200px;
      gap: 5px;
    }

    .stats-chart-month {
      min-width: 690px;
    }

    .stats-bar-track {
      width: min(75%, 26px);
    }
  }

  @media (max-width: 360px) {
    .stats-overview {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stats-page *,
    .stats-page *::before,
    .stats-page *::after {
      animation-duration: .01ms !important;
      transition-duration: .01ms !important;
    }
  }
`;

function formatDate(date: string, includeMonth = false) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("es-MX", {
    day: "numeric",
    ...(includeMonth ? { month: "short" as const } : {}),
    ...(!includeMonth ? { weekday: "short" as const } : {}),
  });
}

function BarChart({
  days,
  monthly = false,
}: {
  days: DayStatistic[];
  monthly?: boolean;
}) {
  if (days.length === 0) {
    return (
      <div className="stats-chart-empty">
        <div>
          <h3>Tu actividad está comenzando</h3>
          <p>
            Aquí aparecerá el movimiento de tu portafolio conforme recibas visitas.
          </p>
        </div>
      </div>
    );
  }

  const maximum = Math.max(...days.map((day) => day.visits), 1);

  return (
    <div className="stats-chart-scroll">
      <div
        className={`stats-chart ${monthly ? "stats-chart-month" : ""}`}
        style={
          { "--bar-count": days.length } as CSSProperties & {
            "--bar-count": number;
          }
        }
        role="img"
        aria-label={
          monthly
            ? "Visitas de los últimos 30 días"
            : "Visitas de los últimos 7 días"
        }
      >
        {days.map((day, index) => {
          const height =
            day.visits > 0
              ? Math.max((day.visits / maximum) * 100, 7)
              : 2;

          const showLabel =
            !monthly ||
            index === 0 ||
            index === days.length - 1 ||
            index % 5 === 0;

          return (
            <div className="stats-bar-column" key={`${day.date}-${index}`}>
              <span className="stats-bar-value">{day.visits}</span>

              <div className="stats-bar-track">
                <div
                  className="stats-bar"
                  style={{
                    height: `${height}%`,
                    animationDelay: `${Math.min(index * 22, 500)}ms`,
                  }}
                  title={`${day.visits} visitas · ${formatDate(day.date, true)}`}
                />
              </div>

              <span className="stats-bar-date">
                {showLabel ? formatDate(day.date, monthly) : ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Statistics() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState<StatisticsUser | null>(null);
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        navigate("/login");
        return;
      }

      const parsedUser = JSON.parse(storedUser) as StatisticsUser;

      if (!parsedUser.username) {
        navigate("/login");
        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    const loadStatistics = async () => {
      try {
        const response = await fetch(`${API_URL}/api/statistics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          setMessage(
            data.message || "No se pudieron cargar las estadísticas.",
          );
          return;
        }

        const normalizeDays = (value: unknown): DayStatistic[] => {
          if (!Array.isArray(value)) {
            return [];
          }

          return value.map((day) => ({
            date: String(day.date),
            visits: Number(day.visits) || 0,
          }));
        };

        setStatistics({
          totalVisits: Number(data.totalVisits) || 0,
          todayVisits: Number(data.todayVisits) || 0,
          last7Days: normalizeDays(data.last7Days),
          last30Days: normalizeDays(data.last30Days),
        });
      } catch (error) {
        console.error(error);
        setMessage("No se pudo conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    void loadStatistics();
  }, [token, navigate]);

  if (!token || !user) {
    return null;
  }

  if (loading) {
    return (
      <main className="stats-page">
        <style>{styles}</style>
        <div className="stats-status">Cargando tus estadísticas...</div>
      </main>
    );
  }

  if (!statistics) {
    return (
      <main className="stats-page">
        <style>{styles}</style>
        <div className="stats-status">
          <div>
            <h2>No se pudieron cargar las estadísticas</h2>
            <p>{message}</p>
            <button
              className="stats-button"
              type="button"
              onClick={() => navigate("/dashboard")}
            >
              Volver al dashboard
            </button>
          </div>
        </div>
      </main>
    );
  }

  const weekTotal = statistics.last7Days.reduce(
    (sum, day) => sum + day.visits,
    0,
  );

  const monthTotal = statistics.last30Days.reduce(
    (sum, day) => sum + day.visits,
    0,
  );

  return (
    <main className="stats-page">
      <style>{styles}</style>

      <div className="stats-shell">
        <header className="stats-header">
          <div>
            <p className="stats-kicker">Portavia · Rendimiento</p>
            <h1>Estadísticas</h1>
            <p className="stats-intro">
              Observa las visitas que recibe tu perfil y el movimiento de tu
              portafolio durante los últimos días.
            </p>
          </div>

          <button
            className="stats-button"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Volver al dashboard
          </button>
        </header>

        <section className="stats-overview">
          <article className="stats-card">
            <div className="stats-card-top">
              <p className="stats-card-label">Visitas totales</p>
              <span className="stats-card-mark" />
            </div>
            <h2>{statistics.totalVisits.toLocaleString("es-MX")}</h2>
            <p className="stats-card-caption">Desde que publicaste tu perfil</p>
          </article>

          <article className="stats-card">
            <div className="stats-card-top">
              <p className="stats-card-label">Visitas de hoy</p>
              <span className="stats-card-mark" />
            </div>
            <h2>{statistics.todayVisits.toLocaleString("es-MX")}</h2>
            <p className="stats-card-caption">Actividad recibida este día</p>
          </article>

          <article className="stats-card">
            <div className="stats-card-top">
              <p className="stats-card-label">Últimos 7 días</p>
              <span className="stats-card-mark" />
            </div>
            <h2>{weekTotal.toLocaleString("es-MX")}</h2>
            <p className="stats-card-caption">Actividad semanal</p>
          </article>

          <article className="stats-card">
            <div className="stats-card-top">
              <p className="stats-card-label">Últimos 30 días</p>
              <span className="stats-card-mark" />
            </div>
            <h2>{monthTotal.toLocaleString("es-MX")}</h2>
            <p className="stats-card-caption">Actividad mensual</p>
          </article>
        </section>

        <section className="stats-panel stats-panel-dark">
          <div className="stats-chart-heading">
            <div>
              <p className="stats-kicker">Semana actual</p>
              <h2>Ritmo de visitas</h2>
            </div>
            <span className="stats-period-total">
              {weekTotal.toLocaleString("es-MX")} visitas
            </span>
          </div>

          <BarChart days={statistics.last7Days} />
        </section>

        <section className="stats-panel">
          <div className="stats-chart-heading">
            <div>
              <p className="stats-kicker">Último mes</p>
              <h2>Recorrido diario</h2>
            </div>
            <span className="stats-period-total">
              {monthTotal.toLocaleString("es-MX")} visitas
            </span>
          </div>

          <BarChart days={statistics.last30Days} monthly />

          <p className="stats-chart-note">
            En celular, desliza la gráfica mensual hacia los lados para recorrer los días.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Statistics;