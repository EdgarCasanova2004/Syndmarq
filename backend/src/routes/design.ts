import { Router } from "express";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = Router();

const allowedThemes = [
  "default",
  "midnight",
  "aurora",
  "glass",
  "neo",
];

const getUserIdFromToken = (
  authorization?: string
) => {
  if (!authorization) {
    throw new Error("Token no proporcionado");
  }

  const parts = authorization.split(" ");

  if (
    parts.length !== 2 ||
    parts[0] !== "Bearer" ||
    !parts[1]
  ) {
    throw new Error("Token no proporcionado");
  }

  const decoded = jwt.verify(
    parts[1],
    process.env.JWT_SECRET as string
  ) as {
    id: number;
  };

  return decoded.id;
};

router.get("/", async (req, res) => {
  try {
    const userId = getUserIdFromToken(
      req.headers.authorization
    );

    const result = await pool.query(
      `
      SELECT theme
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      theme: result.rows[0].theme || "default",
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
});

router.put("/", async (req, res) => {
  try {
    const userId = getUserIdFromToken(
      req.headers.authorization
    );

    const { theme } = req.body;

    if (!theme) {
      return res.status(400).json({
        message: "Debes seleccionar un tema",
      });
    }

    if (!allowedThemes.includes(theme)) {
      return res.status(400).json({
        message: "Tema no válido",
      });
    }

    const result = await pool.query(
      `
      UPDATE users
      SET theme = $1
      WHERE id = $2
      RETURNING theme
      `,
      [theme, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      message: "Diseño actualizado correctamente",
      theme: result.rows[0].theme,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "No se pudo actualizar el diseño",
    });
  }
});

export default router;