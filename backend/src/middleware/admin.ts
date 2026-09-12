import type {
  NextFunction,
  Response,
} from "express";
import pool from "../db.js";
import type {
  AuthRequest,
} from "./auth.js";

export const verifyAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message:
          "Usuario no autenticado",
      });
    }

    const result =
      await pool.query(
        `
        SELECT role
        FROM users
        WHERE id = $1
        `,
        [req.user.id]
      );

    if (
      result.rows.length === 0
    ) {
      return res.status(404).json({
        message:
          "Usuario no encontrado",
      });
    }

    const role =
      result.rows[0].role;

    if (role !== "admin") {
      return res.status(403).json({
        message:
          "No tienes permisos de administrador",
      });
    }

    next();
  } catch (error) {
    console.error(
      "Error al verificar administrador:",
      error
    );

    return res.status(500).json({
      message:
        "Error al verificar permisos de administrador",
    });
  }
};