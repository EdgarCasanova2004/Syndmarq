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