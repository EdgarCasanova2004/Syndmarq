import { Router } from "express";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token no proporcionado",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      id: number;
      email: string;
      username: string;
    };

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        username,
        profession,
        bio,
        profile_image_url
      FROM users
      WHERE id = $1
      `,
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      user: result.rows[0],
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
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token no proporcionado",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      id: number;
      email: string;
      username: string;
    };

    const {
      name,
      profession,
      bio,
      profileImageUrl,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "El nombre es obligatorio",
      });
    }

    const result = await pool.query(
      `
      UPDATE users
      SET
        name = $1,
        profession = $2,
        bio = $3,
        profile_image_url = $4
      WHERE id = $5
      RETURNING
        id,
        name,
        email,
        username,
        profession,
        bio,
        profile_image_url
      `,
      [
        name,
        profession || null,
        bio || null,
        profileImageUrl || null,
        decoded.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      message: "Perfil actualizado correctamente",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
});

export default router;