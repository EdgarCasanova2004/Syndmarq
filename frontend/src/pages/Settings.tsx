import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "https://portavia-api.onrender.com";

const settingsStyles = `
  .pv-settings {
    --ink: #17243a;
    --muted: #718096;
    --blue: #5479a8;
    --line: #e3eaf1;
    min-height: 100vh;
    padding: 36px clamp(16px, 5vw, 70px) 60px;
    color: var(--ink);
    background:
      radial-gradient(ellipse at 8% 0%, rgba(205,224,242,.46), transparent 33%),
      radial-gradient(ellipse at 95% 35%, rgba(226,234,242,.7), transparent 28%),
      #f5f8fb;
  }

  .pv-settings *,
  .pv-settings *::before,
  .pv-settings *::after {
    box-sizing: border-box;
  }

  .pv-settings-shell {
    width: min(1120px, 100%);
    margin: 0 auto;
  }

  .pv-settings-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 20px;
    margin-bottom: 23px;
    animation: pv-settings-enter .5s both;
  }

  @keyframes pv-settings-enter {
    from { opacity: 0; transform: translateY(9px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pv-settings-label {
    margin: 0 0 9px;
    color: #7188a2;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .16em;
    text-transform: uppercase;
  }

  .pv-settings-header h1 {
    margin: 0;
    font-size: clamp(30px, 4vw, 42px);
    letter-spacing: -.045em;
    line-height: 1.08;
  }

  .pv-settings-description {
    max-width: 560px;
    margin: 10px 0 0;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.65;
  }

  .pv-settings-button {
    display: inline-flex;
    min-height: 43px;
    align-items: center;
    justify-content: center;
    border: 1px solid #dfe7ef;
    border-radius: 12px;
    padding: 0 16px;
    color: #526b87;
    background: rgba(255,255,255,.88);
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
  }

  .pv-settings-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(41,65,91,.09);
  }

  .pv-settings-button:disabled {
    cursor: wait;
    opacity: .62;
  }

  .pv-settings-button-primary {
    border-color: transparent;
    color: white;
    background: linear-gradient(135deg, #6487b3, #436994);
    box-shadow: 0 8px 19px rgba(63,99,143,.16);
  }

  .pv-settings-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 17px;
    border: 1px solid rgba(223,231,239,.95);
    border-radius: 17px;
    padding: 17px 20px;
    background: rgba(255,255,255,.78);
    box-shadow: 0 12px 30px rgba(36,57,79,.04);
    animation: pv-settings-enter .55s .05s both;
  }

  .pv-settings-banner-copy {
    display: flex;
    align-items: center;
    gap: 13px;
  }

  .pv-settings-banner-mark {
    display: grid;
    width: 42px;
    height: 42px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid #dfe9f2;
    border-radius: 13px;
    color: #5f82a8;
    background: linear-gradient(145deg, #f8fbfd, #e8f0f7);
    font-size: 17px;
    font-weight: 750;
  }

  .pv-settings-banner h2 {
    margin: 0;
    font-size: 13px;
  }

  .pv-settings-banner p {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.45;
  }

  .pv-settings-secure {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    flex: 0 0 auto;
    color: #63836f;
    font-size: 10px;
    font-weight: 750;
  }

  .pv-settings-secure::before {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #78ac8c;
    box-shadow: 0 0 0 4px rgba(120,172,140,.12);
    content: "";
  }

  .pv-settings-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr);
    align-items: start;
    gap: 16px;
  }

  .pv-settings-card {
    border: 1px solid rgba(223,231,239,.95);
    border-radius: 18px;
    padding: clamp(19px, 3vw, 25px);
    background: rgba(255,255,255,.89);
    box-shadow: 0 15px 42px rgba(36,57,79,.055);
    animation: pv-settings-enter .55s .1s both;
  }

  .pv-settings-card:nth-child(2) {
    animation-delay: .17s;
  }

  .pv-settings-card-heading {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 21px;
  }

  .pv-settings-card-icon {
    display: grid;
    width: 38px;
    height: 38px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid #e2eaf1;
    border-radius: 12px;
    color: #5f82a8;
    background: #f4f8fb;
    font-size: 14px;
    font-weight: 750;
  }

  .pv-settings-card-heading h2 {
    margin: 1px 0 0;
    font-size: 17px;
    letter-spacing: -.025em;
  }

  .pv-settings-card-heading p {
    margin: 6px 0 0;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.55;
  }

  .pv-settings-form {
    display: grid;
    gap: 14px;
  }

  .pv-settings-field {
    display: grid;
    gap: 7px;
  }

  .pv-settings-field > label {
    color: #43546a;
    font-size: 11px;
    font-weight: 700;
  }

  .pv-settings-field input {
    width: 100%;
    min-height: 43px;
    border: 1px solid #e1e8ef;
    border-radius: 11px;
    outline: none;
    padding: 10px 12px;
    color: var(--ink);
    background: rgba(255,255,255,.9);
    font: inherit;
    font-size: 12px;
    transition: border-color .2s ease, box-shadow .2s ease;
  }

  .pv-settings-field input:focus {
    border-color: #91abc8;
    box-shadow: 0 0 0 4px rgba(112,147,184,.12);
  }

  .pv-settings-password-wrap {
    position: relative;
  }

  .pv-settings-password-wrap input {
    padding-right: 66px;
  }

  .pv-settings-password-toggle {
    position: absolute;
    top: 50%;
    right: 9px;
    transform: translateY(-50%);
    border: 0;
    border-radius: 7px;
    padding: 6px 7px;
    color: #6482a2;
    background: #f2f6fa;
    font: inherit;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
  }

  .pv-settings-password-toggle:hover {
    background: #e8eff6;
  }

  .pv-settings-help {
    margin: -4px 0 0;
    color: #8795a5;
    font-size: 10px;
    line-height: 1.5;
  }

  .pv-settings-submit {
    width: 100%;
    margin-top: 4px;
  }

  .pv-settings-message {
    margin: 2px 0 0;
    border: 1px solid #d9e9e0;
    border-radius: 10px;
    padding: 10px 12px;
    color: #47745e;
    background: #f2f8f4;
    font-size: 11px;
    line-height: 1.5;
    animation: pv-settings-message-in .25s ease both;
  }

  .pv-settings-message-error {
    border-color: #f0dddd;
    color: #9a5656;
    background: #fff5f4;
  }

  @keyframes pv-settings-message-in {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pv-settings-loading {
    display: grid;
    min-height: 55vh;
    place-items: center;
    color: var(--muted);
    font-size: 13px;
  }

  @media (max-width: 800px) {
    .pv-settings-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 580px) {
    .pv-settings {
      padding: 24px 14px 42px;
    }

    .pv-settings-header {
      align-items: stretch;
      flex-direction: column;
    }

    .pv-settings-header .pv-settings-button {
      width: 100%;
    }

    .pv-settings-banner {
      align-items: flex-start;
      flex-direction: column;
      padding: 15px;
    }

    .pv-settings-card {
      padding: 18px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pv-settings *,
    .pv-settings *::before,
    .pv-settings *::after {
      animation-duration: .01ms !important;
      transition-duration: .01ms !important;
    }
  }
`;

function Settings() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(true);
  const [savingAccount, setSavingAccount] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [accountMessage, setAccountMessage] = useState("");
  const [accountMessageError, setAccountMessageError] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordMessageError, setPasswordMessageError] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadSettings = async () => {
      try {
        const response = await fetch(`${API_URL}/api/settings`, {
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
          setAccountMessage(
            data.message || "No se pudo cargar la información de la cuenta.",
          );
          setAccountMessageError(true);
          return;
        }

        setName(data.user?.name ?? "");
        setEmail(data.user?.email ?? "");
        setUsername(data.user?.username ?? "");
      } catch (error) {
        console.error(error);
        setAccountMessage("No se pudo conectar con el servidor.");
        setAccountMessageError(true);
      } finally {
        setLoading(false);
      }
    };

    void loadSettings();
  }, [token, navigate]);

  const handleAccountSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) return;

    setSavingAccount(true);
    setAccountMessage("");
    setAccountMessageError(false);

    try {
      const response = await fetch(`${API_URL}/api/settings/account`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          username: username.trim(),
        }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        setAccountMessage(
          data.message || "No se pudo actualizar la cuenta.",
        );
        setAccountMessageError(true);
        return;
      }

      const previousUser = JSON.parse(
        localStorage.getItem("user") || "{}",
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...previousUser,
          ...data.user,
        }),
      );

      setName(data.user?.name ?? name.trim());
      setEmail(data.user?.email ?? email.trim());
      setUsername(data.user?.username ?? username.trim());
      setAccountMessage("Información de la cuenta actualizada.");
    } catch (error) {
      console.error(error);
      setAccountMessage("No se pudo conectar con el servidor.");
      setAccountMessageError(true);
    } finally {
      setSavingAccount(false);
    }
  };

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) return;

    setPasswordMessage("");
    setPasswordMessageError(false);

    if (newPassword !== confirmPassword) {
      setPasswordMessage("Las nuevas contraseñas no coinciden.");
      setPasswordMessageError(true);
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage("La nueva contraseña debe tener al menos 8 caracteres.");
      setPasswordMessageError(true);
      return;
    }

    setSavingPassword(true);

    try {
      const response = await fetch(`${API_URL}/api/settings/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        setPasswordMessage(
          data.message || "No se pudo cambiar la contraseña.",
        );
        setPasswordMessageError(true);
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Contraseña actualizada correctamente.");
    } catch (error) {
      console.error(error);
      setPasswordMessage("No se pudo conectar con el servidor.");
      setPasswordMessageError(true);
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <main className="pv-settings">
        <style>{settingsStyles}</style>
        <div className="pv-settings-loading">Cargando configuración...</div>
      </main>
    );
  }

  return (
    <main className="pv-settings">
      <style>{settingsStyles}</style>

      <div className="pv-settings-shell">
        <header className="pv-settings-header">
          <div>
            <p className="pv-settings-label">Portavia · Cuenta</p>
            <h1>Configuración</h1>
            <p className="pv-settings-description">
              Administra tu información personal y mantén segura tu cuenta.
            </p>
          </div>

          <button
            className="pv-settings-button"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Volver al dashboard
          </button>
        </header>

        <section className="pv-settings-banner">
          <div className="pv-settings-banner-copy">
            <span className="pv-settings-banner-mark" aria-hidden="true">
              P
            </span>
            <div>
              <h2>Tu cuenta de Portavia</h2>
              <p>Mantén tus datos actualizados para cuidar tu presencia profesional.</p>
            </div>
          </div>
          <span className="pv-settings-secure">Configuración privada</span>
        </section>

        <div className="pv-settings-grid">
          <section className="pv-settings-card">
            <div className="pv-settings-card-heading">
              <span className="pv-settings-card-icon" aria-hidden="true">
                01
              </span>
              <div>
                <h2>Información de la cuenta</h2>
                <p>Actualiza los datos asociados con tu perfil.</p>
              </div>
            </div>

            <form className="pv-settings-form" onSubmit={handleAccountSubmit}>
              <div className="pv-settings-field">
                <label htmlFor="settingsName">Nombre completo</label>
                <input
                  id="settingsName"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="pv-settings-field">
                <label htmlFor="settingsEmail">Correo electrónico</label>
                <input
                  id="settingsEmail"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="pv-settings-field">
                <label htmlFor="settingsUsername">Nombre de usuario</label>
                <input
                  id="settingsUsername"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
                <p className="pv-settings-help">
                  Tu nombre de usuario forma parte del enlace público de tu portafolio.
                </p>
              </div>

              <button
                className="pv-settings-button pv-settings-button-primary pv-settings-submit"
                type="submit"
                disabled={savingAccount}
              >
                {savingAccount ? "Guardando..." : "Guardar información"}
              </button>

              {accountMessage && (
                <p
                  className={`pv-settings-message ${
                    accountMessageError ? "pv-settings-message-error" : ""
                  }`}
                  role="status"
                >
                  {accountMessage}
                </p>
              )}
            </form>
          </section>

          <section className="pv-settings-card">
            <div className="pv-settings-card-heading">
              <span className="pv-settings-card-icon" aria-hidden="true">
                02
              </span>
              <div>
                <h2>Seguridad</h2>
                <p>Cambia tu contraseña para proteger el acceso.</p>
              </div>
            </div>

            <form className="pv-settings-form" onSubmit={handlePasswordSubmit}>
              <div className="pv-settings-field">
                <label htmlFor="currentPassword">Contraseña actual</label>
                <div className="pv-settings-password-wrap">
                  <input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    required
                  />
                  <button
                    className="pv-settings-password-toggle"
                    type="button"
                    onClick={() => setShowCurrentPassword((value) => !value)}
                  >
                    {showCurrentPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <div className="pv-settings-field">
                <label htmlFor="newPassword">Nueva contraseña</label>
                <div className="pv-settings-password-wrap">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    minLength={8}
                    required
                  />
                  <button
                    className="pv-settings-password-toggle"
                    type="button"
                    onClick={() => setShowNewPassword((value) => !value)}
                  >
                    {showNewPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <p className="pv-settings-help">Usa al menos 8 caracteres.</p>
              </div>

              <div className="pv-settings-field">
                <label htmlFor="confirmPassword">
                  Confirmar nueva contraseña
                </label>
                <div className="pv-settings-password-wrap">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    minLength={8}
                    required
                  />
                  <button
                    className="pv-settings-password-toggle"
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                  >
                    {showConfirmPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <button
                className="pv-settings-button pv-settings-button-primary pv-settings-submit"
                type="submit"
                disabled={savingPassword}
              >
                {savingPassword ? "Actualizando..." : "Actualizar contraseña"}
              </button>

              {passwordMessage && (
                <p
                  className={`pv-settings-message ${
                    passwordMessageError ? "pv-settings-message-error" : ""
                  }`}
                  role="status"
                >
                  {passwordMessage}
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Settings;