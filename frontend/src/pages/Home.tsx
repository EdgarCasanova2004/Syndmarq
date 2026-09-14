import { Link } from "react-router-dom";
import "../App.css";

type IconName =
  | "arrow"
  | "sparkle"
  | "user"
  | "projects"
  | "share"
  | "layers"
  | "palette"
  | "refresh"
  | "chart"
  | "qr"
  | "check";

function Icon({
  name,
  size = 18,
}: {
  name: IconName;
  size?: number;
}) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow":
      return (
        <svg {...commonProps}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case "sparkle":
      return (
        <svg {...commonProps}>
          <path d="M12 3l1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Z" />
          <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" />
          <path d="M5 14l.6 1.4L7 16l-1.4.6L5 18l-.6-1.4L3 16l1.4-.6L5 14Z" />
        </svg>
      );

    case "user":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
        </svg>
      );

    case "projects":
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M3 9h18" />
          <path d="M8 4v5" />
        </svg>
      );

    case "share":
      return (
        <svg {...commonProps}>
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path d="m8.2 10.8 7.6-4.4" />
          <path d="m8.2 13.2 7.6 4.4" />
        </svg>
      );

    case "layers":
      return (
        <svg {...commonProps}>
          <path d="m12 3 8 4-8 4-8-4 8-4Z" />
          <path d="m4 12 8 4 8-4" />
          <path d="m4 17 8 4 8-4" />
        </svg>
      );

    case "palette":
      return (
        <svg {...commonProps}>
          <path d="M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a1.5 1.5 0 0 1 0-3h3a6 6 0 0 0 0-12h-3Z" />
          <circle cx="7.5" cy="9" r=".8" fill="currentColor" stroke="none" />
          <circle cx="10" cy="6.5" r=".8" fill="currentColor" stroke="none" />
          <circle cx="14" cy="6.5" r=".8" fill="currentColor" stroke="none" />
        </svg>
      );

    case "refresh":
      return (
        <svg {...commonProps}>
          <path d="M20 7v5h-5" />
          <path d="M4 17v-5h5" />
          <path d="M6.1 8a7 7 0 0 1 11.5-2.2L20 8" />
          <path d="M17.9 16A7 7 0 0 1 6.4 18.2L4 16" />
        </svg>
      );

    case "chart":
      return (
        <svg {...commonProps}>
          <path d="M4 20V10" />
          <path d="M10 20V4" />
          <path d="M16 20v-7" />
          <path d="M22 20V7" />
        </svg>
      );

    case "qr":
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="6" height="6" rx="1" />
          <rect x="15" y="3" width="6" height="6" rx="1" />
          <rect x="3" y="15" width="6" height="6" rx="1" />
          <path d="M15 15h2v2h-2z" />
          <path d="M19 15h2v2h-2z" />
          <path d="M15 19h2v2h-2z" />
          <path d="M19 19h2v2h-2z" />
        </svg>
      );

    case "check":
      return (
        <svg {...commonProps}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    default:
      return null;
  }
}

function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="sy-home">
      <header className="sy-nav">
        <a href="#inicio" className="sy-brand" aria-label="Ir al inicio">
          <span className="sy-brand-mark">
            <span>S</span>
          </span>
          <span className="sy-brand-name">Syndmarq</span>
        </a>

        <nav className="sy-nav-links" aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#beneficios">Beneficios</a>
          <a href="#ejemplo">Ejemplo</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <div className="sy-nav-actions">
          <Link to="/login" className="sy-btn sy-btn-ghost">
            Iniciar sesión
          </Link>

          <Link to="/register" className="sy-btn sy-btn-dark">
            Crear portafolio
          </Link>
        </div>
      </header>

      <main>
        <section id="inicio" className="sy-hero">
          <div className="sy-hero-orb sy-hero-orb-a" />
          <div className="sy-hero-orb sy-hero-orb-b" />

          <div className="sy-hero-grid">
            <div className="sy-hero-copy">
              <div className="sy-kicker">
                <span className="sy-kicker-line" />
                <span>IDENTIDAD PROFESIONAL DIGITAL</span>
              </div>

              <h1>
                Tu trabajo merece
                <span> una mejor vitrina.</span>
              </h1>

              <p className="sy-hero-text">
                Reúne tu perfil, proyectos, enlaces y experiencia en una sola
                página premium, limpia y lista para compartir con reclutadores,
                clientes y nuevas oportunidades.
              </p>

              <div className="sy-hero-actions">
                <Link to="/register" className="sy-btn sy-btn-primary">
                  Crear mi portafolio
                  <Icon name="arrow" size={16} />
                </Link>

                <a href="#ejemplo" className="sy-btn sy-btn-light">
                  Ver ejemplo
                </a>
              </div>

              <div className="sy-proof">
                <div className="sy-proof-item">
                  <span className="sy-proof-icon">
                    <Icon name="layers" size={17} />
                  </span>
                  <div className="sy-proof-copy">
                    <strong>Todo en un solo lugar</strong>
                    <span>Perfil, proyectos y enlaces</span>
                  </div>
                </div>

                <div className="sy-proof-item">
                  <span className="sy-proof-icon">
                    <Icon name="qr" size={17} />
                  </span>
                  <div className="sy-proof-copy">
                    <strong>QR incluido</strong>
                    <span>Comparte en segundos</span>
                  </div>
                </div>

                <div className="sy-proof-item">
                  <span className="sy-proof-icon">
                    <Icon name="palette" size={17} />
                  </span>
                  <div className="sy-proof-copy">
                    <strong>Temas profesionales</strong>
                    <span>Hazlo realmente tuyo</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sy-hero-showcase" aria-label="Vista previa del portafolio">
              <div className="sy-browser-glow" />

              <div className="sy-browser">
                <div className="sy-browser-top">
                  <div className="sy-browser-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="sy-browser-address">
                    <span className="sy-address-lock">●</span>
                    syndmarq.app/u/uriel
                  </div>
                </div>

                <div className="sy-preview">
                  <div className="sy-preview-head">
                    <div className="sy-preview-avatar">
                      U
                    </div>

                    <div>
                      <span className="sy-preview-kicker">
                        PORTAFOLIO PROFESIONAL
                      </span>
                      <h3>Uriel Casanova</h3>
                      <p>Desarrollador de Software</p>
                    </div>
                  </div>

                  <p className="sy-preview-bio">
                    Creo productos digitales funcionales, claros y pensados
                    para resolver problemas reales.
                  </p>

                  <div className="sy-preview-socials">
                    <span>GitHub</span>
                    <span>LinkedIn</span>
                    <span>Contacto</span>
                  </div>

                  <div className="sy-preview-projects">
                    <article>
                      <div className="sy-preview-cover sy-preview-cover-a">
                        <span className="sy-preview-cover-badge">WEB</span>
                        <span className="sy-preview-cover-number">01</span>
                      </div>

                      <small>Desarrollo Web</small>
                      <strong>Sistema de eventos</strong>
                    </article>

                    <article>
                      <div className="sy-preview-cover sy-preview-cover-b">
                        <span className="sy-preview-cover-badge">APP</span>
                        <span className="sy-preview-cover-number">02</span>
                      </div>

                      <small>Software</small>
                      <strong>Gestión personal</strong>
                    </article>
                  </div>
                </div>
              </div>

              <div className="sy-float-card sy-float-card-a">
                <span className="sy-float-icon">
                  <Icon name="share" size={16} />
                </span>
                <div>
                  <strong>Listo para compartir</strong>
                  <small>URL + código QR</small>
                </div>
              </div>

              <div className="sy-float-card sy-float-card-b">
                <span className="sy-float-icon">
                  <Icon name="palette" size={16} />
                </span>
                <div>
                  <strong>Personalizable</strong>
                  <small>Temas profesionales</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="sy-section sy-how">
          <div className="sy-section-head">
            <div>
              <span className="sy-section-label">Cómo funciona</span>
              <h2>De cero a portafolio en cuatro pasos.</h2>
            </div>

            <p>
              Sin procesos complicados. Configura tu perfil, agrega tu trabajo
              y comparte una presencia profesional que puedes actualizar
              cuando quieras.
            </p>
          </div>

          <div className="sy-steps">
            <article className="sy-step">
              <div className="sy-step-top">
                <span className="sy-step-icon">
                  <Icon name="user" size={19} />
                </span>
                <span className="sy-step-index">01</span>
              </div>
              <div className="sy-step-copy">
                <h3>Crea tu cuenta</h3>
                <p>
                  Regístrate y elige tu username para obtener tu página pública.
                </p>
              </div>
            </article>

            <article className="sy-step">
              <div className="sy-step-top">
                <span className="sy-step-icon">
                  <Icon name="palette" size={19} />
                </span>
                <span className="sy-step-index">02</span>
              </div>
              <div className="sy-step-copy">
                <h3>Completa tu perfil</h3>
                <p>
                  Agrega tu foto, profesión, biografía y enlaces importantes.
                </p>
              </div>
            </article>

            <article className="sy-step">
              <div className="sy-step-top">
                <span className="sy-step-icon">
                  <Icon name="projects" size={19} />
                </span>
                <span className="sy-step-index">03</span>
              </div>
              <div className="sy-step-copy">
                <h3>Sube tus proyectos</h3>
                <p>
                  Organiza tus mejores trabajos con imagen, categoría y enlace.
                </p>
              </div>
            </article>

            <article className="sy-step">
              <div className="sy-step-top">
                <span className="sy-step-icon">
                  <Icon name="share" size={19} />
                </span>
                <span className="sy-step-index">04</span>
              </div>
              <div className="sy-step-copy">
                <h3>Comparte</h3>
                <p>
                  Envía tu URL o código QR en tu CV, redes, correo o mensajes.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section id="beneficios" className="sy-section sy-benefits">
          <div className="sy-benefits-copy">
            <span className="sy-section-label">Beneficios</span>
            <h2>Una presencia profesional que trabaja contigo.</h2>
            <p>
              No es solo una lista de enlaces. Es una página que concentra tu
              identidad, tus proyectos y la forma en que quieres presentarte.
            </p>

            <Link to="/register" className="sy-text-link">
              Crear mi portafolio
              <Icon name="arrow" size={15} />
            </Link>
          </div>

          <div className="sy-bento">
            <article className="sy-bento-card sy-bento-dark">
              <span className="sy-bento-symbol">
                <Icon name="layers" size={20} />
              </span>
              <div>
                <h3>Todo en un solo lugar</h3>
                <p>
                  Perfil, proyectos, redes y contacto organizados en una sola
                  página.
                </p>
              </div>
            </article>

            <article className="sy-bento-card">
              <span className="sy-bento-symbol">
                <Icon name="palette" size={20} />
              </span>
              <div>
                <h3>Diseño profesional</h3>
                <p>
                  Temas visuales pensados para que tu contenido sea el
                  protagonista.
                </p>
              </div>
            </article>

            <article className="sy-bento-card">
              <span className="sy-bento-symbol">
                <Icon name="share" size={20} />
              </span>
              <div>
                <h3>Fácil de compartir</h3>
                <p>
                  Una URL limpia y un QR listo para usar donde lo necesites.
                </p>
              </div>
            </article>

            <article className="sy-bento-card">
              <span className="sy-bento-symbol">
                <Icon name="refresh" size={20} />
              </span>
              <div>
                <h3>Siempre actualizado</h3>
                <p>
                  Edita tu información sin volver a crear un documento nuevo.
                </p>
              </div>
            </article>

            <article className="sy-bento-card sy-bento-wide">
              <div className="sy-bento-wide-copy">
                <span className="sy-bento-symbol">
                  <Icon name="chart" size={20} />
                </span>

                <div>
                  <h3>Estadísticas útiles</h3>
                  <p>
                    Consulta el alcance de tu portafolio y las visitas que
                    recibe.
                  </p>
                </div>
              </div>

              <div className="sy-mini-chart" aria-hidden="true">
                <span style={{ height: "34%" }} />
                <span style={{ height: "51%" }} />
                <span style={{ height: "45%" }} />
                <span style={{ height: "69%" }} />
                <span style={{ height: "61%" }} />
                <span style={{ height: "84%" }} />
                <span style={{ height: "96%" }} />
              </div>
            </article>
          </div>
        </section>

        <section id="ejemplo" className="sy-section sy-example">
          <div className="sy-example-head">
            <div>
              <span className="sy-section-label">Ejemplo</span>
              <h2>Tu experiencia, presentada con intención.</h2>
            </div>

            <p>
              Una página clara, visual y responsive que pone tus proyectos por
              delante del ruido.
            </p>
          </div>

          <div className="sy-portfolio-demo">
            <aside className="sy-demo-sidebar">
              <div className="sy-demo-avatar">U</div>

              <div>
                <span className="sy-demo-status">
                  <span />
                  DISPONIBLE PARA PROYECTOS
                </span>
                <h3>Uriel Casanova</h3>
                <p className="sy-demo-role">Desarrollador de Software</p>
              </div>

              <p className="sy-demo-about">
                Desarrollo experiencias digitales centradas en funcionalidad,
                claridad y una buena presentación.
              </p>

              <div className="sy-demo-tags">
                <span>React</span>
                <span>TypeScript</span>
                <span>PostgreSQL</span>
              </div>

              <Link to="/register" className="sy-demo-cta">
                Crear uno como este
                <Icon name="arrow" size={14} />
              </Link>
            </aside>

            <div className="sy-demo-content">
              <div className="sy-demo-title-row">
                <div>
                  <span>PROYECTOS DESTACADOS</span>
                  <h3>Trabajo reciente</h3>
                </div>

                <small>02 proyectos</small>
              </div>

              <div className="sy-demo-grid">
                <article>
                  <div className="sy-demo-project-art sy-demo-project-a">
                    <span className="sy-demo-project-number">01</span>
                    <span className="sy-demo-project-badge">WEB</span>
                  </div>

                  <div className="sy-demo-project-copy">
                    <small>Desarrollo Web</small>
                    <h4>Sistema de eventos</h4>
                    <p>
                      Plataforma para gestionar eventos, asistentes y contenido
                      desde un mismo lugar.
                    </p>
                    <span className="sy-demo-project-link">
                      Ver proyecto
                      <Icon name="arrow" size={13} />
                    </span>
                  </div>
                </article>

                <article>
                  <div className="sy-demo-project-art sy-demo-project-b">
                    <span className="sy-demo-project-number">02</span>
                    <span className="sy-demo-project-badge">APP</span>
                  </div>

                  <div className="sy-demo-project-copy">
                    <small>Aplicación móvil</small>
                    <h4>Gestión personal</h4>
                    <p>
                      Aplicación para organización, productividad y seguimiento
                      de actividades.
                    </p>
                    <span className="sy-demo-project-link">
                      Ver proyecto
                      <Icon name="arrow" size={13} />
                    </span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="sy-section sy-audience">
          <div className="sy-section-head">
            <div>
              <span className="sy-section-label">Para quién es</span>
              <h2>Una herramienta para distintas etapas profesionales.</h2>
            </div>

            <p>
              No importa si estás comenzando o ya tienes experiencia. Lo
              importante es que tu trabajo tenga un lugar donde verse bien.
            </p>
          </div>

          <div className="sy-audience-grid">
            <article>
              <div className="sy-audience-top">
                <span>01</span>
                <Icon name="user" size={18} />
              </div>
              <h3>Estudiantes</h3>
              <p>Proyectos académicos, prácticas y primeros trabajos.</p>
            </article>

            <article>
              <div className="sy-audience-top">
                <span>02</span>
                <Icon name="projects" size={18} />
              </div>
              <h3>Profesionales</h3>
              <p>Experiencia y proyectos para nuevas oportunidades.</p>
            </article>

            <article>
              <div className="sy-audience-top">
                <span>03</span>
                <Icon name="share" size={18} />
              </div>
              <h3>Freelancers</h3>
              <p>Servicios, casos de éxito y formas de contacto.</p>
            </article>

            <article>
              <div className="sy-audience-top">
                <span>04</span>
                <Icon name="layers" size={18} />
              </div>
              <h3>Emprendedores</h3>
              <p>Proyectos, servicios y presencia digital en un enlace.</p>
            </article>
          </div>
        </section>

        <section className="sy-final">
          <div className="sy-final-glow" />

          <div className="sy-final-copy">
            <span>Tu próximo proyecto merece ser visto.</span>
            <h2>Construye una presencia profesional que sí te represente.</h2>
            <p>
              Empieza con lo que ya tienes. Tu perfil puede crecer contigo.
            </p>
          </div>

          <Link to="/register" className="sy-final-button">
            Empezar gratis
            <Icon name="arrow" size={15} />
          </Link>
        </section>
      </main>

      <footer id="contacto" className="sy-footer">
        <div className="sy-footer-top">
          <div className="sy-footer-brand">
            <a href="#inicio" className="sy-brand">
              <span className="sy-brand-mark">
                <span>S</span>
              </span>
              <span className="sy-brand-name">Syndmarq</span>
            </a>

            <p>
              Una plataforma para construir, organizar y compartir tu identidad
              profesional digital.
            </p>
          </div>

          <div className="sy-footer-col">
            <strong>Plataforma</strong>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#beneficios">Beneficios</a>
            <a href="#ejemplo">Ejemplo</a>
          </div>

          <div className="sy-footer-col">
            <strong>Cuenta</strong>
            <Link to="/register">Crear portafolio</Link>
            <Link to="/login">Iniciar sesión</Link>
          </div>

          <div className="sy-footer-col">
            <strong>Contacto</strong>
            <a href="mailto:contacto@syndmarq.com">contacto@syndmarq.com</a>
            <span>Soluciones digitales</span>
          </div>
        </div>

        <div className="sy-footer-bottom">
          <span>© {year} Syndmarq. Todos los derechos reservados.</span>
          <span>Plataforma Web de Portafolio Profesional</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
