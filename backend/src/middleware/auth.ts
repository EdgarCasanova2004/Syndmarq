import type {
  NextFunction,
  Request,
  Response,
} from "express";
import jwt from "jsonwebtoken";
import pool from "../db.js";

export interface AuthRequest
  extends Request {
  user?: {
    id: number;
    email?: string;
    username?: string;
    role?: string;
  };
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message:
        "Token no proporcionado",
    });
  }

  const [
    scheme,
    token,
  ] = authHeader.split(" ");

  if (
    scheme !== "Bearer" ||
    !token
  ) {
    return res.status(401).json({
      message:
        "Formato de token inválido",
    });
  }

  const jwtSecret =
    process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error(
      "JWT_SECRET no está configurado"
    );

    return res.status(500).json({
      message:
        "Error de configuración del servidor",
    });
  }

  let decoded;

  try {
    decoded =
      jwt.verify(
        token,
        jwtSecret
      );
  } catch (error) {
    return res.status(401).json({
      message:
        "Token inválido o expirado",
    });
  }

  if (
    typeof decoded === "string" ||
    typeof decoded.id !== "number"
  ) {
    return res.status(401).json({
      message:
        "Token inválido",
    });
  }

  try {
    const result =
      await pool.query(
        `
        SELECT
          id,
          email,
          username,
          role,
          is_active
        FROM users
        WHERE id = $1
        `,
        [decoded.id]
      );

    if (
      result.rows.length === 0
    ) {
      return res.status(401).json({
        message:
          "Usuario no encontrado",
      });
    }

    const user =
      result.rows[0];

    if (!user.is_active) {
      return res.status(403).json({
        message:
          "Tu cuenta ha sido bloqueada",
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error(
      "Error al verificar usuario:",
      error
    );

    return res.status(500).json({
      message:
        "Error al verificar la sesión",
    });
  }
};