import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "../App.css";

function Share() {
  const navigate = useNavigate();

  const qrRef =
    useRef<HTMLDivElement>(null);

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

  if (!token || !user) {
    return null;
  }

  const portfolioUrl =
    `${window.location.origin}/u/${user.username}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        portfolioUrl
      );

      setMessage(
        "Enlace copiado correctamente"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "No se pudo copiar el enlace"
      );
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Portafolio de ${user.name}`,
          text: `Visita el portafolio profesional de ${user.name}`,
          url: portfolioUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(
        portfolioUrl
      );

      setMessage(
        "Tu navegador no permite compartir directamente. El enlace fue copiado."
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadQR = () => {
    const canvas =
      qrRef.current?.querySelector(
        "canvas"
      );

    if (!canvas) {
      return;
    }

    const image =
      canvas.toDataURL("image/png");

    const link =
      document.createElement("a");

    link.href = image;

    link.download =
      `portafolio-${user.username}-qr.png`;

    link.click();
  };

  return (
    <div className="share-page">
      <header className="share-header">
        <div>
          <p className="share-label">
            Compartir
          </p>

          <h1>
            Comparte tu portafolio
          </h1>

          <span>
            Comparte tu perfil profesional
            mediante un enlace o código QR.
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

      <section className="share-content">
        <article className="share-card">
          <div className="share-card-header">
            <h2>
              Enlace público
            </h2>

            <p>
              Este enlace lleva directamente
              a tu portafolio profesional.
            </p>
          </div>

          <div className="share-url">
            <span>
              {portfolioUrl}
            </span>
          </div>

          <div className="share-buttons">
            <button
              className="primary-button"
              onClick={handleCopy}
            >
              Copiar enlace
            </button>

            <button
              className="secondary-button"
              onClick={handleShare}
            >
              Compartir
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                navigate(
                  `/u/${user.username}`
                )
              }
            >
              Ver portafolio
            </button>
          </div>

          {message && (
            <p className="share-message">
              {message}
            </p>
          )}
        </article>

        <article className="share-card share-qr-card">
          <div className="share-card-header">
            <h2>
              Código QR
            </h2>

            <p>
              Escanea este código para abrir
              tu portafolio.
            </p>
          </div>

          <div
            className="share-qr"
            ref={qrRef}
          >
            <QRCodeCanvas
              value={portfolioUrl}
              size={220}
              level="H"
              marginSize={2}
            />
          </div>

          <button
            className="primary-button"
            onClick={handleDownloadQR}
          >
            Descargar QR
          </button>
        </article>
      </section>
    </div>
  );
}

export default Share;