import type {
  NextFunction,
  Request,
  Response,
} from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest
  extends Request {
  user?: {
    id: number;
    email?: string;
    username?: string;
  };
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
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

    const decoded =
      jwt.verify(
        token,
        jwtSecret
      );

    if (
      typeof decoded === "string" ||
      typeof decoded.id !== "number"
    ) {
      return res.status(401).json({
        message:
          "Token inválido",
      });
    }

    req.user = {
      id: decoded.id,

      ...(typeof decoded.email ===
      "string"
        ? {
            email:
              decoded.email,
          }
        : {}),

      ...(typeof decoded.username ===
      "string"
        ? {
            username:
              decoded.username,
          }
        : {}),
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message:
        "Token inválido o expirado",
    });
  }
};