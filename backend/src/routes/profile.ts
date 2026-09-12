import { Router } from "express";
import pool from "../db.js";
import {
  verifyToken,
} from "../middleware/auth.js";
import type {
  AuthRequest,
} from "../middleware/auth.js";

const router = Router();

router.get(
  "/",
  verifyToken,
  async (
    req: AuthRequest,
    res
  ) => {
    try {
      const userId =
        req.user!.id;

      const result =
        await pool.query(
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
          [userId]
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
        user: result.rows[0],
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message:
          "Error al obtener el perfil",
      });
    }
  }
);

router.put(
  "/",
  verifyToken,
  async (
    req: AuthRequest,
    res
  ) => {
    try {
      const userId =
        req.user!.id;

      const {
        name,
        profession,
        bio,
        profileImageUrl,
      } = req.body;

      if (
        !name ||
        name.trim() === ""
      ) {
        return res.status(400).json({
          message:
            "El nombre es obligatorio",
        });
      }

      const result =
        await pool.query(
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
            name.trim(),
            profession || null,
            bio || null,
            profileImageUrl || null,
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
          "Perfil actualizado correctamente",
        user: result.rows[0],
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message:
          "Error al actualizar el perfil",
      });
    }
  }
);

export default router;