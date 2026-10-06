import { useState, type CSSProperties, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import loginBackdrop from "../assets/login-office-4k.jpg";

const styles = `
  .pv-auth, .pv-auth * { box-sizing: border-box; }
  .pv-auth { position: relative; isolation: isolate; min-height: 100vh; min-height: 100svh; overflow: hidden; display: grid; place-items: center; padding: 92px clamp(20px, 5vw, 76px) 38px; color: #fff; background: #17283b; font-family: inherit; }
  .pv-auth__photo { position: absolute; inset: 0; z-index: -3; background: center / cover no-repeat; background-image: var(--pv-auth-image); transform: scale(1.025); animation: pv-auth-drift 28s ease-in-out infinite alternate; }
  .pv-auth__shade { position: absolute; inset: 0; z-index: -2; background: linear-gradient(90deg, rgba(12,25,41,.73), rgba(16,35,53,.46) 52%, rgba(12,25,41,.43)), linear-gradient(0deg, rgba(12,25,41,.4), transparent 65%); }
  .pv-auth__top { position: absolute; top: 26px; left: clamp(20px, 5vw, 76px); display: inline-flex; align-items: center; gap: 11px; color: #fff; text-decoration: none; animation: pv-auth-rise .7s both; }
  .pv-auth__mark { width: 38px; height: 38px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.5); border-radius: 13px; background: rgba(229,239,248,.15); box-shadow: inset 0 1px 0 rgba(255,255,255,.25); backdrop-filter: blur(14px); font-size: 20px; font-weight: 650; }
  .pv-auth__brand { font-size: 17px; font-weight: 600; letter-spacing: .025em; }
  .pv-auth__layout { width: min(1120px, 100%); display: grid; grid-template-columns: minmax(0, 1fr) minmax(350px, 430px); align-items: center; gap: clamp(40px, 9vw, 120px); }
  .pv-auth__intro { max-width: 590px; padding: 28px 0; animation: pv-auth-rise .8s .08s both; }
  .pv-auth__eyebrow { display: flex; align-items: center; gap: 10px; margin: 0 0 21px; color: rgba(234,243,250,.84); font-size: 10px; font-weight: 650; letter-spacing: .18em; text-transform: uppercase; }
  .pv-auth__eyebrow::before { content: ''; width: 25px; height: 1px; background: #c5d7e7; }
  .pv-auth__intro h1 { max-width: 620px; margin: 0; color: #fff; font-size: clamp(42px, 5.3vw, 70px); font-weight: 520; letter-spacing: -.06em; line-height: .99; text-wrap: balance; }
  .pv-auth__intro h1 span { color: #cad9e6; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-style: italic; }
  .pv-auth__copy { max-width: 440px; margin: 22px 0 26px; color: rgba(240,246,250,.82); font-size: 15px; line-height: 1.75; }
  .pv-auth__benefits { display: flex; flex-wrap: wrap; gap: 9px; }
  .pv-auth__benefit { display: inline-flex; align-items: center; gap: 8px; padding: 9px 12px; border: 1px solid rgba(231,241,249,.22); border-radius: 999px; background: rgba(217,231,242,.1); color: rgba(249,252,255,.92); font-size: 10px; backdrop-filter: blur(10px); }
  .pv-auth__benefit svg { width: 14px; height: 14px; color: #d6e7f3; }
  .pv-auth__panel { position: relative; overflow: hidden; padding: clamp(26px, 3.5vw, 42px); border: 1px solid rgba(255,255,255,.52); border-radius: 24px; background: linear-gradient(145deg, rgba(250,252,254,.89), rgba(235,242,248,.78)); color: #1b2d3e; box-shadow: 0 26px 85px rgba(6,17,29,.27), inset 0 1px 0 rgba(255,255,255,.9); backdrop-filter: blur(28px) saturate(145%); -webkit-backdrop-filter: blur(28px) saturate(145%); animation: pv-auth-rise .8s .16s both; }
  .pv-auth__panel::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(130deg, rgba(255,255,255,.5), transparent 38%, transparent 74%, rgba(200,218,232,.12)); }
  .pv-auth__panel-content { position: relative; z-index: 1; }
  .pv-auth__kicker { margin: 0 0 10px; color: #647a8e; font-size: 10px; font-weight: 700; letter-spacing: .16em; }
  .pv-auth__panel h2 { margin: 0; color: #192b3c; font-size: clamp(28px, 3vw, 34px); font-weight: 560; letter-spacing: -.045em; line-height: 1.1; }
  .pv-auth__note { margin: 11px 0 25px; color: #5b6e7f; font-size: 13px; line-height: 1.6; }
  .pv-auth__form { display: grid; gap: 17px; }
  .pv-auth__field label { display: block; margin: 0 0 8px; color: #304457; font-size: 11px; font-weight: 650; }
  .pv-auth__label-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .pv-auth__forgot { padding: 0; border: 0; background: none; color: #58748c; font: inherit; font-size: 10px; cursor: pointer; }
  .pv-auth__forgot:hover { text-decoration: underline; }
  .pv-auth__input { min-height: 49px; display: flex; align-items: center; gap: 11px; padding: 0 13px; border: 1px solid rgba(74,99,119,.2); border-radius: 11px; background: rgba(255,255,255,.7); transition: border-color .2s, box-shadow .2s, background .2s; }
  .pv-auth__input:focus-within { border-color: #7899b2; background: #fff; box-shadow: 0 0 0 4px rgba(105,146,174,.13); }
  .pv-auth__input > svg { width: 17px; height: 17px; flex: none; color: #7890a2; }
  .pv-auth__input input { width: 100%; min-width: 0; padding: 13px 0; border: 0; outline: 0; background: transparent; color: #1a2c3b; font: inherit; font-size: 13px; }
  .pv-auth__input input::placeholder { color: #92a0aa; }
  .pv-auth__toggle { flex: none; padding: 7px 0 7px 8px; border: 0; background: none; color: #58748c; font: inherit; font-size: 10px; cursor: pointer; }
  .pv-auth__alert { display: flex; align-items: flex-start; gap: 9px; padding: 11px 12px; border: 1px solid rgba(174,84,75,.2); border-radius: 10px; background: rgba(255,245,243,.9); color: #713a36; font-size: 11px; line-height: 1.5; }
  .pv-auth__alert--blocked { border-color: rgba(174,130,63,.28); background: rgba(255,249,235,.95); color: #634e2d; }
  .pv-auth__alert p { margin: 0; } .pv-auth__alert strong { display: block; margin-bottom: 3px; }
  .pv-auth__alert-icon { flex: none; width: 19px; height: 19px; display: grid; place-items: center; border: 1px solid currentColor; border-radius: 50%; font-size: 11px; font-weight: 700; }
  .pv-auth__submit { min-height: 49px; display: flex; align-items: center; justify-content: center; gap: 9px; margin-top: 2px; border: 1px solid rgba(255,255,255,.2); border-radius: 11px; background: linear-gradient(110deg, #263f56, #3a5d78 55%, #2b4962); color: #fff; box-shadow: 0 8px 20px rgba(34,62,82,.19), inset 0 1px 0 rgba(255,255,255,.18); font: inherit; font-size: 12px; font-weight: 650; cursor: pointer; transition: transform .2s, box-shadow .2s; }
  .pv-auth__submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(34,62,82,.26); }
  .pv-auth__submit:disabled { opacity: .72; cursor: wait; }
  .pv-auth__submit svg { width: 16px; height: 16px; transition: transform .2s; }
  .pv-auth__submit:hover svg { transform: translateX(3px); }
  .pv-auth__divider { display: flex; align-items: center; gap: 10px; margin: 21px 0 13px; color: #748595; font-size: 10px; }
  .pv-auth__divider::before, .pv-auth__divider::after { content: ''; flex: 1; height: 1px; background: rgba(64,88,105,.17); }
  .pv-auth__register { display: block; padding: 12px; border: 1px solid rgba(69,97,119,.2); border-radius: 10px; background: rgba(255,255,255,.4); color: #28465c; text-align: center; text-decoration: none; font-size: 12px; font-weight: 650; transition: background .2s; }
  .pv-auth__register:hover { background: rgba(255,255,255,.84); }
  .pv-auth__back { display: flex; align-items: center; justify-content: center; gap: 7px; margin-top: 17px; color: #657988; text-decoration: none; font-size: 10px; }
  .pv-auth__back:hover { color: #243f53; } .pv-auth__back svg { width: 14px; height: 14px; }
  @keyframes pv-auth-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pv-auth-drift { from { transform: scale(1.025) translate3d(0,0,0); } to { transform: scale(1.07) translate3d(-.4%,.3%,0); } }
  @media (max-width: 900px) { .pv-auth { padding: 88px 28px 32px; } .pv-auth__layout { grid-template-columns: minmax(0, 1fr) minmax(330px, 390px); gap: 34px; } .pv-auth__intro h1 { font-size: clamp(38px, 5.6vw, 54px); } }
  @media (max-width: 700px) { .pv-auth { display: block; padding: 88px 19px 26px; } .pv-auth__top { top: 18px; left: 19px; } .pv-auth__layout { width: min(490px, 100%); margin: 0 auto; display: flex; flex-direction: column; align-items: stretch; gap: 22px; } .pv-auth__intro { padding: 7px 0 0; } .pv-auth__eyebrow { margin-bottom: 14px; } .pv-auth__intro h1 { max-width: 470px; font-size: clamp(38px, 9vw, 53px); } .pv-auth__copy { margin: 14px 0 17px; font-size: 13px; line-height: 1.6; } .pv-auth__benefits { gap: 7px; } .pv-auth__benefit { padding: 8px 10px; font-size: 9px; } .pv-auth__panel { width: 100%; padding: 26px 24px; border-radius: 20px; } .pv-auth__note { margin-bottom: 20px; } }
  @media (max-width: 390px) { .pv-auth { padding: 79px 14px 20px; } .pv-auth__top { left: 14px; top: 14px; } .pv-auth__intro h1 { font-size: 37px; } .pv-auth__panel { padding: 22px 18px; } .pv-auth__label-row { align-items: flex-start; } .pv-auth__forgot { max-width: 124px; text-align: right; } }
  @media (prefers-reduced-motion: reduce) { .pv-auth *, .pv-auth *::before, .pv-auth *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
`;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const clearFeedback = () => {
    setIsBlocked(false);
    setMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsBlocked(false);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 && data.message === "Tu cuenta ha sido bloqueada") {
          setIsBlocked(true);
          return;
        }
        setMessage(data.message || "No se pudo iniciar sesión");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pv-auth" style={{ "--pv-auth-image": `url(${loginBackdrop})` } as CSSProperties & { "--pv-auth-image": string }}>
      <style>{styles}</style>
      <div className="pv-auth__photo" aria-hidden="true" />
      <div className="pv-auth__shade" aria-hidden="true" />
      <Link to="/" className="pv-auth__top" aria-label="Portavia, volver al inicio">
        <span className="pv-auth__mark" aria-hidden="true">p</span>
        <span className="pv-auth__brand">Portavia</span>
      </Link>

      <div className="pv-auth__layout">
        <section className="pv-auth__intro" aria-label="Tu espacio profesional">
          <p className="pv-auth__eyebrow">Un espacio para tu trayectoria</p>
          <h1>Lo que haces merece <span>ser visto.</span></h1>
          <p className="pv-auth__copy">Reúne tu perfil, proyectos y formas de contacto en una presencia profesional que hable por ti, incluso antes de la primera conversación.</p>
          <div className="pv-auth__benefits">
            <span className="pv-auth__benefit"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Tu perfil en un solo lugar</span>
            <span className="pv-auth__benefit"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Proyectos que hablan por ti</span>
          </div>
        </section>

        <section className="pv-auth__panel" aria-labelledby="login-title">
          <div className="pv-auth__panel-content">
            <p className="pv-auth__kicker">TU ESPACIO TE ESPERA</p>
            <h2 id="login-title">Iniciar sesión</h2>
            <p className="pv-auth__note">Accede para continuar construyendo tu presencia profesional.</p>
            <form onSubmit={handleSubmit} className="pv-auth__form">
              <div className="pv-auth__field">
                <label htmlFor="email">Correo electrónico</label>
                <div className="pv-auth__input">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
                  <input id="email" type="email" autoComplete="email" placeholder="tu@correo.com" value={email} onChange={(event) => { setEmail(event.target.value); clearFeedback(); }} required />
                </div>
              </div>
              <div className="pv-auth__field">
                <div className="pv-auth__label-row">
                  <label htmlFor="password">Contraseña</label>
                  <button type="button" className="pv-auth__forgot" onClick={() => setMessage("La recuperación de contraseña estará disponible próximamente.")}>¿Olvidaste tu contraseña?</button>
                </div>
                <div className="pv-auth__input">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.7" /></svg>
                  <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Tu contraseña" value={password} onChange={(event) => { setPassword(event.target.value); clearFeedback(); }} required />
                  <button type="button" className="pv-auth__toggle" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>{showPassword ? "Ocultar" : "Ver"}</button>
                </div>
              </div>
              {isBlocked && <div className="pv-auth__alert pv-auth__alert--blocked" role="alert"><span className="pv-auth__alert-icon">!</span><div><strong>Acceso restringido</strong><p>Tu cuenta se encuentra temporalmente bloqueada. Un administrador debe reactivarla para que puedas ingresar.</p></div></div>}
              {!isBlocked && message && <div className="pv-auth__alert" role="alert"><span className="pv-auth__alert-icon">i</span><p>{message}</p></div>}
              <button type="submit" className="pv-auth__submit" disabled={isLoading}>
                <span>{isLoading ? "Verificando..." : "Iniciar sesión"}</span>
                {!isLoading && <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </button>
            </form>
            <div className="pv-auth__divider">¿Primera vez en Portavia?</div>
            <Link to="/register" className="pv-auth__register">Crear una cuenta</Link>
            <Link to="/" className="pv-auth__back"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m6 6-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Volver al inicio</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
