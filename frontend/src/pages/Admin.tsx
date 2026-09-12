import {
  useEffect,
  useState,
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

type MessageType =
  | "success"
  | "error"
  | "info";

function Admin() {
  const [summary, setSummary] =
    useState<AdminSummary | null>(null);

  const [users, setUsers] =
    useState<AdminUser[]>([]);

  const [projects, setProjects] =
    useState<AdminProject[]>([]);

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
    updatingProjectId,
    setUpdatingProjectId,
  ] =
    useState<number | null>(null);

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

    if (messageType === "info") {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setMessage("");
      }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [message, messageType]);

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
          ]);

        const summaryData =
          await summaryResponse.json();

        const usersData =
          await usersResponse.json();

        const projectsData =
          await projectsResponse.json();

        if (!summaryResponse.ok) {
          showMessage(
            summaryData.message ||
              "No se pudo cargar el resumen",
            "error"
          );

          return;
        }

        if (!usersResponse.ok) {
          showMessage(
            usersData.message ||
              "No se pudieron cargar los usuarios",
            "error"
          );

          return;
        }

        if (!projectsResponse.ok) {
          showMessage(
            projectsData.message ||
              "No se pudieron cargar los proyectos",
            "error"
          );

          return;
        }

        setSummary(summaryData);

        setUsers(
          usersData.users || []
        );

        setProjects(
          projectsData.projects || []
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
        updatingRoleId !== null
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
                  role:
                    newRole,
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
          (currentUsers) =>
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
        updatingStatusId !== null
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

        setUsers(
          (currentUsers) =>
            currentUsers.map(
              (user) =>
                user.id ===
                userId
                  ? {
                      ...user,

                      is_active:
                        data.user
                          .is_active,
                    }
                  : user
            )
        );

        showMessage(
          newStatus
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

        setProjects(
          (currentProjects) =>
            currentProjects.map(
              (project) =>
                project.id ===
                projectId
                  ? {
                      ...project,

                      is_active:
                        data.project
                          .is_active,

                      updated_at:
                        data.project
                          .updated_at,
                    }
                  : project
            )
        );

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

  return (
    <main className="admin-page">
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
            Consulta el estado general
            de la plataforma y administra
            usuarios y proyectos.
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
                {summary.totalUsers}
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
                {summary.totalProjects}
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
                {summary.totalVisits}
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
                  Consulta y administra
                  las cuentas creadas en
                  la plataforma.
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
                      Estado
                    </th>

                    <th>
                      Acción
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
                  Revisa los proyectos
                  creados por los usuarios
                  y controla su visibilidad.
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
                      (project) => (
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
                                project.is_active
                                  ? "admin-status admin-status-active"
                                  : "admin-status admin-status-blocked"
                              }
                            >
                              <span className="admin-status-dot" />

                              {project.is_active
                                ? "Visible"
                                : "Oculto"}
                            </span>
                          </td>

                          <td>
                            <button
                              type="button"
                              className={
                                project.is_active
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
                                  project.is_active
                                )
                              }
                            >
                              {updatingProjectId ===
                              project.id
                                ? "Procesando..."
                                : project.is_active
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
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Admin;