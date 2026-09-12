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
  created_at: string;
}

function Admin() {
  const [summary, setSummary] =
    useState<AdminSummary | null>(null);

  const [users, setUsers] =
    useState<AdminUser[]>([]);

  const [message, setMessage] =
    useState("Cargando...");

  const [updatingUserId, setUpdatingUserId] =
    useState<number | null>(null);

  const loadAdmin = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const [
        summaryResponse,
        usersResponse,
      ] = await Promise.all([
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
      ]);

      const summaryData =
        await summaryResponse.json();

      const usersData =
        await usersResponse.json();

      if (!summaryResponse.ok) {
        setMessage(
          summaryData.message ||
            "No se pudo cargar el resumen"
        );

        return;
      }

      if (!usersResponse.ok) {
        setMessage(
          usersData.message ||
            "No se pudieron cargar los usuarios"
        );

        return;
      }

      setSummary(
        summaryData
      );

      setUsers(
        usersData.users || []
      );

      setMessage("");
    } catch (error) {
      console.error(error);

      setMessage(
        "No se pudo conectar con el servidor"
      );
    }
  };

  useEffect(() => {
    loadAdmin();
  }, []);

  const handleRoleChange = async (
    userId: number,
    newRole: string
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      setUpdatingUserId(userId);
      setMessage("");

      const response = await fetch(
        `http://localhost:3000/api/admin/users/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            role: newRole,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "No se pudo actualizar el rol"
        );

        return;
      }

      setUsers(
        users.map((user) =>
          user.id === userId
            ? {
                ...user,
                role:
                  data.user.role,
              }
            : user
        )
      );

      setMessage(
        "Rol actualizado correctamente"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "No se pudo conectar con el servidor"
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <main className="admin-page">
      <section className="admin-header">
        <div>
          <p className="admin-eyebrow">
            Administración
          </p>

          <h1>
            Panel de administración
          </h1>

          <p className="admin-subtitle">
            Consulta el estado general de la plataforma
            y los usuarios registrados.
          </p>
        </div>
      </section>

      {message && (
        <div className="admin-message">
          {message}
        </div>
      )}

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
                  Consulta y administra las cuentas
                  creadas en la plataforma.
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
                      Registro
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map(
                    (user) => (
                      <tr
                        key={user.id}
                      >
                        <td>
                          {user.name}
                        </td>

                        <td>
                          @{user.username}
                        </td>

                        <td>
                          {user.email}
                        </td>

                        <td>
                          <select
                            className={`admin-role-select admin-role-select-${user.role}`}
                            value={
                              user.role
                            }
                            disabled={
                              updatingUserId ===
                              user.id
                            }
                            onChange={(
                              event
                            ) =>
                              handleRoleChange(
                                user.id,
                                event.target
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
        </>
      )}
    </main>
  );
}

export default Admin;