import {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface Category {
  id: number;
  name: string;
}

interface Project {
  id: number;
  title: string;
  description: string | null;
  category_id: number | null;
  category_name: string | null;
  image_url: string | null;
  project_url: string | null;
  is_featured: boolean;
  is_active: boolean;
}

function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [projectUrl, setProjectUrl] =
    useState("");

  const [isFeatured, setIsFeatured] =
    useState(false);

  const [isActive, setIsActive] =
    useState(true);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [message, setMessage] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const token =
    localStorage.getItem("token");

  const loadProjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/projects",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (response.status === 401) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        navigate("/login");

        return;
      }

      if (!response.ok) {
        setMessage(
          data.message ||
            "No se pudieron cargar los proyectos"
        );

        return;
      }

      setProjects(data.projects);
    } catch (error) {
      console.error(error);

      setMessage(
        "No se pudo conectar con el servidor"
      );
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/projects/categories/list"
      );

      const data =
        await response.json();

      if (response.ok) {
        setCategories(
          data.categories
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    loadProjects();
    loadCategories();
  }, []);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategoryId("");
    setImageUrl("");
    setImageFile(null);
    setImagePreview("");
    setProjectUrl("");
    setIsFeatured(false);
    setIsActive(true);
    setEditingId(null);

    const fileInput =
      document.getElementById(
        "projectImage"
      ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(file.type)
    ) {
      setMessage(
        "Solo se permiten imágenes JPG, PNG o WEBP"
      );

      e.target.value = "";
      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setMessage(
        "La imagen no puede superar los 5 MB"
      );

      e.target.value = "";
      return;
    }

    setImageFile(file);

    setImagePreview(
      URL.createObjectURL(file)
    );

    setMessage("");
  };

  const uploadImage = async () => {
    if (!imageFile) {
      return imageUrl;
    }

    const formData =
      new FormData();

    formData.append(
      "image",
      imageFile
    );

    const response = await fetch(
      "http://localhost:3000/api/uploads/image",
      {
        method: "POST",
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "No se pudo subir la imagen"
      );
    }

    return data.imageUrl;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      setMessage(
        "El título es obligatorio"
      );

      return;
    }

    try {
      setUploading(true);

      setMessage(
        imageFile
          ? "Subiendo imagen..."
          : editingId
            ? "Actualizando proyecto..."
            : "Creando proyecto..."
      );

      const uploadedImageUrl =
        await uploadImage();

      const url = editingId
        ? `http://localhost:3000/api/projects/${editingId}`
        : "http://localhost:3000/api/projects";

      setMessage(
        editingId
          ? "Actualizando proyecto..."
          : "Creando proyecto..."
      );

      const response = await fetch(
        url,
        {
          method: editingId
            ? "PUT"
            : "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            title,
            description,

            categoryId:
              categoryId
                ? Number(categoryId)
                : null,

            imageUrl:
              uploadedImageUrl,

            projectUrl,
            isFeatured,
            isActive,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Ocurrió un error"
        );

        return;
      }

      setMessage(
        editingId
          ? "Proyecto actualizado correctamente"
          : "Proyecto creado correctamente"
      );

      clearForm();

      await loadProjects();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setMessage(
          error.message
        );
      } else {
        setMessage(
          "No se pudo conectar con el servidor"
        );
      }
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (
    project: Project
  ) => {
    setEditingId(project.id);

    setTitle(
      project.title
    );

    setDescription(
      project.description || ""
    );

    setCategoryId(
      project.category_id
        ? String(
            project.category_id
          )
        : ""
    );

    setImageUrl(
      project.image_url || ""
    );

    setImagePreview(
      project.image_url || ""
    );

    setImageFile(null);

    setProjectUrl(
      project.project_url || ""
    );

    setIsFeatured(
      project.is_featured
    );

    setIsActive(
      project.is_active
    );

    setMessage("");

    const fileInput =
      document.getElementById(
        "projectImage"
      ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageUrl("");
    setImagePreview("");

    const fileInput =
      document.getElementById(
        "projectImage"
      ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmation =
      window.confirm(
        "¿Seguro que deseas eliminar este proyecto?"
      );

    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/projects/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "No se pudo eliminar"
        );

        return;
      }

      setMessage(
        "Proyecto eliminado correctamente"
      );

      await loadProjects();
    } catch (error) {
      console.error(error);

      setMessage(
        "No se pudo conectar con el servidor"
      );
    }
  };

  return (
    <main className="projects-page">
      <div className="projects-header">
        <div>
          <p>
            Portafolio
          </p>

          <h1>
            Mis proyectos
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

      <section className="project-form-card">
        <h2>
          {editingId
            ? "Editar proyecto"
            : "Nuevo proyecto"}
        </h2>

        <form
          onSubmit={handleSubmit}
        >
          <label htmlFor="title">
            Título del proyecto
          </label>

          <input
            id="title"
            type="text"
            placeholder="Ej. Sistema de ventas"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            required
          />

          <label htmlFor="description">
            Descripción
          </label>

          <textarea
            id="description"
            placeholder="Describe brevemente tu proyecto..."
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <label htmlFor="category">
            Categoría
          </label>

          <select
            id="category"
            value={categoryId}
            onChange={(e) =>
              setCategoryId(
                e.target.value
              )
            }
          >
            <option value="">
              Selecciona una categoría
            </option>

            {categories.map(
              (category) => (
                <option
                  key={
                    category.id
                  }
                  value={
                    category.id
                  }
                >
                  {
                    category.name
                  }
                </option>
              )
            )}
          </select>

          <label htmlFor="projectImage">
            Imagen del proyecto
          </label>

          <input
            id="projectImage"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={
              handleImageChange
            }
          />

          <p className="project-image-help">
            Formatos permitidos: JPG,
            PNG y WEBP. Máximo 5 MB.
          </p>

          {imagePreview && (
            <div className="project-image-preview">
              <img
                src={imagePreview}
                alt="Vista previa del proyecto"
              />

              <button
                type="button"
                className="secondary-button"
                onClick={
                  handleRemoveImage
                }
              >
                Quitar imagen
              </button>
            </div>
          )}

          <label htmlFor="projectUrl">
            URL del proyecto
          </label>

          <input
            id="projectUrl"
            type="url"
            placeholder="https://github.com/..."
            value={projectUrl}
            onChange={(e) =>
              setProjectUrl(
                e.target.value
              )
            }
          />

          <div className="project-options">
            <label>
              <input
                type="checkbox"
                checked={
                  isFeatured
                }
                onChange={(e) =>
                  setIsFeatured(
                    e.target.checked
                  )
                }
              />

              Proyecto destacado
            </label>

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

              Proyecto visible
            </label>
          </div>

          <div className="project-form-buttons">
            <button
              type="submit"
              className="primary-button"
              disabled={uploading}
            >
              {uploading
                ? "Guardando..."
                : editingId
                  ? "Guardar cambios"
                  : "Crear proyecto"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-button"
                onClick={
                  clearForm
                }
                disabled={
                  uploading
                }
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

      <section className="projects-list">
        <div className="projects-list-header">
          <h2>
            Tus proyectos
          </h2>

          <span>
            {projects.length}{" "}
            {projects.length === 1
              ? "proyecto"
              : "proyectos"}
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="empty-projects">
            <h3>
              Aún no tienes proyectos
            </h3>

            <p>
              Crea tu primer proyecto
              para comenzar a construir
              tu portafolio.
            </p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map(
              (project) => (
                <article
                  className="project-card"
                  key={
                    project.id
                  }
                >
                  {project.image_url ? (
                    <img
                      src={
                        project.image_url
                      }
                      alt={
                        project.title
                      }
                    />
                  ) : (
                    <div className="project-image-placeholder">
                      Sin imagen
                    </div>
                  )}

                  <div className="project-card-content">
                    <div className="project-card-top">
                      <span>
                        {project.category_name ||
                          "Sin categoría"}
                      </span>

                      {project.is_featured && (
                        <strong>
                          Destacado
                        </strong>
                      )}
                    </div>

                    <h3>
                      {project.title}
                    </h3>

                    <p>
                      {project.description ||
                        "Sin descripción"}
                    </p>

                    <div className="project-status">
                      {project.is_active
                        ? "Visible"
                        : "Oculto"}
                    </div>

                    <div className="project-card-actions">
                      {project.project_url && (
                        <a
                          href={
                            project.project_url
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          Ver proyecto
                        </a>
                      )}

                      <button
                        onClick={() =>
                          handleEdit(
                            project
                          )
                        }
                      >
                        Editar
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            project.id
                          )
                        }
                      >
                        Eliminar
                      </button>
                    </div>
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

export default Projects;