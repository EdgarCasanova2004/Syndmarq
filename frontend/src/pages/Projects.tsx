import {

  useEffect,

  useState,

  type ChangeEvent,

  type FormEvent,

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



const API_URL = "http://localhost:3000";



const pageStyles = `

  .pv-projects {

    --pv-ink: #17243a;

    --pv-muted: #718096;

    --pv-blue: #5479a8;

    --pv-blue-dark: #385b86;

    --pv-line: #e7edf3;

    --pv-surface: rgba(255, 255, 255, .84);

    min-height: 100vh;

    padding: 38px clamp(18px, 5vw, 72px) 72px;

    color: var(--pv-ink);

    background:

      radial-gradient(ellipse at 8% 0%, rgba(205, 224, 242, .46), transparent 33%),

      radial-gradient(ellipse at 95% 35%, rgba(226, 234, 242, .7), transparent 28%),

      #f5f8fb;

  }



  .pv-projects *,

  .pv-projects *::before,

  .pv-projects *::after {

    box-sizing: border-box;

  }



  .pv-projects-shell {

    width: min(1180px, 100%);

    margin: 0 auto;

  }



  .pv-projects-header {

    display: flex;

    justify-content: space-between;

    align-items: flex-end;

    gap: 24px;

    margin-bottom: 30px;

  }



  .pv-eyebrow {

    display: inline-flex;

    align-items: center;

    gap: 9px;

    margin: 0 0 10px;

    color: #6f86a1;

    font-size: 11px;

    font-weight: 750;

    letter-spacing: .16em;

    text-transform: uppercase;

  }



  .pv-eyebrow::before {

    width: 20px;

    height: 1px;

    background: #94abc4;

    content: "";

  }



  .pv-projects-header h1 {

    margin: 0;

    font-size: clamp(30px, 4vw, 43px);

    letter-spacing: -.045em;

    line-height: 1.08;

  }



  .pv-projects-subtitle {

    max-width: 570px;

    margin: 12px 0 0;

    color: var(--pv-muted);

    font-size: 15px;

    line-height: 1.7;

  }



  .pv-button {

    display: inline-flex;

    min-height: 44px;

    align-items: center;

    justify-content: center;

    gap: 9px;

    border: 1px solid transparent;

    border-radius: 13px;

    padding: 0 17px;

    font: inherit;

    font-size: 13px;

    font-weight: 700;

    text-decoration: none;

    cursor: pointer;

    transition: transform .2s ease, box-shadow .2s ease, background .2s ease;

  }



  .pv-button:hover:not(:disabled) {

    transform: translateY(-2px);

  }



  .pv-button:disabled {

    cursor: wait;

    opacity: .65;

  }



  .pv-button-primary {

    color: white;

    background: linear-gradient(135deg, #6487b3, #436994);

    box-shadow: 0 9px 20px rgba(63, 99, 143, .18);

  }



  .pv-button-primary:hover:not(:disabled) {

    box-shadow: 0 12px 24px rgba(63, 99, 143, .25);

  }



  .pv-button-secondary {

    color: #526b87;

    border-color: #dfe7ef;

    background: rgba(255,255,255,.78);

  }



  .pv-projects-layout {

    display: grid;

    grid-template-columns: minmax(300px, .82fr) minmax(0, 1.45fr);

    align-items: start;

    gap: 22px;

  }



  .pv-panel {

    border: 1px solid rgba(223, 231, 239, .9);

    border-radius: 22px;

    background: var(--pv-surface);

    box-shadow: 0 18px 50px rgba(36, 57, 79, .055);

    backdrop-filter: blur(16px);

  }



  .pv-form-panel {

    position: sticky;

    top: 24px;

    padding: 24px;

  }



  .pv-panel-heading {

    display: flex;

    align-items: flex-start;

    justify-content: space-between;

    gap: 12px;

    margin-bottom: 22px;

  }



  .pv-panel-heading h2,

  .pv-list-heading h2 {

    margin: 0;

    font-size: 19px;

    letter-spacing: -.025em;

  }



  .pv-panel-heading p {

    margin: 7px 0 0;

    color: var(--pv-muted);

    font-size: 13px;

    line-height: 1.55;

  }



  .pv-step {

    display: grid;

    width: 34px;

    height: 34px;

    flex: 0 0 auto;

    place-items: center;

    border: 1px solid #e1eaf3;

    border-radius: 11px;

    color: #6b87a6;

    background: #f2f7fb;

    font-size: 12px;

    font-weight: 750;

  }



  .pv-form {

    display: grid;

    gap: 15px;

  }



  .pv-field {

    display: grid;

    gap: 7px;

  }



  .pv-field label,

  .pv-upload-label {

    color: #3c4c61;

    font-size: 12px;

    font-weight: 700;

  }



  .pv-field input,

  .pv-field textarea,

  .pv-field select {

    width: 100%;

    min-height: 44px;

    border: 1px solid #e1e8ef;

    border-radius: 12px;

    outline: none;

    padding: 11px 13px;

    color: var(--pv-ink);

    background: rgba(255,255,255,.84);

    font: inherit;

    font-size: 13px;

    transition: border .2s ease, box-shadow .2s ease;

  }



  .pv-field textarea {

    min-height: 94px;

    resize: vertical;

    line-height: 1.55;

  }



  .pv-field input:focus,

  .pv-field textarea:focus,

  .pv-field select:focus {

    border-color: #91abc8;

    box-shadow: 0 0 0 4px rgba(112, 147, 184, .12);

  }



  .pv-help {

    margin: 0;

    color: #8795a5;

    font-size: 11px;

    line-height: 1.5;

  }



  .pv-file-input {

    width: 100%;

    border: 1px dashed #cbd8e5;

    border-radius: 13px;

    padding: 12px;

    color: #65778c;

    background: #f8fafc;

    font: inherit;

    font-size: 12px;

  }



  .pv-image-preview {

    position: relative;

    overflow: hidden;

    height: 150px;

    border: 1px solid var(--pv-line);

    border-radius: 14px;

    background: #eef3f7;

  }



  .pv-image-preview img {

    width: 100%;

    height: 100%;

    object-fit: cover;

  }



  .pv-image-remove {

    position: absolute;

    right: 9px;

    bottom: 9px;

    min-height: 34px;

    border: 1px solid rgba(255,255,255,.7);

    border-radius: 10px;

    padding: 0 11px;

    color: #364a61;

    background: rgba(255,255,255,.9);

    font: inherit;

    font-size: 11px;

    font-weight: 700;

    cursor: pointer;

  }



  .pv-options {

    display: grid;

    gap: 9px;

    border-top: 1px solid #edf1f5;

    padding-top: 14px;

  }



  .pv-check {

    display: flex;

    align-items: center;

    gap: 9px;

    color: #526276;

    font-size: 12px;

    cursor: pointer;

  }



  .pv-check input {

    width: 15px;

    height: 15px;

    accent-color: #5e82ad;

  }



  .pv-form-actions {

    display: flex;

    flex-wrap: wrap;

    gap: 9px;

    margin-top: 2px;

  }



  .pv-alert {

    margin: 0;

    border: 1px solid #e3eaf1;

    border-radius: 12px;

    padding: 11px 12px;

    color: #5c7188;

    background: #f4f8fb;

    font-size: 12px;

    line-height: 1.5;

    opacity: 1;

    transform: translateY(0);

    transition: opacity .35s ease, transform .35s ease;

  }



  .pv-alert--fading {

    opacity: 0;

    transform: translateY(-5px);

    pointer-events: none;

  }



  .pv-alert-success {

    border-color: #d9ebe3;

    color: #3d755d;

    background: #f1f8f4;

  }



  .pv-alert-error {

    border-color: #f0dede;

    color: #9a5656;

    background: #fff6f5;

  }



  .pv-list-panel {

    min-height: 360px;

    padding: 24px;

  }



  .pv-list-heading {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 14px;

    margin-bottom: 19px;

  }



  .pv-count {

    border: 1px solid #e2eaf1;

    border-radius: 999px;

    padding: 7px 11px;

    color: #6b7e92;

    background: #f7fafc;

    font-size: 11px;

    font-weight: 700;

  }



  .pv-project-grid {

    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 14px;

  }



  .pv-project-card {

    overflow: hidden;

    border: 1px solid #e6ecf2;

    border-radius: 17px;

    background: rgba(255,255,255,.92);

    transition: transform .22s ease, box-shadow .22s ease;

    animation: pv-card-in .45s both;

  }



  .pv-project-card:hover {

    transform: translateY(-3px);

    box-shadow: 0 14px 30px rgba(41, 65, 91, .09);

  }



  @keyframes pv-card-in {

    from { opacity: 0; transform: translateY(9px); }

    to { opacity: 1; transform: translateY(0); }

  }



  .pv-project-image {

    display: grid;

    height: 150px;

    place-items: center;

    overflow: hidden;

    color: #8394a6;

    background:

      linear-gradient(135deg, rgba(221,233,244,.8), rgba(241,245,249,.9));

    font-size: 12px;

  }



  .pv-project-image img {

    width: 100%;

    height: 100%;

    object-fit: cover;

    transition: transform .5s ease;

  }



  .pv-project-card:hover .pv-project-image img {

    transform: scale(1.04);

  }



  .pv-card-body {

    padding: 15px;

  }



  .pv-card-meta {

    display: flex;

    flex-wrap: wrap;

    align-items: center;

    gap: 6px;

    margin-bottom: 10px;

  }



  .pv-tag {

    border: 1px solid #e5ebf1;

    border-radius: 999px;

    padding: 5px 8px;

    color: #6b7d91;

    background: #f8fafc;

    font-size: 10px;

    font-weight: 700;

  }



  .pv-tag-featured {

    border-color: #e9e3d2;

    color: #8b7540;

    background: #fbf8ef;

  }



  .pv-card-body h3 {

    overflow-wrap: anywhere;

    margin: 0;

    font-size: 16px;

    letter-spacing: -.02em;

  }



  .pv-card-description {

    display: -webkit-box;

    overflow: hidden;

    min-height: 38px;

    margin: 8px 0 12px;

    color: #788698;

    font-size: 12px;

    line-height: 1.6;

    -webkit-box-orient: vertical;

    -webkit-line-clamp: 2;

  }



  .pv-card-footer {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 8px;

    border-top: 1px solid #edf1f5;

    padding-top: 11px;

  }



  .pv-status {

    display: inline-flex;

    align-items: center;

    gap: 6px;

    color: #718196;

    font-size: 10px;

    font-weight: 700;

  }



  .pv-status::before {

    width: 7px;

    height: 7px;

    border-radius: 50%;

    background: #bbc5cf;

    content: "";

  }



  .pv-status-visible::before {

    background: #62a486;

    box-shadow: 0 0 0 3px rgba(98,164,134,.12);

  }



  .pv-card-actions {

    display: flex;

    align-items: center;

    gap: 5px;

  }



  .pv-card-actions a,

  .pv-card-actions button {

    border: 0;

    border-radius: 8px;

    padding: 7px 8px;

    color: #5d7897;

    background: #f3f7fa;

    font: inherit;

    font-size: 10px;

    font-weight: 700;

    text-decoration: none;

    cursor: pointer;

  }



  .pv-card-actions .pv-delete {

    color: #a56868;

    background: #fbf3f2;

  }



  .pv-empty {

    display: grid;

    min-height: 260px;

    place-items: center;

    border: 1px dashed #d7e1ea;

    border-radius: 16px;

    padding: 28px;

    text-align: center;

    background: rgba(248,250,252,.65);

  }



  .pv-empty-mark {

    display: grid;

    width: 48px;

    height: 48px;

    margin: 0 auto 13px;

    place-items: center;

    border: 1px solid #e2eaf2;

    border-radius: 16px;

    color: #718ba8;

    background: #f0f5f9;

    font-size: 21px;

  }



  .pv-empty h3 {

    margin: 0;

    font-size: 15px;

  }



  .pv-empty p {

    max-width: 320px;

    margin: 8px auto 0;

    color: var(--pv-muted);

    font-size: 12px;

    line-height: 1.6;

  }



  .pv-loading {

    padding: 28px;

    color: var(--pv-muted);

    text-align: center;

    font-size: 13px;

  }



  @media (max-width: 900px) {

    .pv-projects-layout {

      grid-template-columns: 1fr;

    }



    .pv-form-panel {

      position: static;

    }

  }



  @media (max-width: 600px) {

    .pv-projects {

      padding: 25px 14px 48px;

    }



    .pv-projects-header {

      align-items: flex-start;

      flex-direction: column;

      gap: 17px;

      margin-bottom: 21px;

    }



    .pv-projects-header > .pv-button {

      width: 100%;

    }



    .pv-projects-subtitle {

      font-size: 13px;

    }



    .pv-form-panel,

    .pv-list-panel {

      padding: 18px;

      border-radius: 18px;

    }



    .pv-project-grid {

      grid-template-columns: 1fr;

    }



    .pv-project-image {

      height: 180px;

    }



    .pv-form-actions .pv-button {

      flex: 1;

    }

  }



  @media (prefers-reduced-motion: reduce) {

    .pv-projects *,

    .pv-projects *::before,

    .pv-projects *::after {

      scroll-behavior: auto !important;

      animation-duration: .01ms !important;

      transition-duration: .01ms !important;

    }

  }

`;



function Projects() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");



  const [projects, setProjects] = useState<Project[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState("");

  const [projectUrl, setProjectUrl] = useState("");

  const [isFeatured, setIsFeatured] = useState(false);

  const [isActive, setIsActive] = useState(true);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<"info" | "success" | "error">("info");

  const [messageFading, setMessageFading] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [loadingProjects, setLoadingProjects] = useState(true);



  const showMessage = (

    text: string,

    type: "info" | "success" | "error" = "info",

  ) => {

    setMessage(text);

    setMessageType(type);

    setMessageFading(false);

  };



  useEffect(() => {

    if (!message || messageType === "info") {

      setMessageFading(false);

      return;

    }

    const fadeTimer = window.setTimeout(() => {

      setMessageFading(true);

    }, 1500);

    const clearTimer = window.setTimeout(() => {

      setMessage("");

      setMessageType("info");

      setMessageFading(false);

    }, 1900);

    return () => {

      window.clearTimeout(fadeTimer);

      window.clearTimeout(clearTimer);

    };

  }, [message, messageType]);



  const loadProjects = async () => {

    try {

      const response = await fetch(`${API_URL}/api/projects`, {

        headers: { Authorization: `Bearer ${token}` },

      });



      const data = await response.json();



      if (response.status === 401 || response.status === 403) {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

        return;

      }



      if (!response.ok) {

        showMessage(data.message || "No se pudieron cargar los proyectos", "error");

        return;

      }



      setProjects(data.projects ?? []);

    } catch (error) {

      console.error(error);

      showMessage("No se pudo conectar con el servidor", "error");

    } finally {

      setLoadingProjects(false);

    }

  };



  const loadCategories = async () => {

    try {

      const response = await fetch(`${API_URL}/api/projects/categories/list`);

      const data = await response.json();



      if (response.ok) {

        setCategories(data.categories ?? []);

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



    void loadProjects();

    void loadCategories();

    // La carga inicial depende de la sesión al abrir esta pantalla.

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);



  useEffect(() => {

    return () => {

      if (imagePreview.startsWith("blob:")) {

        URL.revokeObjectURL(imagePreview);

      }

    };

  }, [imagePreview]);



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



    const fileInput = document.getElementById("projectImage") as HTMLInputElement | null;

    if (fileInput) fileInput.value = "";

  };



  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];

    if (!file) return;



    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {

      showMessage("Elige una imagen JPG, PNG o WEBP.", "error");

      event.target.value = "";

      return;

    }



    if (file.size > 5 * 1024 * 1024) {

      showMessage("La imagen no puede superar los 5 MB.", "error");

      event.target.value = "";

      return;

    }



    setImageFile(file);

    setImagePreview(URL.createObjectURL(file));

    showMessage("");

  };



  const uploadImage = async () => {

    if (!imageFile) return imageUrl;



    const formData = new FormData();

    formData.append("image", imageFile);



    const response = await fetch(`${API_URL}/api/uploads/image`, {

      method: "POST",

      headers: { Authorization: `Bearer ${token}` },

      body: formData,

    });



    const data = await response.json();



    if (!response.ok) {

      throw new Error(data.message || "No se pudo subir la imagen");

    }



    return data.imageUrl as string;

  };



  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();



    if (!title.trim()) {

      showMessage("El título del proyecto es obligatorio.", "error");

      return;

    }



    try {

      setUploading(true);

      showMessage(imageFile ? "Subiendo imagen…" : "Guardando proyecto…");



      const uploadedImageUrl = await uploadImage();

      const url = editingId

        ? `${API_URL}/api/projects/${editingId}`

        : `${API_URL}/api/projects`;



      const response = await fetch(url, {

        method: editingId ? "PUT" : "POST",

        headers: {

          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,

        },

        body: JSON.stringify({

          title: title.trim(),

          description: description.trim(),

          categoryId: categoryId ? Number(categoryId) : null,

          imageUrl: uploadedImageUrl,

          projectUrl: projectUrl.trim(),

          isFeatured,

          isActive,

        }),

      });



      const data = await response.json();



      if (!response.ok) {

        showMessage(data.message || "No se pudo guardar el proyecto.", "error");

        return;

      }



      showMessage(

        editingId ? "Proyecto actualizado correctamente." : "Proyecto creado correctamente.",

        "success",

      );



      clearForm();

      await loadProjects();

    } catch (error) {

      console.error(error);

      showMessage(

        error instanceof Error ? error.message : "No se pudo conectar con el servidor.",

        "error",

      );

    } finally {

      setUploading(false);

    }

  };



  const handleEdit = (project: Project) => {

    setEditingId(project.id);

    setTitle(project.title);

    setDescription(project.description || "");

    setCategoryId(project.category_id ? String(project.category_id) : "");

    setImageUrl(project.image_url || "");

    setImagePreview(project.image_url || "");

    setImageFile(null);

    setProjectUrl(project.project_url || "");

    setIsFeatured(project.is_featured);

    setIsActive(project.is_active);

    showMessage("");



    const fileInput = document.getElementById("projectImage") as HTMLInputElement | null;

    if (fileInput) fileInput.value = "";



    window.scrollTo({ top: 0, behavior: "smooth" });

  };



  const handleRemoveImage = () => {

    setImageFile(null);

    setImageUrl("");

    setImagePreview("");



    const fileInput = document.getElementById("projectImage") as HTMLInputElement | null;

    if (fileInput) fileInput.value = "";

  };



  const handleDelete = async (id: number) => {

    if (!window.confirm("¿Seguro que deseas eliminar este proyecto?")) return;



    try {

      const response = await fetch(`${API_URL}/api/projects/${id}`, {

        method: "DELETE",

        headers: { Authorization: `Bearer ${token}` },

      });



      const data = await response.json();



      if (!response.ok) {

        showMessage(data.message || "No se pudo eliminar el proyecto.", "error");

        return;

      }



      showMessage("Proyecto eliminado correctamente.", "success");

      await loadProjects();

    } catch (error) {

      console.error(error);

      showMessage("No se pudo conectar con el servidor.", "error");

    }

  };



  return (

    <main className="pv-projects">

      <style>{pageStyles}</style>



      <div className="pv-projects-shell">

        <header className="pv-projects-header">

          <div>

            <p className="pv-eyebrow">Portavia · Tu espacio creativo</p>

            <h1>Mis proyectos</h1>

            <p className="pv-projects-subtitle">

              Organiza el trabajo que mejor representa lo que haces. Agrega detalles,

              elige una imagen y decide qué proyectos quieres mostrar en tu portafolio.

            </p>

          </div>



          <button

            className="pv-button pv-button-secondary"

            type="button"

            onClick={() => navigate("/dashboard")}

          >

            ← <span>Volver al dashboard</span>

          </button>

        </header>



        <div className="pv-projects-layout">

          <section className="pv-panel pv-form-panel">

            <div className="pv-panel-heading">

              <div>

                <h2>{editingId ? "Editar proyecto" : "Añade un proyecto"}</h2>

                <p>

                  {editingId

                    ? "Actualiza la información de este trabajo."

                    : "Cuéntale a las personas qué has creado."}

                </p>

              </div>

              <span className="pv-step">{editingId ? "02" : "01"}</span>

            </div>



            <form className="pv-form" onSubmit={handleSubmit}>

              <div className="pv-field">

                <label htmlFor="title">Nombre del proyecto</label>

                <input

                  id="title"

                  type="text"

                  placeholder="Ej. Identidad visual para Nómada"

                  value={title}

                  onChange={(event) => setTitle(event.target.value)}

                  maxLength={120}

                  required

                />

              </div>



              <div className="pv-field">

                <label htmlFor="description">Descripción</label>

                <textarea

                  id="description"

                  placeholder="¿Qué hiciste y qué hace especial este proyecto?"

                  value={description}

                  onChange={(event) => setDescription(event.target.value)}

                  maxLength={600}

                />

                <p className="pv-help">Una descripción breve ayuda a dar contexto a tu trabajo.</p>

              </div>



              <div className="pv-field">

                <label htmlFor="category">Categoría</label>

                <select

                  id="category"

                  value={categoryId}

                  onChange={(event) => setCategoryId(event.target.value)}

                >

                  <option value="">Selecciona una categoría</option>

                  {categories.map((category) => (

                    <option key={category.id} value={category.id}>

                      {category.name}

                    </option>

                  ))}

                </select>

              </div>



              <div className="pv-field">

                <label className="pv-upload-label" htmlFor="projectImage">

                  Imagen de portada

                </label>

                <input

                  className="pv-file-input"

                  id="projectImage"

                  type="file"

                  accept="image/jpeg,image/png,image/webp"

                  onChange={handleImageChange}

                />

                <p className="pv-help">JPG, PNG o WEBP · Máximo 5 MB.</p>



                {imagePreview && (

                  <div className="pv-image-preview">

                    <img src={imagePreview} alt="Vista previa del proyecto" />

                    <button

                      className="pv-image-remove"

                      type="button"

                      onClick={handleRemoveImage}

                    >

                      Quitar imagen

                    </button>

                  </div>

                )}

              </div>



              <div className="pv-field">

                <label htmlFor="projectUrl">Enlace del proyecto</label>

                <input

                  id="projectUrl"

                  type="url"

                  placeholder="https://..."

                  value={projectUrl}

                  onChange={(event) => setProjectUrl(event.target.value)}

                />

              </div>



              <div className="pv-options">

                <label className="pv-check">

                  <input

                    type="checkbox"

                    checked={isFeatured}

                    onChange={(event) => setIsFeatured(event.target.checked)}

                  />

                  Marcar como proyecto destacado

                </label>

                <label className="pv-check">

                  <input

                    type="checkbox"

                    checked={isActive}

                    onChange={(event) => setIsActive(event.target.checked)}

                  />

                  Mostrar en mi portafolio público

                </label>

              </div>



              <div className="pv-form-actions">

                <button

                  className="pv-button pv-button-primary"

                  type="submit"

                  disabled={uploading}

                >

                  {uploading

                    ? "Guardando…"

                    : editingId

                      ? "Guardar cambios"

                      : "Crear proyecto"}

                </button>



                {editingId && (

                  <button

                    className="pv-button pv-button-secondary"

                    type="button"

                    onClick={clearForm}

                    disabled={uploading}

                  >

                    Cancelar

                  </button>

                )}

              </div>



              {message && (

                <p

                  className={`pv-alert ${

                    messageType === "success"

                      ? "pv-alert-success"

                      : messageType === "error"

                        ? "pv-alert-error"

                        : ""

                  } ${messageFading ? "pv-alert--fading" : ""}`}

                  role="status"

                >

                  {message}

                </p>

              )}

            </form>

          </section>



          <section className="pv-panel pv-list-panel">

            <div className="pv-list-heading">

              <div>

                <p className="pv-eyebrow">Tu colección</p>

                <h2>Proyectos publicados</h2>

              </div>

              <span className="pv-count">

                {projects.length} {projects.length === 1 ? "proyecto" : "proyectos"}

              </span>

            </div>



            {loadingProjects ? (

              <div className="pv-loading">Cargando tus proyectos…</div>

            ) : projects.length === 0 ? (

              <div className="pv-empty">

                <div>

                  <div className="pv-empty-mark">＋</div>

                  <h3>Tu portafolio empieza aquí</h3>

                  <p>

                    Cuando agregues tu primer proyecto, aparecerá en esta sección listo

                    para que lo revises y lo compartas.

                  </p>

                </div>

              </div>

            ) : (

              <div className="pv-project-grid">

                {projects.map((project) => (

                  <article className="pv-project-card" key={project.id}>

                    <div className="pv-project-image">

                      {project.image_url ? (

                        <img src={project.image_url} alt={project.title} />

                      ) : (

                        <span>Sin imagen de portada</span>

                      )}

                    </div>



                    <div className="pv-card-body">

                      <div className="pv-card-meta">

                        <span className="pv-tag">

                          {project.category_name || "Sin categoría"}

                        </span>

                        {project.is_featured && (

                          <span className="pv-tag pv-tag-featured">Destacado</span>

                        )}

                      </div>



                      <h3>{project.title}</h3>

                      <p className="pv-card-description">

                        {project.description || "Añade una descripción para contar más sobre este proyecto."}

                      </p>



                      <div className="pv-card-footer">

                        <span

                          className={`pv-status ${

                            project.is_active ? "pv-status-visible" : ""

                          }`}

                        >

                          {project.is_active ? "Visible" : "Oculto"}

                        </span>



                        <div className="pv-card-actions">

                          {project.project_url && (

                            <a

                              href={project.project_url}

                              target="_blank"

                              rel="noreferrer"

                            >

                              Ver

                            </a>

                          )}

                          <button type="button" onClick={() => handleEdit(project)}>

                            Editar

                          </button>

                          <button

                            className="pv-delete"

                            type="button"

                            onClick={() => void handleDelete(project.id)}

                          >

                            Eliminar

                          </button>

                        </div>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            )}

          </section>

        </div>

      </div>

    </main>

  );

}



export default Projects;