import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface LinkItem {
  id: number;
  title: string;
  url: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
}

function Links() {
  const navigate = useNavigate();

  const [links, setLinks] = useState<LinkItem[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const loadLinks = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/links",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      if (!response.ok) {
        setMessage(
          data.message ||
            "No se pudieron cargar los enlaces"
        );
        return;
      }

      setLinks(data.links);
    } catch (error) {
      console.error(error);

      setMessage(
        "No se pudo conectar con el servidor"
      );
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    loadLinks();
  }, []);

  const clearForm = () => {
    setTitle("");
    setUrl("");
    setIcon("");
    setIsActive(true);
    setEditingId(null);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      setMessage("El título es obligatorio");
      return;
    }

    if (!url.trim()) {
      setMessage("La URL es obligatoria");
      return;
    }

    try {
      setMessage(
        editingId
          ? "Actualizando enlace..."
          : "Creando enlace..."
      );

      const endpoint = editingId
        ? `http://localhost:3000/api/links/${editingId}`
        : "http://localhost:3000/api/links";

      const response = await fetch(endpoint, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          url,
          icon,
          isActive,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Ocurrió un error"
        );
        return;
      }

      setMessage(
        editingId
          ? "Enlace actualizado correctamente"
          : "Enlace creado correctamente"
      );

      clearForm();
      await loadLinks();
    } catch (error) {
      console.error(error);

      setMessage(
        "No se pudo conectar con el servidor"
      );
    }
  };

  const handleEdit = (link: LinkItem) => {
    setEditingId(link.id);
    setTitle(link.title);
    setUrl(link.url);
    setIcon(link.icon || "");
    setIsActive(link.is_active);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmation = window.confirm(
      "¿Seguro que deseas eliminar este enlace?"
    );

    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/links/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "No se pudo eliminar"
        );
        return;
      }

      setMessage(
        "Enlace eliminado correctamente"
      );

      await loadLinks();
    } catch (error) {
      console.error(error);

      setMessage(
        "No se pudo conectar con el servidor"
      );
    }
  };

  const handleMove = async (
    id: number,
    direction: "up" | "down"
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/links/${id}/order`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            direction,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "No se pudo cambiar el orden"
        );
        return;
      }

      setMessage(
        "Orden actualizado correctamente"
      );

      await loadLinks();
    } catch (error) {
      console.error(error);

      setMessage(
        "No se pudo conectar con el servidor"
      );
    }
  };

  return (
    <main className="links-page">
      <div className="links-header">
        <div>
          <p>Portafolio</p>

          <h1>
            Mis enlaces
          </h1>
        </div>

        <button
          className="secondary-button"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Volver al Dashboard
        </button>
      </div>

      <section className="link-form-card">
        <h2>
          {editingId
            ? "Editar enlace"
            : "Nuevo enlace"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            Título
          </label>

          <input
            id="title"
            type="text"
            placeholder="Ej. GitHub"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

          <label htmlFor="url">
            URL
          </label>

          <input
            id="url"
            type="url"
            placeholder="https://github.com/usuario"
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            required
          />

          <label htmlFor="icon">
            Icono
          </label>

          <input
            id="icon"
            type="text"
            placeholder="Ej. github"
            value={icon}
            onChange={(e) =>
              setIcon(e.target.value)
            }
          />

          <div className="link-options">
            <label>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) =>
                  setIsActive(
                    e.target.checked
                  )
                }
              />

              Enlace activo
            </label>
          </div>

          <div className="link-form-buttons">
            <button
              type="submit"
              className="primary-button"
            >
              {editingId
                ? "Guardar cambios"
                : "Crear enlace"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-button"
                onClick={clearForm}
              >
                Cancelar edición
              </button>
            )}
          </div>

          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}
        </form>
      </section>

      <section className="links-list">
        <div className="links-list-header">
          <h2>
            Tus enlaces
          </h2>

          <span>
            {links.length}{" "}
            {links.length === 1
              ? "enlace"
              : "enlaces"}
          </span>
        </div>

        {links.length === 0 ? (
          <div className="empty-links">
            <h3>
              Aún no tienes enlaces
            </h3>

            <p>
              Agrega redes sociales,
              contacto o sitios
              profesionales a tu
              portafolio.
            </p>
          </div>
        ) : (
          <div className="links-grid">
            {links.map(
              (link, index) => (
                <article
                  className="link-card"
                  key={link.id}
                >
                  <div>
                    <div className="link-card-top">
                      <div className="link-icon">
                        {link.icon
                          ? link.icon
                              .charAt(0)
                              .toUpperCase()
                          : "L"}
                      </div>

                      <div>
                        <h3>
                          {link.title}
                        </h3>

                        <span>
                          {link.is_active
                            ? "Activo"
                            : "Inactivo"}
                        </span>
                      </div>
                    </div>

                    <a
                      className="link-url"
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.url}
                    </a>

                    <p className="link-order">
                      Posición:{" "}
                      {index + 1}
                    </p>
                  </div>

                  <div className="link-card-actions">
                    <button
                      type="button"
                      disabled={
                        index === 0
                      }
                      onClick={() =>
                        handleMove(
                          link.id,
                          "up"
                        )
                      }
                    >
                      ↑ Subir
                    </button>

                    <button
                      type="button"
                      disabled={
                        index ===
                        links.length - 1
                      }
                      onClick={() =>
                        handleMove(
                          link.id,
                          "down"
                        )
                      }
                    >
                      ↓ Bajar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(link)
                      }
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          link.id
                        )
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default Links;