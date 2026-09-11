import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Settings() {
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [savingAccount, setSavingAccount] =
    useState(false);

  const [savingPassword, setSavingPassword] =
    useState(false);

  const [accountMessage, setAccountMessage] =
    useState("");

  const [passwordMessage, setPasswordMessage] =
    useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadSettings = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/settings",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        const data =
          await response.json();

        if (!response.ok) {
          setAccountMessage(
            data.message ||
              "No se pudo cargar la cuenta"
          );
          return;
        }

        setName(data.user.name);
        setEmail(data.user.email);
        setUsername(data.user.username);
      } catch (error) {
        console.error(error);

        setAccountMessage(
          "No se pudo conectar con el servidor"
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [token, navigate]);

  const handleAccountSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!token) {
      return;
    }

    setSavingAccount(true);
    setAccountMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/settings/account",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            email,
            username,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setAccountMessage(
          data.message ||
            "No se pudo actualizar la cuenta"
        );
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setAccountMessage(
        "Cuenta actualizada correctamente"
      );
    } catch (error) {
      console.error(error);

      setAccountMessage(
        "No se pudo conectar con el servidor"
      );
    } finally {
      setSavingAccount(false);
    }
  };

  const handlePasswordSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!token) {
      return;
    }

    setPasswordMessage("");

    if (
      newPassword !== confirmPassword
    ) {
      setPasswordMessage(
        "Las nuevas contraseñas no coinciden"
      );
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage(
        "La nueva contraseña debe tener al menos 8 caracteres"
      );
      return;
    }

    setSavingPassword(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/settings/password",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setPasswordMessage(
          data.message ||
            "No se pudo cambiar la contraseña"
        );
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setPasswordMessage(
        "Contraseña actualizada correctamente"
      );
    } catch (error) {
      console.error(error);

      setPasswordMessage(
        "No se pudo conectar con el servidor"
      );
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="settings-status">
          Cargando configuración...
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <header className="settings-header">
        <div>
          <p className="settings-label">
            Cuenta
          </p>

          <h1>
            Configuración
          </h1>

          <span>
            Administra los datos y la
            seguridad de tu cuenta.
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

      <section className="settings-section">
        <div className="settings-section-header">
          <h2>
            Información de la cuenta
          </h2>

          <p>
            Actualiza tus datos principales.
          </p>
        </div>

        <form
          className="settings-form"
          onSubmit={handleAccountSubmit}
        >
          <label>
            Nombre completo

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />
          </label>

          <label>
            Correo electrónico

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </label>

          <label>
            Nombre de usuario

            <input
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              required
            />
          </label>

          <button
            className="primary-button"
            type="submit"
            disabled={savingAccount}
          >
            {savingAccount
              ? "Guardando..."
              : "Guardar cambios"}
          </button>

          {accountMessage && (
            <p className="settings-message">
              {accountMessage}
            </p>
          )}
        </form>
      </section>

      <section className="settings-section">
        <div className="settings-section-header">
          <h2>
            Cambiar contraseña
          </h2>

          <p>
            Utiliza tu contraseña actual para
            establecer una nueva.
          </p>
        </div>

        <form
          className="settings-form"
          onSubmit={handlePasswordSubmit}
        >
          <label>
            Contraseña actual

            <input
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(
                  event.target.value
                )
              }
              required
            />
          </label>

          <label>
            Nueva contraseña

            <input
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(
                  event.target.value
                )
              }
              minLength={8}
              required
            />
          </label>

          <label>
            Confirmar nueva contraseña

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              minLength={8}
              required
            />
          </label>

          <button
            className="primary-button"
            type="submit"
            disabled={savingPassword}
          >
            {savingPassword
              ? "Actualizando..."
              : "Cambiar contraseña"}
          </button>

          {passwordMessage && (
            <p className="settings-message">
              {passwordMessage}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}

export default Settings;