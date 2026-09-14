import { Router } from "express";
import pool from "../db.js";
import {
  verifyToken,
} from "../middleware/auth.js";
import {
  verifyAdmin,
} from "../middleware/admin.js";
import type {
  AuthRequest,
} from "../middleware/auth.js";

const router = Router();

router.get(
  "/users",
  verifyToken,
  verifyAdmin,
  async (
    _req: AuthRequest,
    res
  ) => {
    try {
      const result =
        await pool.query(
          `
          SELECT
            id,
            name,
            email,
            username,
            role,
            is_active,
            portfolio_visible,
            created_at
          FROM users
          ORDER BY created_at DESC
          `
        );

      return res.json({
        users: result.rows,
      });
    } catch (error) {
      console.error(
        "Error al obtener usuarios:",
        error
      );

      return res.status(500).json({
        message:
          "Error al obtener los usuarios",
      });
    }
  }
);

router.put(
  "/users/:id/role",
  verifyToken,
  verifyAdmin,
  async (
    req: AuthRequest,
    res
  ) => {
    try {
      const userId =
        Number(req.params.id);

      const {
        role,
      } = req.body;

      if (
        Number.isNaN(userId)
      ) {
        return res.status(400).json({
          message:
            "ID de usuario inválido",
        });
      }

      if (
        role !== "user" &&
        role !== "admin"
      ) {
        return res.status(400).json({
          message:
            "Rol no válido",
        });
      }

      if (
        req.user!.id === userId &&
        role !== "admin"
      ) {
        return res.status(400).json({
          message:
            "No puedes quitarte tu propio rol de administrador",
        });
      }

      const result =
        await pool.query(
          `
          UPDATE users
          SET role = $1
          WHERE id = $2
          RETURNING
            id,
            name,
            email,
            username,
            role,
            is_active,
            portfolio_visible,
            created_at
          `,
          [
            role,
            userId,
          ]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          message:
            "Usuario no encontrado",
        });
      }

      return res.json({
        message:
          "Rol actualizado correctamente",
        user:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "Error al actualizar rol:",
        error
      );

      return res.status(500).json({
        message:
          "Error al actualizar el rol",
      });
    }
  }
);

router.put(
  "/users/:id/status",
  verifyToken,
  verifyAdmin,
  async (
    req: AuthRequest,
    res
  ) => {
    try {
      const userId =
        Number(req.params.id);

      const {
        is_active,
      } = req.body;

      if (
        Number.isNaN(userId)
      ) {
        return res.status(400).json({
          message:
            "ID de usuario inválido",
        });
      }

      if (
        typeof is_active !==
        "boolean"
      ) {
        return res.status(400).json({
          message:
            "Estado de usuario inválido",
        });
      }

      if (
        req.user!.id === userId &&
        is_active === false
      ) {
        return res.status(400).json({
          message:
            "No puedes bloquear tu propia cuenta",
        });
      }

      const result =
        await pool.query(
          `
          UPDATE users
          SET is_active = $1
          WHERE id = $2
          RETURNING
            id,
            name,
            email,
            username,
            role,
            is_active,
            portfolio_visible,
            created_at
          `,
          [
            is_active,
            userId,
          ]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          message:
            "Usuario no encontrado",
        });
      }

      return res.json({
        message:
          is_active
            ? "Usuario desbloqueado correctamente"
            : "Usuario bloqueado correctamente",

        user:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "Error al actualizar estado:",
        error
      );

      return res.status(500).json({
        message:
          "Error al actualizar el estado del usuario",
      });
    }
  }
);

router.put(
  "/users/:id/portfolio",
  verifyToken,
  verifyAdmin,
  async (
    req: AuthRequest,
    res
  ) => {
    try {
      const userId =
        Number(req.params.id);

      const {
        portfolio_visible,
      } = req.body;

      if (
        Number.isNaN(userId)
      ) {
        return res.status(400).json({
          message:
            "ID de usuario inválido",
        });
      }

      if (
        typeof portfolio_visible !==
        "boolean"
      ) {
        return res.status(400).json({
          message:
            "Estado de portafolio inválido",
        });
      }

      const result =
        await pool.query(
          `
          UPDATE users
          SET portfolio_visible = $1
          WHERE id = $2
          RETURNING
            id,
            name,
            email,
            username,
            role,
            is_active,
            portfolio_visible,
            created_at
          `,
          [
            portfolio_visible,
            userId,
          ]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          message:
            "Usuario no encontrado",
        });
      }

      return res.json({
        message:
          portfolio_visible
            ? "Portafolio mostrado correctamente"
            : "Portafolio ocultado correctamente",

        user:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "Error al actualizar visibilidad del portafolio:",
        error
      );

      return res.status(500).json({
        message:
          "Error al actualizar la visibilidad del portafolio",
      });
    }
  }
);

router.delete(
  "/users/:id",
  verifyToken,
  verifyAdmin,
  async (
    req: AuthRequest,
    res
  ) => {
    const userId =
      Number(req.params.id);

    if (
      Number.isNaN(userId)
    ) {
      return res.status(400).json({
        message:
          "ID de usuario inválido",
      });
    }

    if (
      req.user!.id === userId
    ) {
      return res.status(400).json({
        message:
          "No puedes eliminar tu propia cuenta de administrador",
      });
    }

    const client =
      await pool.connect();

    try {
      await client.query(
        "BEGIN"
      );

      const userResult =
        await client.query(
          `
          SELECT
            id,
            name,
            email,
            username,
            role
          FROM users
          WHERE id = $1
          `,
          [userId]
        );

      if (
        userResult.rows.length === 0
      ) {
        await client.query(
          "ROLLBACK"
        );

        return res.status(404).json({
          message:
            "Usuario no encontrado",
        });
      }

      await client.query(
        `
        DELETE FROM portfolio_visits
        WHERE user_id = $1
        `,
        [userId]
      );

      await client.query(
        `
        DELETE FROM links
        WHERE user_id = $1
        `,
        [userId]
      );

      await client.query(
        `
        DELETE FROM projects
        WHERE user_id = $1
        `,
        [userId]
      );

      const deleteResult =
        await client.query(
          `
          DELETE FROM users
          WHERE id = $1
          RETURNING
            id,
            name,
            email,
            username,
            role
          `,
          [userId]
        );

      await client.query(
        "COMMIT"
      );

      return res.json({
        message:
          "Usuario eliminado correctamente",

        user:
          deleteResult.rows[0],
      });
    } catch (error) {
      await client.query(
        "ROLLBACK"
      );

      console.error(
        "Error al eliminar usuario:",
        error
      );

      return res.status(500).json({
        message:
          "Error al eliminar el usuario",
      });
    } finally {
      client.release();
    }
  }
);

router.get(
  "/projects",
  verifyToken,
  verifyAdmin,
  async (
    _req: AuthRequest,
    res
  ) => {
    try {
      const result =
        await pool.query(
          `
          SELECT
            p.id,
            p.user_id,
            p.title,
            p.description,
            p.category_id,
            p.image_url,
            p.project_url,
            p.is_featured,
            p.is_active,
            p.sort_order,
            p.created_at,
            p.updated_at,
            u.name AS author_name,
            u.username AS author_username,
            c.name AS category_name
          FROM projects p
          INNER JOIN users u
            ON p.user_id = u.id
          LEFT JOIN categories c
            ON p.category_id = c.id
          ORDER BY p.created_at DESC
          `
        );

      return res.json({
        projects: result.rows,
      });
    } catch (error) {
      console.error(
        "Error al obtener proyectos:",
        error
      );

      return res.status(500).json({
        message:
          "Error al obtener los proyectos",
      });
    }
  }
);

router.put(
  "/projects/:id/status",
  verifyToken,
  verifyAdmin,
  async (
    req: AuthRequest,
    res
  ) => {
    try {
      const projectId =
        Number(req.params.id);

      const {
        is_active,
      } = req.body;

      if (
        Number.isNaN(projectId)
      ) {
        return res.status(400).json({
          message:
            "ID de proyecto inválido",
        });
      }

      if (
        typeof is_active !==
        "boolean"
      ) {
        return res.status(400).json({
          message:
            "Estado de proyecto inválido",
        });
      }

      const result =
        await pool.query(
          `
          UPDATE projects
          SET
            is_active = $1,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $2
          RETURNING
            id,
            user_id,
            title,
            description,
            category_id,
            image_url,
            project_url,
            is_featured,
            is_active,
            sort_order,
            created_at,
            updated_at
          `,
          [
            is_active,
            projectId,
          ]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          message:
            "Proyecto no encontrado",
        });
      }

      return res.json({
        message:
          is_active
            ? "Proyecto habilitado correctamente"
            : "Proyecto ocultado correctamente",

        project:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "Error al actualizar proyecto:",
        error
      );

      return res.status(500).json({
        message:
          "Error al actualizar el estado del proyecto",
      });
    }
  }
);

router.get(
  "/categories",
  verifyToken,
  verifyAdmin,
  async (
    _req: AuthRequest,
    res
  ) => {
    try {
      const result =
        await pool.query(
          `
          SELECT
            id,
            name,
            description,
            status
          FROM categories
          ORDER BY name ASC
          `
        );

      return res.json({
        categories:
          result.rows,
      });
    } catch (error) {
      console.error(
        "Error al obtener categorías:",
        error
      );

      return res.status(500).json({
        message:
          "Error al obtener las categorías",
      });
    }
  }
);

router.post(
  "/categories",
  verifyToken,
  verifyAdmin,
  async (
    req: AuthRequest,
    res
  ) => {
    try {
      const {
        name,
        description,
      } = req.body;

      const cleanName =
        typeof name === "string"
          ? name.trim()
          : "";

      const cleanDescription =
        typeof description === "string"
          ? description.trim()
          : "";

      if (!cleanName) {
        return res.status(400).json({
          message:
            "El nombre de la categoría es obligatorio",
        });
      }

      if (
        cleanName.length > 100
      ) {
        return res.status(400).json({
          message:
            "El nombre de la categoría no puede superar los 100 caracteres",
        });
      }

      const duplicateResult =
        await pool.query(
          `
          SELECT id
          FROM categories
          WHERE LOWER(name) = LOWER($1)
          `,
          [cleanName]
        );

      if (
        duplicateResult.rows.length >
        0
      ) {
        return res.status(409).json({
          message:
            "Ya existe una categoría con ese nombre",
        });
      }

      const result =
        await pool.query(
          `
          INSERT INTO categories (
            name,
            description,
            status
          )
          VALUES ($1, $2, TRUE)
          RETURNING
            id,
            name,
            description,
            status
          `,
          [
            cleanName,
            cleanDescription ||
              null,
          ]
        );

      return res.status(201).json({
        message:
          "Categoría creada correctamente",

        category:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "Error al crear categoría:",
        error
      );

      return res.status(500).json({
        message:
          "Error al crear la categoría",
      });
    }
  }
);

router.put(
  "/categories/:id",
  verifyToken,
  verifyAdmin,
  async (
    req: AuthRequest,
    res
  ) => {
    try {
      const categoryId =
        Number(req.params.id);

      const {
        name,
        description,
      } = req.body;

      if (
        Number.isNaN(categoryId)
      ) {
        return res.status(400).json({
          message:
            "ID de categoría inválido",
        });
      }

      const cleanName =
        typeof name === "string"
          ? name.trim()
          : "";

      const cleanDescription =
        typeof description === "string"
          ? description.trim()
          : "";

      if (!cleanName) {
        return res.status(400).json({
          message:
            "El nombre de la categoría es obligatorio",
        });
      }

      if (
        cleanName.length > 100
      ) {
        return res.status(400).json({
          message:
            "El nombre de la categoría no puede superar los 100 caracteres",
        });
      }

      const duplicateResult =
        await pool.query(
          `
          SELECT id
          FROM categories
          WHERE
            LOWER(name) = LOWER($1)
            AND id <> $2
          `,
          [
            cleanName,
            categoryId,
          ]
        );

      if (
        duplicateResult.rows.length >
        0
      ) {
        return res.status(409).json({
          message:
            "Ya existe una categoría con ese nombre",
        });
      }

      const result =
        await pool.query(
          `
          UPDATE categories
          SET
            name = $1,
            description = $2
          WHERE id = $3
          RETURNING
            id,
            name,
            description,
            status
          `,
          [
            cleanName,
            cleanDescription ||
              null,
            categoryId,
          ]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          message:
            "Categoría no encontrada",
        });
      }

      return res.json({
        message:
          "Categoría actualizada correctamente",

        category:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "Error al actualizar categoría:",
        error
      );

      return res.status(500).json({
        message:
          "Error al actualizar la categoría",
      });
    }
  }
);

router.put(
  "/categories/:id/status",
  verifyToken,
  verifyAdmin,
  async (
    req: AuthRequest,
    res
  ) => {
    try {
      const categoryId =
        Number(req.params.id);

      const {
        status,
      } = req.body;

      if (
        Number.isNaN(categoryId)
      ) {
        return res.status(400).json({
          message:
            "ID de categoría inválido",
        });
      }

      if (
        typeof status !==
        "boolean"
      ) {
        return res.status(400).json({
          message:
            "Estado de categoría inválido",
        });
      }

      const result =
        await pool.query(
          `
          UPDATE categories
          SET status = $1
          WHERE id = $2
          RETURNING
            id,
            name,
            description,
            status
          `,
          [
            status,
            categoryId,
          ]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          message:
            "Categoría no encontrada",
        });
      }

      return res.json({
        message:
          status
            ? "Categoría activada correctamente"
            : "Categoría desactivada correctamente",

        category:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "Error al actualizar estado de categoría:",
        error
      );

      return res.status(500).json({
        message:
          "Error al actualizar el estado de la categoría",
      });
    }
  }
);

router.delete(
  "/categories/:id",
  verifyToken,
  verifyAdmin,
  async (
    req: AuthRequest,
    res
  ) => {
    try {
      const categoryId =
        Number(req.params.id);

      if (
        Number.isNaN(categoryId)
      ) {
        return res.status(400).json({
          message:
            "ID de categoría inválido",
        });
      }

      const result =
        await pool.query(
          `
          DELETE FROM categories
          WHERE id = $1
          RETURNING
            id,
            name,
            description,
            status
          `,
          [categoryId]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          message:
            "Categoría no encontrada",
        });
      }

      return res.json({
        message:
          "Categoría eliminada correctamente",

        category:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "Error al eliminar categoría:",
        error
      );

      return res.status(500).json({
        message:
          "Error al eliminar la categoría",
      });
    }
  }
);

router.get(
  "/summary",
  verifyToken,
  verifyAdmin,
  async (
    _req: AuthRequest,
    res
  ) => {
    try {
      const usersResult =
        await pool.query(
          `
          SELECT COUNT(*)::int AS total
          FROM users
          `
        );

      const projectsResult =
        await pool.query(
          `
          SELECT COUNT(*)::int AS total
          FROM projects
          `
        );

      const visitsResult =
        await pool.query(
          `
          SELECT COUNT(*)::int AS total
          FROM portfolio_visits
          `
        );

      return res.json({
        totalUsers:
          usersResult.rows[0].total,

        totalProjects:
          projectsResult.rows[0].total,

        totalVisits:
          visitsResult.rows[0].total,
      });
    } catch (error) {
      console.error(
        "Error al obtener resumen:",
        error
      );

      return res.status(500).json({
        message:
          "Error al obtener el resumen administrativo",
      });
    }
  }
);

export default router;