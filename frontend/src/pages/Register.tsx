import { useState, type CSSProperties, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import registerBackdrop from "../assets/register-bg.png";

const registerStyles = `
  .pv-reg, .pv-reg * { box-sizing: border-box; }

  .pv-reg {
    --register-bg: none;
    position: relative;
    isolation: isolate;
    min-height: 100vh;
    min-height: 100svh;
    overflow: hidden;
    display: grid;
    place-items: center;
    padding: 88px clamp(18px, 5vw, 72px) 32px;
    color: #fff;
    background: #1b3046;
    font-family: inherit;
  }

  .pv-reg::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -2;
    background:
      linear-gradient(90deg, rgb(16 32 49 / 72%), rgb(23 42 61 / 45%) 54%, rgb(16 32 49 / 45%)),
      var(--register-bg) center / cover no-repeat;
    transform: scale(1.025);
    animation: pv-reg-drift 26s ease-in-out infinite alternate;
  }

  .pv-reg::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(0deg, rgb(13 27 43 / 32%), transparent 62%);
  }

  .pv-reg__brand {
    position: absolute;
    top: 25px;
    left: clamp(18px, 5vw, 72px);
    display: inline-flex;
    align-items: center;
    gap: 11px;
    color: #fff;
    text-decoration: none;
    animation: pv-reg-rise .7s both;
  }

  .pv-reg__mark {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 46%);
    border-radius: 13px;
    background: rgb(226 238 248 / 15%);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 25%);
    backdrop-filter: blur(14px);
    font-size: 20px;
    font-weight: 650;
  }

  .pv-reg__brand-name {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: .025em;
  }

  .pv-reg__layout {
    width: min(1120px, 100%);
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(350px, 440px);
    align-items: center;
    gap: clamp(38px, 8vw, 104px);
  }

  .pv-reg__intro {
    max-width: 570px;
    padding: 25px 0;
    animation: pv-reg-rise .8s .08s both;
  }

  .pv-reg__eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 20px;
    color: rgb(239 246 251 / 86%);
    font-size: 10px;
    font-weight: 650;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  .pv-reg__eyebrow::before {
    content: "";
    width: 25px;
    height: 1px;
    background: #c5d7e7;
  }

  .pv-reg__intro h1 {
    max-width: 600px;
    margin: 0;
    color: #fff;
    font-size: clamp(40px, 5.2vw, 68px);
    font-weight: 520;
    letter-spacing: -.06em;
    line-height: .99;
    text-wrap: balance;
  }

  .pv-reg__intro h1 span {
    color: #cad9e6;
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 400;
    font-style: italic;
  }

  .pv-reg__copy {
    max-width: 440px;
    margin: 21px 0 24px;
    color: rgb(240 246 250 / 84%);
    font-size: 14px;
    line-height: 1.75;
  }

  .pv-reg__features {
    display: grid;
    gap: 13px;
  }

  .pv-reg__feature {
    display: flex;
    align-items: center;
    gap: 11px;
    color: rgb(249 252 255 / 92%);
    font-size: 12px;
  }

  .pv-reg__check {
    width: 23px;
    height: 23px;
    flex: none;
    display: grid;
    place-items: center;
    border: 1px solid rgb(231 241 249 / 35%);
    border-radius: 50%;
    background: rgb(217 231 242 / 12%);
    color: #e1edf6;
    font-size: 12px;
  }

  .pv-reg__panel {
    position: relative;
    overflow: hidden;
    padding: clamp(25px, 3.3vw, 38px);
    border: 1px solid rgb(255 255 255 / 54%);
    border-radius: 23px;
    background: linear-gradient(145deg, rgb(250 252 254 / 91%), rgb(235 242 248 / 80%));
    color: #1b2d3e;
    box-shadow: 0 26px 80px rgb(6 17 29 / 27%), inset 0 1px 0 rgb(255 255 255 / 90%);
    backdrop-filter: blur(28px) saturate(145%);
    -webkit-backdrop-filter: blur(28px) saturate(145%);
    animation: pv-reg-rise .8s .16s both;
  }

  .pv-reg__panel::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(130deg, rgb(255 255 255 / 48%), transparent 40%, transparent 74%, rgb(200 218 232 / 14%));
  }

  .pv-reg__panel-inner {
    position: relative;
    z-index: 1;
  }

  .pv-reg__kicker {
    margin: 0 0 9px;
    color: #647a8e;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .16em;
  }

  .pv-reg__panel h2 {
    margin: 0;
    color: #192b3c;
    font-size: clamp(28px, 3vw, 33px);
    font-weight: 560;
    letter-spacing: -.045em;
    line-height: 1.1;
  }

  .pv-reg__note {
    margin: 10px 0 22px;
    color: #5b6e7f;
    font-size: 12px;
    line-height: 1.6;
  }

  .pv-reg__form {
    display: grid;
    gap: 14px;
  }

  .pv-reg__field label {
    display: block;
    margin: 0 0 7px;
    color: #304457;
    font-size: 11px;
    font-weight: 650;
  }

  .pv-reg__input {
    min-height: 46px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 12px;
    border: 1px solid rgb(74 99 119 / 21%);
    border-radius: 10px;
    background: rgb(255 255 255 / 72%);
    transition: border-color .2s, box-shadow .2s, background .2s;
  }

  .pv-reg__input:focus-within {
    border-color: #7899b2;
    background: #fff;
    box-shadow: 0 0 0 4px rgb(105 146 174 / 13%);
  }

  .pv-reg__input > svg {
    width: 17px;
    height: 17px;
    flex: none;
    color: #7890a2;
  }

  .pv-reg__input input {
    width: 100%;
    min-width: 0;
    padding: 12px 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: #1a2c3b;
    font: inherit;
    font-size: 12px;
  }

  .pv-reg__input input::placeholder {
    color: #92a0aa;
  }

  .pv-reg__username-prefix {
    color: #7890a2;
    font-size: 14px;
  }

  .pv-reg__password-toggle {
    flex: none;
    padding: 6px 0 6px 7px;
    border: 0;
    background: transparent;
    color: #58748c;
    font: inherit;
    font-size: 10px;
    cursor: pointer;
  }

  .pv-reg__help {
    display: block;
    margin-top: 6px;
    color: #718391;
    font-size: 9px;
  }

  .pv-reg__alert {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    padding: 10px 11px;
    border: 1px solid rgb(174 84 75 / 21%);
    border-radius: 10px;
    background: rgb(255 245 243 / 92%);
    color: #713a36;
    font-size: 10px;
    line-height: 1.5;
  }

  .pv-reg__alert--success {
    border-color: rgb(66 133 101 / 25%);
    background: rgb(240 250 244 / 94%);
    color: #315e45;
  }

  .pv-reg__alert p {
    margin: 0;
  }

  .pv-reg__alert strong {
    display: block;
    margin-bottom: 2px;
  }

  .pv-reg__alert-icon {
    width: 18px;
    height: 18px;
    flex: none;
    display: grid;
    place-items: center;
    border: 1px solid currentColor;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 700;
  }

  .pv-reg__submit {
    min-height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    margin-top: 2px;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 10px;
    background: linear-gradient(110deg, #263f56, #3a5d78 55%, #2b4962);
    color: #fff;
    box-shadow: 0 8px 20px rgb(34 62 82 / 19%), inset 0 1px 0 rgb(255 255 255 / 18%);
    font: inherit;
    font-size: 12px;
    font-weight: 650;
    cursor: pointer;
    transition: transform .2s, box-shadow .2s;
  }

  .pv-reg__submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgb(34 62 82 / 26%);
  }

  .pv-reg__submit:disabled {
    opacity: .72;
    cursor: wait;
  }

  .pv-reg__submit svg {
    width: 16px;
    height: 16px;
    transition: transform .2s;
  }

  .pv-reg__submit:hover svg {
    transform: translateX(3px);
  }

  .pv-reg__divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 18px 0 12px;
    color: #748595;
    font-size: 10px;
  }

  .pv-reg__divider::before,
  .pv-reg__divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgb(64 88 105 / 17%);
  }

  .pv-reg__login {
    display: block;
    padding: 11px;
    border: 1px solid rgb(69 97 119 / 20%);
    border-radius: 10px;
    background: rgb(255 255 255 / 42%);
    color: #28465c;
    text-align: center;
    text-decoration: none;
    font-size: 11px;
    font-weight: 650;
    transition: background .2s;
  }

  .pv-reg__login:hover {
    background: rgb(255 255 255 / 86%);
  }

  .pv-reg__login-after {
    width: 100%;
    padding: 11px;
    border: 0;
    border-radius: 10px;
    background: #e5f0e9;
    color: #315e45;
    font: inherit;
    font-size: 11px;
    font-weight: 650;
    cursor: pointer;
  }

  .pv-reg__back {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: 15px;
    color: #657988;
    text-decoration: none;
    font-size: 10px;
  }

  .pv-reg__back svg {
    width: 14px;
    height: 14px;
  }

  @keyframes pv-reg-rise {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pv-reg-drift {
    from { transform: scale(1.025) translate3d(0, 0, 0); }
    to { transform: scale(1.07) translate3d(-.4%, .3%, 0); }
  }

  @media (max-width: 900px) {
    .pv-reg__layout {
      grid-template-columns: minmax(0, 1fr) minmax(330px, 390px);
      gap: 30px;
    }

    .pv-reg__intro h1 {
      font-size: clamp(38px, 5.5vw, 54px);
    }
  }

  @media (max-width: 700px) {
    .pv-reg {
      display: block;
      padding: 82px 18px 24px;
    }

    .pv-reg__brand {
      top: 17px;
      left: 18px;
    }

    .pv-reg__layout {
      width: min(490px, 100%);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 20px;
    }

    .pv-reg__intro {
      padding: 7px 0 0;
    }

    .pv-reg__eyebrow {
      margin-bottom: 13px;
    }

    .pv-reg__intro h1 {
      font-size: clamp(37px, 9vw, 51px);
    }

    .pv-reg__copy {
      margin: 13px 0 15px;
      font-size: 12px;
      line-height: 1.6;
    }

    .pv-reg__features {
      gap: 8px;
    }

    .pv-reg__feature {
      font-size: 10px;
    }

    .pv-reg__panel {
      width: 100%;
      padding: 24px 22px;
      border-radius: 20px;
    }
  }

  @media (max-width: 390px) {
    .pv-reg {
      padding: 76px 13px 18px;
    }

    .pv-reg__brand {
      left: 13px;
      top: 13px;
    }

    .pv-reg__intro h1 {
      font-size: 36px;
    }

    .pv-reg__panel {
      padding: 21px 17px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pv-reg *,
    .pv-reg *::before,
    .pv-reg *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .01ms !important;
    }
  }
`;

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const clearFeedback = () => {
    setMessage("");
    setIsSuccess(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            username,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "No se pudo crear la cuenta");
        return;
      }

      setIsSuccess(true);
      setMessage("Tu cuenta se creó correctamente. Ya puedes iniciar sesión.");
      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  const backgroundStyle = {
    "--register-bg": `url(${registerBackdrop})`,
  } as CSSProperties & { "--register-bg": string };

  return (
    <main className="pv-reg" style={backgroundStyle}>
      <style>{registerStyles}</style>

      <Link to="/" className="pv-reg__brand" aria-label="Portavia, volver al inicio">
        <span className="pv-reg__mark" aria-hidden="true">p</span>
        <span className="pv-reg__brand-name">Portavia</span>
      </Link>

      <div className="pv-reg__layout">
        <section className="pv-reg__intro" aria-label="Tu espacio profesional">
          <p className="pv-reg__eyebrow">Crea tu espacio profesional</p>
          <h1>Tu trabajo merece <span>ser visto.</span></h1>
          <p className="pv-reg__copy">
            Reúne tu perfil, proyectos y enlaces en un portafolio claro,
            profesional y listo para compartir.
          </p>

          <div className="pv-reg__features">
            <div className="pv-reg__feature">
              <span className="pv-reg__check" aria-hidden="true">✓</span>
              <span>Tu perfil y proyectos, en un solo lugar.</span>
            </div>
            <div className="pv-reg__feature">
              <span className="pv-reg__check" aria-hidden="true">✓</span>
              <span>Una presencia profesional lista para compartir.</span>
            </div>
            <div className="pv-reg__feature">
              <span className="pv-reg__check" aria-hidden="true">✓</span>
              <span>Consulta las visitas de tu portafolio.</span>
            </div>
          </div>
        </section>

        <section className="pv-reg__panel" aria-labelledby="register-title">
          <div className="pv-reg__panel-inner">
            <p className="pv-reg__kicker">EMPIEZA A CONSTRUIR</p>
            <h2 id="register-title">Crear cuenta</h2>
            <p className="pv-reg__note">
              Completa tus datos para abrir tu espacio profesional.
            </p>

            <form onSubmit={handleSubmit} className="pv-reg__form">
              <div className="pv-reg__field">
                <label htmlFor="name">Nombre</label>
                <div className="pv-reg__input">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre completo"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      clearFeedback();
                    }}
                    required
                  />
                </div>
              </div>

              <div className="pv-reg__field">
                <label htmlFor="email">Correo electrónico</label>
                <div className="pv-reg__input">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      clearFeedback();
                    }}
                    required
                  />
                </div>
              </div>

              <div className="pv-reg__field">
                <label htmlFor="username">Username</label>
                <div className="pv-reg__input">
                  <span className="pv-reg__username-prefix" aria-hidden="true">@</span>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="tuusuario"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                      clearFeedback();
                    }}
                    minLength={3}
                    required
                  />
                </div>
                <span className="pv-reg__help">
                  Este nombre identificará tu perfil.
                </span>
              </div>

              <div className="pv-reg__field">
                <label htmlFor="password">Contraseña</label>
                <div className="pv-reg__input">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Crea una contraseña"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      clearFeedback();
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="pv-reg__password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
              </div>

              {message && (
                <div
                  className={`pv-reg__alert ${isSuccess ? "pv-reg__alert--success" : ""}`}
                  role="alert"
                >
                  <span className="pv-reg__alert-icon" aria-hidden="true">
                    {isSuccess ? "✓" : "i"}
                  </span>
                  <div>
                    {isSuccess && <strong>Cuenta creada</strong>}
                    <p>{message}</p>
                  </div>
                </div>
              )}

              <button type="submit" className="pv-reg__submit" disabled={isLoading}>
                <span>{isLoading ? "Creando cuenta..." : "Crear cuenta"}</span>
                {!isLoading && (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </form>

            {isSuccess ? (
              <button
                type="button"
                className="pv-reg__login-after"
                onClick={() => navigate("/login")}
              >
                Ir a iniciar sesión
              </button>
            ) : (
              <>
                <div className="pv-reg__divider">¿Ya tienes una cuenta?</div>
                <Link to="/login" className="pv-reg__login">
                  Iniciar sesión
                </Link>
              </>
            )}

            <Link to="/" className="pv-reg__back">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5m6 6-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Volver al inicio
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Register;