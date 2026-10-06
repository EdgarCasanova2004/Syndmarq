import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "../App.css";

interface ShareUser {
  name: string;
  username: string;
}

const shareStyles = `
  .pv-share {
    --ink: #17243a;
    --muted: #718096;
    --blue: #5479a8;
    --blue-dark: #365779;
    --line: #e3eaf1;
    min-height: 100vh;
    padding: 36px clamp(16px, 5vw, 70px) 60px;
    color: var(--ink);
    background:
      radial-gradient(ellipse at 8% 0%, rgba(205,224,242,.48), transparent 34%),
      radial-gradient(ellipse at 95% 40%, rgba(226,234,242,.72), transparent 30%),
      #f5f8fb;
  }

  .pv-share *,
  .pv-share *::before,
  .pv-share *::after {
    box-sizing: border-box;
  }

  .pv-share-shell {
    width: min(1080px, 100%);
    margin: 0 auto;
  }

  .pv-share-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 20px;
    margin-bottom: 25px;
    animation: pv-share-enter .55s both;
  }

  @keyframes pv-share-enter {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pv-share-kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 10px;
    color: #7188a2;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .16em;
    text-transform: uppercase;
  }

  .pv-share-kicker::before {
    width: 19px;
    height: 1px;
    background: #91a9c3;
    content: "";
  }

  .pv-share-header h1 {
    margin: 0;
    font-size: clamp(30px, 4vw, 43px);
    letter-spacing: -.045em;
    line-height: 1.08;
  }

  .pv-share-intro {
    max-width: 560px;
    margin: 11px 0 0;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.65;
  }

  .pv-share-button {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border: 1px solid #dfe7ef;
    border-radius: 12px;
    padding: 0 16px;
    color: #526b87;
    background: rgba(255,255,255,.88);
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
  }

  .pv-share-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 9px 22px rgba(41,65,91,.09);
  }

  .pv-share-button-primary {
    border-color: transparent;
    color: white;
    background: linear-gradient(135deg, #6487b3, #436994);
    box-shadow: 0 8px 19px rgba(63,99,143,.17);
  }

  .pv-share-button-primary:hover {
    background: linear-gradient(135deg, #587ca8, #385f8b);
  }

  .pv-share-intro-card {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    overflow: hidden;
    min-height: 145px;
    margin-bottom: 17px;
    border: 1px solid rgba(223,231,239,.95);
    border-radius: 20px;
    padding: 25px clamp(20px, 4vw, 34px);
    background: rgba(255,255,255,.81);
    box-shadow: 0 14px 38px rgba(36,57,79,.05);
    backdrop-filter: blur(14px);
    animation: pv-share-enter .6s .06s both;
  }

  .pv-share-intro-card::after {
    position: absolute;
    top: -72px;
    right: 13%;
    width: 190px;
    height: 190px;
    border: 1px solid rgba(132,163,194,.2);
    border-radius: 50%;
    box-shadow:
      0 0 0 18px rgba(132,163,194,.04),
      0 0 0 38px rgba(132,163,194,.035);
    content: "";
    animation: pv-orbit 12s linear infinite;
  }

  @keyframes pv-orbit {
    to { transform: rotate(360deg); }
  }

  .pv-share-message-block {
    position: relative;
    z-index: 1;
  }

  .pv-share-message-block p {
    margin: 0 0 6px;
    color: #7890aa;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  .pv-share-message-block h2 {
    margin: 0;
    font-size: clamp(20px, 3vw, 27px);
    letter-spacing: -.035em;
  }

  .pv-share-message-block span {
    display: block;
    margin-top: 7px;
    color: var(--muted);
    font-size: 12px;
  }

  .pv-share-monogram {
    position: relative;
    z-index: 1;
    display: grid;
    width: 66px;
    height: 66px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid #dce7f0;
    border-radius: 20px;
    color: #55799e;
    background: linear-gradient(145deg, #f6fafe, #e6eef6);
    box-shadow: 0 12px 25px rgba(75,109,145,.12);
    font-size: 25px;
    font-weight: 750;
    animation: pv-monogram-float 4s ease-in-out infinite;
  }

  @keyframes pv-monogram-float {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-5px) rotate(2deg); }
  }

  .pv-share-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(290px, .75fr);
    align-items: stretch;
    gap: 17px;
  }

  .pv-share-card {
    border: 1px solid rgba(223,231,239,.95);
    border-radius: 19px;
    background: rgba(255,255,255,.88);
    box-shadow: 0 15px 42px rgba(36,57,79,.055);
    backdrop-filter: blur(14px);
    animation: pv-share-enter .55s .12s both;
  }

  .pv-share-link-card {
    display: flex;
    flex-direction: column;
    padding: clamp(20px, 3vw, 27px);
  }

  .pv-share-card-heading {
    margin-bottom: 20px;
  }

  .pv-share-card-heading h2 {
    margin: 0;
    font-size: 18px;
    letter-spacing: -.025em;
  }

  .pv-share-card-heading p {
    margin: 7px 0 0;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.6;
  }

  .pv-share-url-box {
    display: flex;
    align-items: center;
    gap: 11px;
    min-width: 0;
    border: 1px solid #e2eaf1;
    border-radius: 12px;
    padding: 13px;
    background: #f7fafc;
  }

  .pv-share-url-symbol {
    display: grid;
    width: 34px;
    height: 34px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid #e0e9f1;
    border-radius: 10px;
    color: #6485a8;
    background: #fff;
    font-size: 14px;
    font-weight: 700;
  }

  .pv-share-url-text {
    overflow: hidden;
    color: #536d89;
    font-size: 12px;
    font-weight: 650;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pv-share-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 15px;
  }

  .pv-share-feedback {
    margin: 15px 0 0;
    border: 1px solid #d9e9e0;
    border-radius: 10px;
    padding: 10px 12px;
    color: #47745e;
    background: #f2f8f4;
    font-size: 11px;
    line-height: 1.5;
    animation: pv-feedback-in .25s ease both;
  }

  @keyframes pv-feedback-in {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pv-share-qr-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 22px;
    text-align: center;
    animation-delay: .2s;
  }

  .pv-share-qr-card .pv-share-card-heading {
    align-self: stretch;
    text-align: left;
  }

  .pv-share-qr-frame {
    display: grid;
    width: 100%;
    min-height: 246px;
    place-items: center;
    border: 1px solid #e4ebf1;
    border-radius: 15px;
    padding: 14px;
    background:
      linear-gradient(45deg, #f8fafc 25%, transparent 25%),
      linear-gradient(-45deg, #f8fafc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #f8fafc 75%),
      linear-gradient(-45deg, transparent 75%, #f8fafc 75%),
      white;
    background-position: 0 0, 0 7px, 7px -7px, -7px 0;
    background-size: 14px 14px;
  }

  .pv-share-qr-frame canvas {
    display: block;
    width: min(220px, 100%);
    height: auto;
    border: 9px solid white;
    background: white;
    box-shadow: 0 10px 28px rgba(39,64,91,.1);
    animation: pv-qr-appear .55s .3s both;
  }

  @keyframes pv-qr-appear {
    from { opacity: 0; transform: scale(.92); }
    to { opacity: 1; transform: scale(1); }
  }

  .pv-share-qr-card > .pv-share-button {
    width: 100%;
    margin-top: 13px;
  }

  .pv-share-qr-hint {
    margin: 11px 0 0;
    color: #8a97a6;
    font-size: 10px;
    line-height: 1.5;
  }

  @media (max-width: 760px) {
    .pv-share-grid {
      grid-template-columns: 1fr;
    }

    .pv-share-qr-card {
      display: grid;
      grid-template-columns: 1fr minmax(150px, 220px);
      align-items: center;
      gap: 14px;
      text-align: left;
    }

    .pv-share-qr-card .pv-share-card-heading {
      grid-column: 1;
      margin: 0;
    }

    .pv-share-qr-frame {
      grid-column: 2;
      grid-row: 1 / span 3;
      min-height: 190px;
    }

    .pv-share-qr-frame canvas {
      width: min(170px, 100%);
    }

    .pv-share-qr-card > .pv-share-button {
      grid-column: 1;
      margin-top: 0;
    }

    .pv-share-qr-hint {
      grid-column: 1;
      margin: 0;
    }
  }

  @media (max-width: 560px) {
    .pv-share {
      padding: 24px 14px 42px;
    }

    .pv-share-header {
      align-items: stretch;
      flex-direction: column;
    }

    .pv-share-header .pv-share-button {
      width: 100%;
    }

    .pv-share-intro-card {
      min-height: 125px;
      padding: 19px;
    }

    .pv-share-monogram {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      font-size: 20px;
    }

    .pv-share-link-card,
    .pv-share-qr-card {
      padding: 18px;
    }

    .pv-share-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .pv-share-actions .pv-share-button {
      width: 100%;
    }
  }

  @media (max-width: 390px) {
    .pv-share-qr-card {
      display: flex;
      align-items: stretch;
    }

    .pv-share-qr-card .pv-share-card-heading {
      margin-bottom: 14px;
    }

    .pv-share-qr-frame {
      min-height: 215px;
    }

    .pv-share-qr-frame canvas {
      width: min(190px, 100%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pv-share *,
    .pv-share *::before,
    .pv-share *::after {
      animation-duration: .01ms !important;
      transition-duration: .01ms !important;
    }
  }
`;

function Share() {
  const navigate = useNavigate();
  const qrRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState("");
  const [user, setUser] = useState<ShareUser | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");

      if (!token || !userData) {
        navigate("/login");
        return;
      }

      const parsedUser = JSON.parse(userData) as ShareUser;

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
    }
  }, [token, navigate]);

  if (!token || !user) {
    return null;
  }

  const portfolioUrl =
    `${window.location.origin}/u/${user.username}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setMessage("Enlace copiado. Ya puedes compartirlo.");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo copiar el enlace. Inténtalo de nuevo.");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Portafolio de ${user.name || user.username}`,
          text: `Visita el portafolio profesional de ${user.name || user.username}`,
          url: portfolioUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(portfolioUrl);
      setMessage("Enlace copiado. Puedes pegarlo donde quieras compartirlo.");
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error(error);
        setMessage("No se pudo compartir el enlace.");
      }
    }
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) {
      setMessage("No se pudo preparar el código QR.");
      return;
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `portavia-${user.username}-qr.png`;
    link.click();
    setMessage("Código QR descargado.");
  };

  return (
    <main className="pv-share">
      <style>{shareStyles}</style>

      <div className="pv-share-shell">
        <header className="pv-share-header">
          <div>
            <p className="pv-share-kicker">Portavia · Compartir</p>
            <h1>Tu trabajo, listo para compartir</h1>
            <p className="pv-share-intro">
              Comparte tu portafolio con un enlace directo o deja que el código QR
              lleve a las personas hasta tu perfil.
            </p>
          </div>

          <button
            className="pv-share-button"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Volver al dashboard
          </button>
        </header>

        <section className="pv-share-intro-card">
          <div className="pv-share-message-block">
            <p>Tu espacio profesional</p>
            <h2>{user.name || user.username}</h2>
            <span>Un solo acceso para conocer lo que haces.</span>
          </div>

          <div className="pv-share-monogram" aria-hidden="true">
            {(user.name || user.username).charAt(0).toUpperCase()}
          </div>
        </section>

        <section className="pv-share-grid">
          <article className="pv-share-card pv-share-link-card">
            <div className="pv-share-card-heading">
              <h2>Enlace de tu portafolio</h2>
              <p>
                Copia esta dirección o compártela directamente desde tu dispositivo.
              </p>
            </div>

            <div className="pv-share-url-box">
              <span className="pv-share-url-symbol" aria-hidden="true">
                ↗
              </span>
              <span className="pv-share-url-text" title={portfolioUrl}>
                {portfolioUrl}
              </span>
            </div>

            <div className="pv-share-actions">
              <button
                className="pv-share-button pv-share-button-primary"
                type="button"
                onClick={handleCopy}
              >
                Copiar enlace
              </button>

              <button
                className="pv-share-button"
                type="button"
                onClick={handleShare}
              >
                Compartir
              </button>

              <button
                className="pv-share-button"
                type="button"
                onClick={() => navigate(`/u/${user.username}`)}
              >
                Ver portafolio
              </button>
            </div>

            {message && (
              <p className="pv-share-feedback" role="status">
                {message}
              </p>
            )}
          </article>

          <article className="pv-share-card pv-share-qr-card">
            <div className="pv-share-card-heading">
              <h2>Código QR</h2>
              <p>Escanéalo para abrir tu portafolio.</p>
            </div>

            <div className="pv-share-qr-frame" ref={qrRef}>
              <QRCodeCanvas
                value={portfolioUrl}
                size={220}
                level="H"
                marginSize={2}
                bgColor="#ffffff"
                fgColor="#17243a"
              />
            </div>

            <button
              className="pv-share-button pv-share-button-primary"
              type="button"
              onClick={handleDownloadQR}
            >
              Descargar código QR
            </button>

            <p className="pv-share-qr-hint">
              Guarda la imagen para añadirla a tu CV o compartirla impresa.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}

export default Share;