import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import "../App.css";

interface AdminSummary {
  totalUsers: number;
  totalProjects: number;
  totalVisits: number;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  username: string;
  role: string;
  is_active: boolean;
  portfolio_visible: boolean;
  created_at: string;
}

interface AdminProject {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  category_id: number | null;
  image_url: string | null;
  project_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  author_name: string;
  author_username: string;
  category_name: string | null;
}

interface AdminCategory {
  id: number;
  name: string;
  description: string | null;
  status: boolean;
}

type MessageType =
  | "success"
  | "error"
  | "info";

const toBoolean = (
  value: unknown
) => {
  return (
    value === true ||
    value === "true"
  );
};

function Admin() {
  const currentUserId = (() => {
    try {
      const storedUser =
        localStorage.getItem(
          "user"
        );

      if (!storedUser) {
        return null;
      }

      const parsedUser =
        JSON.parse(storedUser);

      return Number(
        parsedUser.id
      );
    } catch {
      return null;
    }
  })();

  const [summary, setSummary] =
    useState<AdminSummary | null>(
      null
    );

  const [users, setUsers] =
    useState<AdminUser[]>([]);

  const [projects, setProjects] =
    useState<AdminProject[]>([]);

  const [
    categories,
    setCategories,
  ] =
    useState<AdminCategory[]>([]);

  const [message, setMessage] =
    useState("");

  const [
    messageType,
    setMessageType,
  ] =
    useState<MessageType>("info");

  const [
    updatingRoleId,
    setUpdatingRoleId,
  ] =
    useState<number | null>(null);

  const [
    updatingStatusId,
    setUpdatingStatusId,
  ] =
    useState<number | null>(null);

  const [
    updatingPortfolioId,
    setUpdatingPortfolioId,
  ] =
    useState<number | null>(null);

  const [
    updatingProjectId,
    setUpdatingProjectId,
  ] =
    useState<number | null>(null);

  const [
    updatingCategoryId,
    setUpdatingCategoryId,
  ] =
    useState<number | null>(null);

  const [
    deletingCategoryId,
    setDeletingCategoryId,
  ] =
    useState<number | null>(null);

  const [
    deletingUserId,
    setDeletingUserId,
  ] =
    useState<number | null>(null);

  const [
    userPendingDelete,
    setUserPendingDelete,
  ] =
    useState<AdminUser | null>(null);

  const [
    editingCategoryId,
    setEditingCategoryId,
  ] =
    useState<number | null>(null);

  const [
    categoryPendingDelete,
    setCategoryPendingDelete,
  ] =
    useState<AdminCategory | null>(null);

  const [
    categoryName,
    setCategoryName,
  ] =
    useState("");

  const [
    categoryDescription,
    setCategoryDescription,
  ] =
    useState("");

  const [
    savingCategory,
    setSavingCategory,
  ] =
    useState(false);

  const showMessage = (
    text: string,
    type: MessageType
  ) => {
    setMessage(text);
    setMessageType(type);
  };

  useEffect(() => {
    if (!message) {
      return;
    }

    if (
      messageType === "info"
    ) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setMessage("");
      }, 3000);

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [
    message,
    messageType,
  ]);

  const loadAdmin =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const [
          summaryResponse,
          usersResponse,
          projectsResponse,
          categoriesResponse,
        ] =
          await Promise.all([
            fetch(
              "http://localhost:3000/api/admin/summary",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            ),

            fetch(
              "http://localhost:3000/api/admin/users",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            ),

            fetch(
              "http://localhost:3000/api/admin/projects",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            ),

            fetch(
              "http://localhost:3000/api/admin/categories",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            ),
          ]);

        const summaryData =
          await summaryResponse.json();

        const usersData =
          await usersResponse.json();

        const projectsData =
          await projectsResponse.json();

        const categoriesData =
          await categoriesResponse.json();

        if (
          !summaryResponse.ok
        ) {
          showMessage(
            summaryData.message ||
              "No se pudo cargar el resumen",
            "error"
          );

          return;
        }

        if (
          !usersResponse.ok
        ) {
          showMessage(
            usersData.message ||
              "No se pudieron cargar los usuarios",
            "error"
          );

          return;
        }

        if (
          !projectsResponse.ok
        ) {
          showMessage(
            projectsData.message ||
              "No se pudieron cargar los proyectos",
            "error"
          );

          return;
        }

        if (
          !categoriesResponse.ok
        ) {
          showMessage(
            categoriesData.message ||
              "No se pudieron cargar las categorías",
            "error"
          );

          return;
        }

        setSummary(
          summaryData
        );

        setUsers(
          (
            usersData.users ||
            []
          ).map(
            (
              user: AdminUser
            ) => ({
              ...user,
              is_active:
                toBoolean(
                  user.is_active
                ),
              portfolio_visible:
                toBoolean(
                  user.portfolio_visible
                ),
            })
          )
        );

        setProjects(
          (
            projectsData.projects ||
            []
          ).map(
            (
              project: AdminProject
            ) => ({
              ...project,
              is_active:
                toBoolean(
                  project.is_active
                ),
            })
          )
        );

        setCategories(
          (
            categoriesData.categories ||
            []
          ).map(
            (
              category: AdminCategory
            ) => ({
              ...category,
              status:
                toBoolean(
                  category.status
                ),
            })
          )
        );
      } catch (error) {
        console.error(error);

        showMessage(
          "No se pudo conectar con el servidor",
          "error"
        );
      }
    };

  useEffect(() => {
    loadAdmin();
  }, []);

  const handleRoleChange =
    async (
      userId: number,
      newRole: string
    ) => {
      if (
        updatingRoleId !==
        null
      ) {
        return;
      }

      setUpdatingRoleId(
        userId
      );

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `http://localhost:3000/api/admin/users/${userId}/role`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body:
                JSON.stringify({
                  role: newRole,
                }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          showMessage(
            data.message ||
              "No se pudo actualizar el rol",
            "error"
          );

          return;
        }

        setUsers(
          (
            currentUsers
          ) =>
            currentUsers.map(
              (user) =>
                user.id ===
                userId
                  ? {
                      ...user,
                      role:
                        data.user
                          .role,
                    }
                  : user
            )
        );

        showMessage(
          "Rol actualizado correctamente",
          "success"
        );
      } catch (error) {
        console.error(error);

        showMessage(
          "No se pudo conectar con el servidor",
          "error"
        );
      } finally {
        window.setTimeout(
          () => {
            setUpdatingRoleId(
              null
            );
          },
          100
        );
      }
    };

  const handleStatusChange =
    async (
      userId: number,
      currentStatus: boolean
    ) => {
      if (
        updatingStatusId !==
        null
      ) {
        return;
      }

      const newStatus =
        !currentStatus;

      setUpdatingStatusId(
        userId
      );

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `http://localhost:3000/api/admin/users/${userId}/status`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body:
                JSON.stringify({
                  is_active:
                    newStatus,
                }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          showMessage(
            data.message ||
              "No se pudo actualizar el estado",
            "error"
          );

          return;
        }

        const serverStatus =
          toBoolean(
            data.user
              .is_active
          );

        setUsers(
          (
            currentUsers
          ) =>
            currentUsers.map(
              (user) =>
                user.id ===
                userId
                  ? {
                      ...user,
                      is_active:
                        serverStatus,
                    }
                  : user
            )
        );

        showMessage(
          serverStatus
            ? "Usuario desbloqueado correctamente"
            : "Usuario bloqueado correctamente",
          "success"
        );
      } catch (error) {
        console.error(error);

        showMessage(
          "No se pudo conectar con el servidor",
          "error"
        );
      } finally {
        window.setTimeout(
          () => {
            setUpdatingStatusId(
              null
            );
          },
          100
        );
      }
    };

  const handlePortfolioVisibilityChange =
    async (
      userId: number,
      currentVisibility: boolean
    ) => {
      if (
        updatingPortfolioId !== null
      ) {
        return;
      }

      const newVisibility =
        !currentVisibility;

      setUpdatingPortfolioId(
        userId
      );

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `http://localhost:3000/api/admin/users/${userId}/portfolio`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body:
                JSON.stringify({
                  portfolio_visible:
                    newVisibility,
                }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          showMessage(
            data.message ||
              "No se pudo actualizar la visibilidad del portafolio",
            "error"
          );

          return;
        }

        const serverVisibility =
          toBoolean(
            data.user
              .portfolio_visible
          );

        setUsers(
          (
            currentUsers
          ) =>
            currentUsers.map(
              (user) =>
                user.id ===
                userId
                  ? {
                      ...user,
                      portfolio_visible:
                        serverVisibility,
                    }
                  : user
            )
        );

        showMessage(
          serverVisibility
            ? "Portafolio mostrado correctamente"
            : "Portafolio ocultado correctamente",
          "success"
        );
      } catch (error) {
        console.error(error);

        showMessage(
          "No se pudo conectar con el servidor",
          "error"
        );
      } finally {
        window.setTimeout(
          () => {
            setUpdatingPortfolioId(
              null
            );
          },
          100
        );
      }
    };

  const handleDeleteUser =
    (
      user: AdminUser
    ) => {
      if (
        deletingUserId !== null
      ) {
        return;
      }

      if (
        currentUserId === user.id
      ) {
        showMessage(
          "No puedes eliminar tu propia cuenta de administrador",
          "error"
        );

        return;
      }

      setUserPendingDelete(
        user
      );
    };

  const handleConfirmDeleteUser =
    async () => {
      const user =
        userPendingDelete;

      if (
        !user ||
        deletingUserId !== null
      ) {
        return;
      }

      setDeletingUserId(
        user.id
      );

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `http://localhost:3000/api/admin/users/${user.id}`,
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
          showMessage(
            data.message ||
              "No se pudo eliminar el usuario",
            "error"
          );

          return;
        }

        setUserPendingDelete(
          null
        );

        await loadAdmin();

        showMessage(
          `Usuario ${user.username} eliminado correctamente`,
          "success"
        );
      } catch (error) {
        console.error(error);

        showMessage(
          "No se pudo conectar con el servidor",
          "error"
        );
      } finally {
        window.setTimeout(
          () => {
            setDeletingUserId(
              null
            );
          },
          100
        );
      }
    };

  const handleProjectStatusChange =
    async (
      projectId: number,
      currentStatus: boolean
    ) => {
      if (
        updatingProjectId !== null
      ) {
        return;
      }

      const newStatus =
        !currentStatus;

      setUpdatingProjectId(
        projectId
      );

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `http://localhost:3000/api/admin/projects/${projectId}/status`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body:
                JSON.stringify({
                  is_active:
                    newStatus,
                }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          showMessage(
            data.message ||
              "No se pudo actualizar el proyecto",
            "error"
          );

          return;
        }

        await loadAdmin();

        showMessage(
          newStatus
            ? "Proyecto habilitado correctamente"
            : "Proyecto ocultado correctamente",
          "success"
        );
      } catch (error) {
        console.error(error);

        showMessage(
          "No se pudo conectar con el servidor",
          "error"
        );
      } finally {
        window.setTimeout(
          () => {
            setUpdatingProjectId(
              null
            );
          },
          100
        );
      }
    };

  const clearCategoryForm =
    () => {
      setEditingCategoryId(
        null
      );

      setCategoryName("");

      setCategoryDescription(
        ""
      );
    };

  const handleEditCategory =
    (
      category: AdminCategory
    ) => {
      setEditingCategoryId(
        category.id
      );

      setCategoryName(
        category.name
      );

      setCategoryDescription(
        category.description ||
          ""
      );

      window.scrollTo({
        top:
          document.body
            .scrollHeight,
        behavior: "smooth",
      });
    };

  const handleSaveCategory =
    async (
      event: FormEvent
    ) => {
      event.preventDefault();

      const cleanName =
        categoryName.trim();

      if (!cleanName) {
        showMessage(
          "Escribe el nombre de la categoría",
          "error"
        );

        return;
      }

      setSavingCategory(
        true
      );

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const isEditing =
          editingCategoryId !==
          null;

        const url =
          isEditing
            ? `http://localhost:3000/api/admin/categories/${editingCategoryId}`
            : "http://localhost:3000/api/admin/categories";

        const response =
          await fetch(
            url,
            {
              method:
                isEditing
                  ? "PUT"
                  : "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body:
                JSON.stringify({
                  name:
                    cleanName,

                  description:
                    categoryDescription.trim(),
                }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          showMessage(
            data.message ||
              "No se pudo guardar la categoría",
            "error"
          );

          return;
        }

        const savedCategory: AdminCategory =
          {
            ...data.category,

            status:
              toBoolean(
                data.category
                  .status
              ),
          };

        if (isEditing) {
          setCategories(
            (
              currentCategories
            ) =>
              currentCategories
                .map(
                  (
                    category
                  ) =>
                    category.id ===
                    editingCategoryId
                      ? savedCategory
                      : category
                )
                .sort(
                  (a, b) =>
                    a.name.localeCompare(
                      b.name,
                      "es"
                    )
                )
          );
        } else {
          setCategories(
            (
              currentCategories
            ) =>
              [
                ...currentCategories,
                savedCategory,
              ].sort(
                (a, b) =>
                  a.name.localeCompare(
                    b.name,
                    "es"
                  )
              )
          );
        }

        showMessage(
          isEditing
            ? "Categoría actualizada correctamente"
            : "Categoría creada correctamente",
          "success"
        );

        clearCategoryForm();
      } catch (error) {
        console.error(error);

        showMessage(
          "No se pudo conectar con el servidor",
          "error"
        );
      } finally {
        setSavingCategory(
          false
        );
      }
    };

  const handleCategoryStatusChange =
    async (
      categoryId: number,
      currentStatus: boolean
    ) => {
      if (
        updatingCategoryId !==
        null
      ) {
        return;
      }

      const newStatus =
        !currentStatus;

      setUpdatingCategoryId(
        categoryId
      );

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `http://localhost:3000/api/admin/categories/${categoryId}/status`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body:
                JSON.stringify({
                  status:
                    newStatus,
                }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          showMessage(
            data.message ||
              "No se pudo actualizar la categoría",
            "error"
          );

          return;
        }

        const serverStatus =
          toBoolean(
            data.category
              .status
          );

        setCategories(
          (
            currentCategories
          ) =>
            currentCategories.map(
              (category) =>
                category.id ===
                categoryId
                  ? {
                      ...category,
                      status:
                        serverStatus,
                    }
                  : category
            )
        );

        showMessage(
          serverStatus
            ? "Categoría activada correctamente"
            : "Categoría desactivada correctamente",
          "success"
        );
      } catch (error) {
        console.error(error);

        showMessage(
          "No se pudo conectar con el servidor",
          "error"
        );
      } finally {
        window.setTimeout(
          () => {
            setUpdatingCategoryId(
              null
            );
          },
          100
        );
      }
    };

  const handleDeleteCategory =
    async (
      category: AdminCategory
    ) => {
      if (
        deletingCategoryId !== null
      ) {
        return;
      }

      setCategoryPendingDelete(
        category
      );
    };

  const handleConfirmDeleteCategory =
    async () => {
      const category =
        categoryPendingDelete;

      if (
        !category ||
        deletingCategoryId !== null
      ) {
        return;
      }

      setDeletingCategoryId(
        category.id
      );

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `http://localhost:3000/api/admin/categories/${category.id}`,
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
          showMessage(
            data.message ||
              "No se pudo eliminar la categoría",
            "error"
          );
          return;
        }

        setCategories(
          (
            currentCategories
          ) =>
            currentCategories.filter(
              (
                currentCategory
              ) =>
                currentCategory.id !==
                category.id
            )
        );

        if (
          editingCategoryId ===
          category.id
        ) {
          clearCategoryForm();
        }

        setCategoryPendingDelete(
          null
        );

        showMessage(
          "Categoría eliminada correctamente",
          "success"
        );
      } catch (error) {
        console.error(error);

        showMessage(
          "No se pudo conectar con el servidor",
          "error"
        );
      } finally {
        window.setTimeout(
          () => {
            setDeletingCategoryId(
              null
            );
          },
          100
        );
      }
    };

  return (
    <main className="admin-page" translate="no">
      {message && (
        <div
          className={`admin-toast admin-toast-${messageType}`}
        >
          <div className="admin-toast-icon">
            {messageType ===
            "success"
              ? "✓"
              : messageType ===
                  "error"
                ? "!"
                : "i"}
          </div>

          <div className="admin-toast-content">
            <strong>
              {messageType ===
              "success"
                ? "Listo"
                : messageType ===
                    "error"
                  ? "Error"
                  : "Información"}
            </strong>

            <span>
              {message}
            </span>
          </div>

          <button
            type="button"
            className="admin-toast-close"
            onClick={() =>
              setMessage("")
            }
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        </div>
      )}

      <section className="admin-header">
        <div>
          <p className="admin-eyebrow">
            Administración
          </p>

          <h1>
            Panel de administración
          </h1>

          <p className="admin-subtitle">
            Consulta el estado general de la
            plataforma y administra usuarios,
            proyectos y categorías.
          </p>
        </div>
      </section>

      {summary && (
        <>
          <section className="admin-stats">
            <article className="admin-stat-card">
              <span>
                Usuarios
              </span>

              <strong>
                {
                  summary.totalUsers
                }
              </strong>

              <p>
                Usuarios registrados
              </p>
            </article>

            <article className="admin-stat-card">
              <span>
                Proyectos
              </span>

              <strong>
                {
                  summary.totalProjects
                }
              </strong>

              <p>
                Proyectos creados
              </p>
            </article>

            <article className="admin-stat-card">
              <span>
                Visitas
              </span>

              <strong>
                {
                  summary.totalVisits
                }
              </strong>

              <p>
                Visitas registradas
              </p>
            </article>
          </section>

          <section className="admin-users-section">
            <div className="admin-section-header">
              <div>
                <h2>
                  Usuarios registrados
                </h2>

                <p>
                  Consulta y administra las
                  cuentas creadas en la
                  plataforma.
                </p>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>
                      Nombre
                    </th>

                    <th>
                      Usuario
                    </th>

                    <th>
                      Correo
                    </th>

                    <th>
                      Rol
                    </th>

                    <th>
                      Cuenta
                    </th>

                    <th>
                      Acción
                    </th>

                    <th>
                      Portafolio
                    </th>

                    <th>
                      Acción
                    </th>

                    <th>
                      Eliminar
                    </th>

                    <th>
                      Registro
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map(
                    (user) => (
                      <tr
                        key={
                          user.id
                        }
                      >
                        <td>
                          {
                            user.name
                          }
                        </td>

                        <td>
                          @
                          {
                            user.username
                          }
                        </td>

                        <td>
                          {
                            user.email
                          }
                        </td>

                        <td>
                          <select
                            className={`admin-role-select admin-role-select-${user.role}`}
                            value={
                              user.role
                            }
                            disabled={
                              updatingRoleId ===
                                user.id ||
                              updatingStatusId ===
                                user.id
                            }
                            onChange={(
                              event
                            ) =>
                              handleRoleChange(
                                user.id,
                                event
                                  .target
                                  .value
                              )
                            }
                          >
                            <option value="user">
                              Usuario
                            </option>

                            <option value="admin">
                              Administrador
                            </option>
                          </select>
                        </td>

                        <td>
                          <span
                            className={
                              user.is_active
                                ? "admin-status admin-status-active"
                                : "admin-status admin-status-blocked"
                            }
                          >
                            <span className="admin-status-dot" />

                            {user.is_active
                              ? "Activo"
                              : "Bloqueado"}
                          </span>
                        </td>

                        <td>
                          <button
                            type="button"
                            className={
                              user.is_active
                                ? "admin-status-button admin-status-button-block"
                                : "admin-status-button admin-status-button-unblock"
                            }
                            disabled={
                              updatingStatusId ===
                                user.id ||
                              updatingRoleId ===
                                user.id ||
                              updatingPortfolioId ===
                                user.id
                            }
                            onClick={() =>
                              handleStatusChange(
                                user.id,
                                user.is_active
                              )
                            }
                          >
                            {updatingStatusId ===
                            user.id
                              ? "Procesando..."
                              : user.is_active
                                ? "Bloquear"
                                : "Desbloquear"}
                          </button>
                        </td>

                        <td>
                          <span
                            className={
                              user.portfolio_visible
                                ? "admin-status admin-status-active"
                                : "admin-status admin-status-blocked"
                            }
                          >
                            <span className="admin-status-dot" />

                            {user.portfolio_visible
                              ? "Visible"
                              : "Oculto"}
                          </span>
                        </td>

                        <td>
                          <button
                            type="button"
                            className={
                              user.portfolio_visible
                                ? "admin-status-button admin-status-button-block"
                                : "admin-status-button admin-status-button-unblock"
                            }
                            disabled={
                              updatingPortfolioId ===
                                user.id ||
                              updatingStatusId ===
                                user.id ||
                              updatingRoleId ===
                                user.id
                            }
                            onClick={() =>
                              handlePortfolioVisibilityChange(
                                user.id,
                                user.portfolio_visible
                              )
                            }
                          >
                            {updatingPortfolioId ===
                            user.id
                              ? "Procesando..."
                              : user.portfolio_visible
                                ? "Ocultar"
                                : "Mostrar"}
                          </button>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="admin-user-delete-button"
                            disabled={
                              deletingUserId ===
                                user.id ||
                              currentUserId ===
                                user.id
                            }
                            onClick={() =>
                              handleDeleteUser(
                                user
                              )
                            }
                            title={
                              currentUserId ===
                              user.id
                                ? "No puedes eliminar tu propia cuenta"
                                : "Eliminar usuario"
                            }
                          >
                            {deletingUserId ===
                            user.id
                              ? "Eliminando..."
                              : currentUserId ===
                                  user.id
                                ? "Tu cuenta"
                                : "Eliminar"}
                          </button>
                        </td>

                        <td>
                          {new Date(
                            user.created_at
                          ).toLocaleDateString(
                            "es-MX"
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="admin-users-section">
            <div className="admin-section-header">
              <div>
                <h2>
                  Moderación de proyectos
                </h2>

                <p>
                  Revisa los proyectos creados
                  por los usuarios y controla
                  su visibilidad.
                </p>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>
                      Proyecto
                    </th>

                    <th>
                      Autor
                    </th>

                    <th>
                      Categoría
                    </th>

                    <th>
                      Estado
                    </th>

                    <th>
                      Acción
                    </th>

                    <th>
                      Creado
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {projects.length ===
                  0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          textAlign:
                            "center",
                        }}
                      >
                        No hay proyectos registrados.
                      </td>
                    </tr>
                  ) : (
                    projects.map(
                      (
                        project
                      ) => {
                        const isVisible =
                          project.is_active ===
                          true;

                        return (
                          <tr
                            key={
                              project.id
                            }
                          >
                            <td>
                              <strong>
                                {
                                  project.title
                                }
                              </strong>
                            </td>

                            <td>
                              <div>
                                {
                                  project.author_name
                                }
                              </div>

                              <small>
                                @
                                {
                                  project.author_username
                                }
                              </small>
                            </td>

                            <td>
                              {project.category_name ||
                                "Sin categoría"}
                            </td>

                            <td>
                              <span
                                className={
                                  isVisible
                                    ? "admin-status admin-status-active"
                                    : "admin-status admin-status-blocked"
                                }
                              >
                                <span className="admin-status-dot" />

                                {isVisible
                                  ? "Visible"
                                  : "Oculto"}
                              </span>
                            </td>

                            <td>
                              <button
                                type="button"
                                className={
                                  isVisible
                                    ? "admin-status-button admin-status-button-block"
                                    : "admin-status-button admin-status-button-unblock"
                                }
                                disabled={
                                  updatingProjectId ===
                                  project.id
                                }
                                onClick={() =>
                                  handleProjectStatusChange(
                                    project.id,
                                    isVisible
                                  )
                                }
                              >
                                {updatingProjectId ===
                                project.id
                                  ? "Procesando..."
                                  : isVisible
                                    ? "Ocultar"
                                    : "Mostrar"}
                              </button>
                            </td>

                            <td>
                              {new Date(
                                project.created_at
                              ).toLocaleDateString(
                                "es-MX"
                              )}
                            </td>
                          </tr>
                        );
                      }
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="admin-users-section">
            <div className="admin-section-header">
              <div>
                <h2>
                  Gestión de categorías
                </h2>

                <p>
                  Crea, edita y controla las
                  categorías disponibles para
                  los proyectos.
                </p>
              </div>
            </div>

            <form
              className="admin-category-form"
              onSubmit={
                handleSaveCategory
              }
            >
              <div className="admin-category-field">
                <label htmlFor="category-name">
                  Nombre
                </label>

                <input
                  id="category-name"
                  type="text"
                  maxLength={100}
                  value={
                    categoryName
                  }
                  onChange={(
                    event
                  ) =>
                    setCategoryName(
                      event.target
                        .value
                    )
                  }
                  placeholder="Ej. Desarrollo Web"
                />
              </div>

              <div className="admin-category-field">
                <label htmlFor="category-description">
                  Descripción
                </label>

                <input
                  id="category-description"
                  type="text"
                  value={
                    categoryDescription
                  }
                  onChange={(
                    event
                  ) =>
                    setCategoryDescription(
                      event.target
                        .value
                    )
                  }
                  placeholder="Descripción de la categoría"
                />
              </div>

              <div className="admin-category-actions">
                <button
                  type="submit"
                  className="admin-category-save"
                  disabled={
                    savingCategory
                  }
                >
                  {savingCategory
                    ? "Guardando..."
                    : editingCategoryId !==
                        null
                      ? "Guardar cambios"
                      : "Crear categoría"}
                </button>

                {editingCategoryId !==
                  null && (
                  <button
                    type="button"
                    className="admin-category-cancel"
                    onClick={
                      clearCategoryForm
                    }
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>
                      Nombre
                    </th>

                    <th>
                      Descripción
                    </th>

                    <th>
                      Estado
                    </th>

                    <th>
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {categories.length ===
                  0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          textAlign:
                            "center",
                        }}
                      >
                        No hay categorías registradas.
                      </td>
                    </tr>
                  ) : (
                    categories.map(
                      (
                        category
                      ) => (
                        <tr
                          key={
                            category.id
                          }
                        >
                          <td>
                            <strong>
                              {
                                category.name
                              }
                            </strong>
                          </td>

                          <td>
                            {category.description ||
                              "Sin descripción"}
                          </td>

                          <td>
                            <span
                              className={
                                category.status
                                  ? "admin-status admin-status-active"
                                  : "admin-status admin-status-blocked"
                              }
                            >
                              <span className="admin-status-dot" />

                              {category.status
                                ? "Activa"
                                : "Inactiva"}
                            </span>
                          </td>

                          <td>
                            <div className="admin-category-row-actions">
                              <button
                                type="button"
                                className="admin-category-edit"
                                onClick={() =>
                                  handleEditCategory(
                                    category
                                  )
                                }
                              >
                                Editar
                              </button>

                              <button
                                type="button"
                                className={
                                  category.status
                                    ? "admin-status-button admin-status-button-block"
                                    : "admin-status-button admin-status-button-unblock"
                                }
                                disabled={
                                  updatingCategoryId ===
                                  category.id
                                }
                                onClick={() =>
                                  handleCategoryStatusChange(
                                    category.id,
                                    category.status
                                  )
                                }
                              >
                                {updatingCategoryId ===
                                category.id
                                  ? "Procesando..."
                                  : category.status
                                    ? "Desactivar"
                                    : "Activar"}
                              </button>

                              <button
                                type="button"
                                className="admin-status-button admin-status-button-block"
                                disabled={
                                  deletingCategoryId ===
                                    category.id ||
                                  updatingCategoryId ===
                                    category.id
                                }
                                onClick={() =>
                                  handleDeleteCategory(
                                    category
                                  )
                                }
                              >
                                {deletingCategoryId ===
                                category.id
                                  ? "Eliminando..."
                                  : "Eliminar"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {userPendingDelete && (
        <div
          className="admin-delete-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget &&
              deletingUserId === null
            ) {
              setUserPendingDelete(null);
            }
          }}
        >
          <div
            className="admin-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-user-title"
            aria-describedby="delete-user-description"
          >
            <div className="admin-delete-modal-icon">
              !
            </div>

            <div className="admin-delete-modal-content">
              <span className="admin-delete-modal-label">
                Eliminación permanente
              </span>

              <h2 id="delete-user-title">
                ¿Eliminar usuario?
              </h2>

              <p id="delete-user-description">
                Estás a punto de eliminar permanentemente
                la cuenta de{" "}
                <strong>
                  {userPendingDelete.name}
                </strong>{" "}
                (@{userPendingDelete.username}).
              </p>

              <div className="admin-delete-modal-warning">
                <span>!</span>
                <p>
                  Se eliminarán su cuenta, proyectos,
                  enlaces y registros de visitas.
                  Esta acción no se puede deshacer.
                </p>
              </div>
            </div>

            <div className="admin-delete-modal-actions">
              <button
                type="button"
                className="admin-delete-modal-cancel"
                disabled={deletingUserId !== null}
                onClick={() =>
                  setUserPendingDelete(null)
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="admin-delete-modal-confirm"
                disabled={deletingUserId !== null}
                onClick={handleConfirmDeleteUser}
              >
                {deletingUserId !== null
                  ? "Eliminando..."
                  : "Eliminar usuario"}
              </button>
            </div>
          </div>
        </div>
      )}

      {categoryPendingDelete && (
        <div
          className="admin-delete-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget &&
              deletingCategoryId === null
            ) {
              setCategoryPendingDelete(null);
            }
          }}
        >
          <div
            className="admin-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-category-title"
            aria-describedby="delete-category-description"
          >
            <div className="admin-delete-modal-icon">
              !
            </div>

            <div className="admin-delete-modal-content">
              <span className="admin-delete-modal-label">
                Acción irreversible
              </span>

              <h2 id="delete-category-title">
                ¿Eliminar categoría?
              </h2>

              <p id="delete-category-description">
                Estás a punto de eliminar
                permanentemente la categoría{" "}
                <strong>
                  {categoryPendingDelete.name}
                </strong>
                .
              </p>

              <div className="admin-delete-modal-warning">
                <span>i</span>
                <p>
                  Los proyectos asociados no se
                  eliminarán. Permanecerán guardados,
                  pero quedarán sin categoría.
                </p>
              </div>
            </div>

            <div className="admin-delete-modal-actions">
              <button
                type="button"
                className="admin-delete-modal-cancel"
                disabled={deletingCategoryId !== null}
                onClick={() =>
                  setCategoryPendingDelete(null)
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="admin-delete-modal-confirm"
                disabled={deletingCategoryId !== null}
                onClick={handleConfirmDeleteCategory}
              >
                {deletingCategoryId !== null
                  ? "Eliminando..."
                  : "Eliminar categoría"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Admin;




