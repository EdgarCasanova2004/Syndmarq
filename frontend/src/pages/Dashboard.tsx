import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardUser {
  id?: number;
  name: string;
  email?: string;
  username: string;
  profession?: string | null;
  bio?: string | null;
  profile_image_url?: string | null;
  role?: string;
}

type IconName =
  | "grid"
  | "user"
  | "projects"
  | "links"
  | "design"
  | "stats"
  | "share"
  | "settings"
  | "admin"
  | "arrow"
  | "logout";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" /></>,
    projects: <><path d="M3.5 7.5h7l2 2h8v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" /><path d="M3.5 7.5v-2a2 2 0 0 1 2-2h5l2 2h5" /></>,
    links: <><path d="M10 13.5 14 10" /><path d="M8.5 15.5H7a4 4 0 0 1 0-8h4" /><path d="M15.5 8.5H17a4 4 0 0 1 0 8h-4" /></>,
    design: <><path d="m4 16 9.5-9.5a2.1 2.1 0 0 1 3 3L7 19H4z" /><path d="m12 8 3 3" /></>,
    stats: <><path d="M4 20V11M10 20V5M16 20v-7M22 20V9" /></>,
    share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.3 1-1.4 2.4-1.6-.6a8 8 0 0 1-1.7 1l-.3 1.7h-2.8l-.3-1.7a8 8 0 0 1-1.7-1l-1.6.6L8 16.1l1.3-1a7 7 0 0 1 0-2l-1.3-1 1.4-2.4 1.6.6a8 8 0 0 1 1.7-1l.3-1.7h2.8l.3 1.7a8 8 0 0 1 1.7 1l1.6-.6 1.4 2.4-1.3 1a7 7 0 0 1-.1 1.9Z" transform="translate(-1 -1) scale(.95)" /></>,
    admin: <><path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6z" /><path d="m9 12 2 2 4-4" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    logout: <><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
  };

  return (
    <svg
      className="pt-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const dashboardStyles = `
  .pt-dashboard, .pt-dashboard * { box-sizing: border-box; }

  .pt-dashboard {
    --ink: #203447;
    --muted: #718191;
    --line: #e3e9ee;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 252px minmax(0, 1fr);
    color: var(--ink);
    background:
      radial-gradient(ellipse at 83% 2%, rgb(204 222 237 / 42%), transparent 31rem),
      #f3f6f8;
    font-family: inherit;
  }

  .pt-icon {
    width: 18px;
    height: 18px;
    flex: none;
  }

  .pt-sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 25px 16px 18px;
    color: #f6f9fc;
    background: linear-gradient(165deg, #1e354b, #172b3e 65%, #142639);
    box-shadow: 10px 0 34px rgb(19 40 59 / 10%);
    z-index: 5;
  }

  .pt-brand {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 0 8px 27px;
  }

  .pt-brand-mark {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 34%);
    border-radius: 13px;
    background: rgb(255 255 255 / 11%);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 20%);
    font-size: 20px;
    font-weight: 650;
  }

  .pt-brand-name {
    font-size: 16px;
    font-weight: 620;
    letter-spacing: .02em;
  }

  .pt-sidebar-caption {
    margin: 0 10px 10px;
    color: rgb(219 231 241 / 48%);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .16em;
  }

  .pt-nav {
    display: grid;
    gap: 5px;
  }

  .pt-nav-button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 12px;
    border: 1px solid transparent;
    border-radius: 11px;
    color: rgb(237 244 249 / 76%);
    background: transparent;
    text-align: left;
    font: inherit;
    font-size: 12px;
    cursor: pointer;
    transition: background .2s, color .2s, border-color .2s, transform .2s;
  }

  .pt-nav-button:hover {
    color: #fff;
    background: rgb(255 255 255 / 8%);
    transform: translateX(2px);
  }

  .pt-nav-button--active {
    color: #fff;
    border-color: rgb(255 255 255 / 12%);
    background: linear-gradient(100deg, rgb(220 235 247 / 17%), rgb(220 235 247 / 8%));
    box-shadow: inset 3px 0 #c4d8e8;
  }

  .pt-nav-button--active .pt-icon {
    color: #d6e8f5;
  }

  .pt-sidebar-bottom {
    display: grid;
    gap: 13px;
    margin-top: auto;
    padding: 17px 7px 0;
    border-top: 1px solid rgb(255 255 255 / 11%);
  }

  .pt-side-user {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .pt-avatar {
    width: 36px;
    height: 36px;
    flex: none;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: 1px solid rgb(255 255 255 / 30%);
    border-radius: 50%;
    color: #28445b;
    background: #dbe8f1;
    font-size: 13px;
    font-weight: 700;
  }

  .pt-avatar img,
  .pt-user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pt-side-user-copy {
    min-width: 0;
  }

  .pt-side-user-copy strong,
  .pt-side-user-copy span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pt-side-user-copy strong {
    color: #fff;
    font-size: 11px;
    font-weight: 600;
  }

  .pt-side-user-copy span {
    margin-top: 3px;
    color: rgb(223 235 244 / 58%);
    font-size: 10px;
  }

  .pt-logout {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border: 0;
    border-radius: 9px;
    color: rgb(237 244 249 / 72%);
    background: transparent;
    text-align: left;
    font: inherit;
    font-size: 11px;
    cursor: pointer;
    transition: background .2s, color .2s;
  }

  .pt-logout:hover {
    color: #fff;
    background: rgb(255 255 255 / 9%);
  }

  .pt-main {
    width: min(100%, 1500px);
    min-width: 0;
    margin: 0 auto;
    padding: 30px clamp(22px, 4vw, 58px) 48px;
  }

  .pt-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 27px;
  }

  .pt-overline {
    margin: 0 0 8px;
    color: #75899a;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .17em;
  }

  .pt-header h1 {
    margin: 0;
    color: #203447;
    font-size: clamp(25px, 3vw, 34px);
    font-weight: 570;
    letter-spacing: -.045em;
    line-height: 1.12;
  }

  .pt-header h1 span {
    color: #55748c;
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 400;
    font-style: italic;
  }

  .pt-user-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 12px 7px 7px;
    border: 1px solid rgb(255 255 255 / 80%);
    border-radius: 999px;
    background: rgb(255 255 255 / 66%);
    box-shadow: 0 5px 20px rgb(33 55 74 / 6%);
    backdrop-filter: blur(12px);
  }

  .pt-user-avatar {
    width: 36px;
    height: 36px;
    flex: none;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 50%;
    color: #29445b;
    background: #dce8f1;
    font-size: 13px;
    font-weight: 700;
  }

  .pt-user-chip strong {
    display: block;
    color: #263b4e;
    font-size: 11px;
    font-weight: 650;
  }

  .pt-user-chip span {
    display: block;
    margin-top: 3px;
    color: #748493;
    font-size: 10px;
  }

  .pt-hero {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    overflow: hidden;
    margin-bottom: 20px;
    padding: clamp(22px, 3.5vw, 36px);
    border: 1px solid rgb(255 255 255 / 90%);
    border-radius: 20px;
    background:
      radial-gradient(ellipse at 88% 0%, rgb(192 214 232 / 55%), transparent 25rem),
      linear-gradient(115deg, #fff, #edf3f7);
    box-shadow: 0 14px 40px rgb(30 54 74 / 6%);
    animation: pt-fade-up .65s both;
  }

  .pt-hero::after {
    content: "";
    position: absolute;
    top: -82px;
    right: 9%;
    width: 220px;
    height: 220px;
    border: 1px solid rgb(109 142 166 / 14%);
    border-radius: 50%;
    box-shadow: 0 0 0 24px rgb(109 142 166 / 5%), 0 0 0 50px rgb(109 142 166 / 4%);
    pointer-events: none;
  }

  .pt-hero-copy {
    position: relative;
    z-index: 1;
    max-width: 590px;
  }

  .pt-hero-label {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 11px;
    color: #647f94;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .14em;
  }

  .pt-hero-label::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #7aa493;
    box-shadow: 0 0 0 4px rgb(122 164 147 / 14%);
  }

  .pt-hero h2 {
    margin: 0;
    color: #20364a;
    font-size: clamp(21px, 2.6vw, 29px);
    font-weight: 570;
    letter-spacing: -.035em;
  }

  .pt-hero p {
    max-width: 540px;
    margin: 9px 0 0;
    color: #6c7d8b;
    font-size: 12px;
    line-height: 1.7;
  }

  .pt-button {
    position: relative;
    z-index: 1;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-height: 43px;
    padding: 0 16px;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 10px;
    color: #fff;
    background: linear-gradient(110deg, #263f56, #3a5d78);
    box-shadow: 0 7px 17px rgb(38 63 86 / 18%);
    font: inherit;
    font-size: 11px;
    font-weight: 650;
    cursor: pointer;
    transition: transform .2s, box-shadow .2s;
  }

  .pt-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 11px 22px rgb(38 63 86 / 24%);
  }

  .pt-button .pt-icon {
    width: 15px;
    height: 15px;
  }

  .pt-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-bottom: 20px;
  }

  .pt-stat {
    position: relative;
    overflow: hidden;
    min-width: 0;
    padding: 19px;
    border: 1px solid rgb(255 255 255 / 90%);
    border-radius: 16px;
    background: rgb(255 255 255 / 78%);
    box-shadow: 0 9px 26px rgb(30 54 74 / 5%);
    animation: pt-fade-up .65s both;
  }

  .pt-stat:nth-child(2) { animation-delay: .07s; }
  .pt-stat:nth-child(3) { animation-delay: .14s; }

  .pt-stat-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .pt-stat-label {
    color: #708190;
    font-size: 11px;
    font-weight: 600;
  }

  .pt-stat-icon {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    border-radius: 11px;
    color: #54738c;
    background: #edf3f7;
  }

  .pt-stat-icon .pt-icon {
    width: 17px;
    height: 17px;
  }

  .pt-stat h2 {
    margin: 15px 0 4px;
    color: #20384d;
    font-size: 31px;
    font-weight: 620;
    letter-spacing: -.05em;
  }

  .pt-stat p {
    margin: 0;
    color: #8794a0;
    font-size: 10px;
  }

  .pt-lower-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(280px, .85fr);
    gap: 15px;
  }

  .pt-card {
    min-width: 0;
    padding: 22px;
    border: 1px solid rgb(255 255 255 / 92%);
    border-radius: 17px;
    background: rgb(255 255 255 / 79%);
    box-shadow: 0 9px 28px rgb(30 54 74 / 5%);
    backdrop-filter: blur(12px);
    animation: pt-fade-up .7s .15s both;
  }

  .pt-card-heading {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .pt-card-icon {
    width: 37px;
    height: 37px;
    flex: none;
    display: grid;
    place-items: center;
    border-radius: 12px;
    color: #55758e;
    background: #edf3f7;
  }

  .pt-card h3 {
    margin: 1px 0 6px;
    color: #2b4052;
    font-size: 14px;
    font-weight: 650;
  }

  .pt-card p {
    margin: 0;
    color: #7a8996;
    font-size: 11px;
    line-height: 1.65;
  }

  .pt-card-action {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 18px;
    padding: 0;
    border: 0;
    color: #3f627c;
    background: transparent;
    font: inherit;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
  }

  .pt-card-action:hover {
    color: #1f405a;
  }

  .pt-card-action .pt-icon {
    width: 14px;
    height: 14px;
  }

  .pt-public-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 17px;
    padding: 11px 12px;
    border: 1px solid #e4ebf0;
    border-radius: 10px;
    background: #f7f9fb;
  }

  .pt-public-link span {
    overflow: hidden;
    color: #536d82;
    font-size: 11px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pt-public-link button {
    flex: none;
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #e0e8ee;
    border-radius: 8px;
    color: #54738c;
    background: white;
    cursor: pointer;
  }

  .pt-quick-links {
    display: grid;
    gap: 8px;
    margin-top: 14px;
  }

  .pt-quick-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 11px;
    border: 1px solid #e8edf1;
    border-radius: 10px;
    color: #50677a;
    background: #fff;
    text-align: left;
    font: inherit;
    font-size: 10px;
    cursor: pointer;
    transition: background .2s, border-color .2s, transform .2s;
  }

  .pt-quick-link:hover {
    transform: translateY(-1px);
    border-color: #cbd9e3;
    background: #f8fbfd;
  }

  .pt-quick-link span {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .pt-quick-link .pt-icon {
    width: 16px;
    height: 16px;
    color: #64829a;
  }

  @keyframes pt-fade-up {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 1000px) {
    .pt-dashboard { grid-template-columns: 218px minmax(0, 1fr); }
    .pt-sidebar { padding-inline: 12px; }
    .pt-lower-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 720px) {
    .pt-dashboard { display: block; }
    .pt-sidebar {
      position: sticky;
      top: 0;
      height: auto;
      padding: 12px 14px 10px;
    }
    .pt-brand { padding: 0 2px 10px; }
    .pt-brand-mark { width: 33px; height: 33px; border-radius: 11px; }
    .pt-brand-name { font-size: 14px; }
    .pt-sidebar-caption, .pt-sidebar-bottom { display: none; }
    .pt-nav {
      display: flex;
      gap: 5px;
      overflow-x: auto;
      padding-bottom: 2px;
      scrollbar-width: none;
    }
    .pt-nav::-webkit-scrollbar { display: none; }
    .pt-nav-button {
      width: auto;
      flex: none;
      gap: 7px;
      padding: 9px 10px;
      font-size: 10px;
    }
    .pt-nav-button .pt-icon { width: 15px; height: 15px; }
    .pt-nav-button--active { box-shadow: inset 0 -2px #c4d8e8; }
    .pt-main { padding: 22px 16px 32px; }
    .pt-header { margin-bottom: 18px; }
    .pt-hero { align-items: flex-start; flex-direction: column; gap: 17px; padding: 22px; }
    .pt-hero::after { right: -80px; }
    .pt-stats { gap: 9px; }
    .pt-stat { padding: 13px; }
    .pt-stat-icon { width: 29px; height: 29px; border-radius: 9px; }
    .pt-stat h2 { margin-top: 11px; font-size: 26px; }
    .pt-stat-label { font-size: 10px; }
    .pt-stat p { font-size: 9px; line-height: 1.35; }
    .pt-card { padding: 18px; }
  }

  @media (max-width: 420px) {
    .pt-main { padding-inline: 12px; }
    .pt-header h1 { font-size: 25px; }
    .pt-user-chip { padding: 4px; border: 0; background: transparent; box-shadow: none; }
    .pt-user-chip > div:last-child { display: none; }
    .pt-user-avatar { width: 34px; height: 34px; }
    .pt-stats { gap: 7px; }
    .pt-stat { padding: 11px 9px; }
    .pt-stat-top { align-items: flex-start; }
    .pt-stat-icon { width: 26px; height: 26px; }
    .pt-stat-icon .pt-icon { width: 14px; height: 14px; }
    .pt-stat h2 { font-size: 23px; }
    .pt-stat-label { font-size: 9px; }
    .pt-stat p { font-size: 8px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pt-dashboard *, .pt-dashboard *::before, .pt-dashboard *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

function Dashboard() {
  const navigate = useNavigate();

  const [projectCount, setProjectCount] = useState(0);
  const [linkCount, setLinkCount] = useState(0);
  const [visitCount, setVisitCount] = useState(0);
  const [user, setUser] = useState<DashboardUser | null>(null);

  const token = localStorage.getItem("token");

  const closeSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error(error);
      closeSession();
    }
  }, [token, navigate]);

  useEffect(() => {
    const loadDashboard = async () => {
      if (!token) return;

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [
          profileResponse,
          projectsResponse,
          linksResponse,
          statisticsResponse,
        ] = await Promise.all([
          fetch("https://portavia-api.onrender.com/api/profile", { headers }),
          fetch("https://portavia-api.onrender.com/api/projects", { headers }),
          fetch("https://portavia-api.onrender.com/api/links", { headers }),
          fetch("https://portavia-api.onrender.com/api/statistics", { headers }),
        ]);

        const responses = [
          profileResponse,
          projectsResponse,
          linksResponse,
          statisticsResponse,
        ];

        if (
          responses.some(
            (response) =>
              response.status === 401 || response.status === 403,
          )
        ) {
          closeSession();
          return;
        }

        const [
          profileData,
          projectsData,
          linksData,
          statisticsData,
        ] = await Promise.all([
          profileResponse.json(),
          projectsResponse.json(),
          linksResponse.json(),
          statisticsResponse.json(),
        ]);

        if (profileResponse.ok && profileData.user) {
          let storedRole: string | undefined;

          try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) storedRole = JSON.parse(storedUser).role;
          } catch (error) {
            console.error(error);
          }

          const updatedUser = {
            ...profileData.user,
            role: profileData.user.role ?? storedRole,
          };

          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        if (projectsResponse.ok) {
          setProjectCount(projectsData.projects.length);
        }

        if (linksResponse.ok) {
          setLinkCount(linksData.links.length);
        }

        if (statisticsResponse.ok) {
          setVisitCount(statisticsData.totalVisits);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();
  }, [token, navigate]);

  const handleViewPortfolio = () => {
    if (user) navigate(`/u/${user.username}`);
  };

  if (!token || !user) return null;

  const firstName = user.name.split(" ")[0];

  const navItems: {
    label: string;
    path: string;
    icon: IconName;
  }[] = [
    { label: "Mi perfil", path: "/profile", icon: "user" },
    { label: "Mis proyectos", path: "/projects", icon: "projects" },
    { label: "Mis enlaces", path: "/links", icon: "links" },
    { label: "Diseño", path: "/design", icon: "design" },
    { label: "Estadísticas", path: "/statistics", icon: "stats" },
    { label: "Compartir", path: "/share", icon: "share" },
    { label: "Configuración", path: "/settings", icon: "settings" },
  ];

  return (
    <div className="pt-dashboard">
      <style>{dashboardStyles}</style>

      <aside className="pt-sidebar">
        <div>
          <div className="pt-brand">
            <span className="pt-brand-mark" aria-hidden="true">p</span>
            <span className="pt-brand-name">Portavia</span>
          </div>

          <p className="pt-sidebar-caption">ESPACIO PROFESIONAL</p>

          <nav className="pt-nav" aria-label="Navegación principal">
            <button
              type="button"
              className="pt-nav-button pt-nav-button--active"
              aria-current="page"
            >
              <Icon name="grid" />
              Dashboard
            </button>

            {navItems.map((item) => (
              <button
                type="button"
                className="pt-nav-button"
                key={item.path}
                onClick={() => navigate(item.path)}
              >
                <Icon name={item.icon} />
                {item.label}
              </button>
            ))}

            {user.role === "admin" && (
              <button
                type="button"
                className="pt-nav-button"
                onClick={() => navigate("/admin")}
              >
                <Icon name="admin" />
                Administración
              </button>
            )}
          </nav>
        </div>

        <div className="pt-sidebar-bottom">
          <div className="pt-side-user">
            <div className="pt-avatar">
              {user.profile_image_url ? (
                <img src={user.profile_image_url} alt="" />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="pt-side-user-copy">
              <strong>{user.name}</strong>
              <span>@{user.username}</span>
            </div>
          </div>

          <button
            type="button"
            className="pt-logout"
            onClick={closeSession}
          >
            <Icon name="logout" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="pt-main">
        <header className="pt-header">
          <div>
            <p className="pt-overline">TU ESPACIO PROFESIONAL</p>
            <h1>
              Hola, <span>{firstName}</span>
            </h1>
          </div>

          <div className="pt-user-chip">
            <div className="pt-user-avatar">
              {user.profile_image_url ? (
                <img src={user.profile_image_url} alt="" />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <strong>{user.name}</strong>
              <span>@{user.username}</span>
            </div>
          </div>
        </header>

        <section className="pt-hero">
          <div className="pt-hero-copy">
            <span className="pt-hero-label">PANEL DE CONTROL</span>
            <h2>Tu presencia profesional, en un solo lugar.</h2>
            <p>
              Revisa tus proyectos, enlaces y visitas. Sigue construyendo un
              portafolio que muestre lo que sabes hacer.
            </p>
          </div>

          <button
            type="button"
            className="pt-button"
            onClick={handleViewPortfolio}
          >
            Ver mi portafolio
            <Icon name="arrow" />
          </button>
        </section>

        <section className="pt-stats" aria-label="Resumen de actividad">
          <article className="pt-stat">
            <div className="pt-stat-top">
              <span className="pt-stat-label">Proyectos</span>
              <span className="pt-stat-icon"><Icon name="projects" /></span>
            </div>
            <h2>{projectCount}</h2>
            <p>{projectCount === 1 ? "Proyecto publicado" : "Proyectos publicados"}</p>
          </article>

          <article className="pt-stat">
            <div className="pt-stat-top">
              <span className="pt-stat-label">Enlaces</span>
              <span className="pt-stat-icon"><Icon name="links" /></span>
            </div>
            <h2>{linkCount}</h2>
            <p>{linkCount === 1 ? "Enlace agregado" : "Enlaces agregados"}</p>
          </article>

          <article className="pt-stat">
            <div className="pt-stat-top">
              <span className="pt-stat-label">Visitas</span>
              <span className="pt-stat-icon"><Icon name="stats" /></span>
            </div>
            <h2>{visitCount}</h2>
            <p>{visitCount === 1 ? "Visita a tu portafolio" : "Visitas a tu portafolio"}</p>
          </article>
        </section>

        <section className="pt-lower-grid">
          <article className="pt-card">
            <div className="pt-card-heading">
              <span className="pt-card-icon"><Icon name="user" /></span>
              <div>
                <h3>Continúa armando tu portafolio</h3>
                <p>
                  Añade tu experiencia y tus proyectos para que las personas
                  conozcan mejor tu trabajo.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="pt-card-action"
              onClick={() => navigate("/profile")}
            >
              Editar mi perfil
              <Icon name="arrow" />
            </button>
          </article>

          <article className="pt-card">
            <div className="pt-card-heading">
              <span className="pt-card-icon"><Icon name="share" /></span>
              <div>
                <h3>Tu portafolio público</h3>
                <p>Tu perfil está listo para que lo compartas.</p>
              </div>
            </div>

            <div className="pt-public-link">
              <span>/u/{user.username}</span>
              <button
                type="button"
                aria-label="Ver mi portafolio"
                onClick={handleViewPortfolio}
              >
                <Icon name="arrow" />
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;