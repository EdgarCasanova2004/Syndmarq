import { Router } from "express";
import bcrypt from "bcrypt";
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
            username
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
          "Error al obtener la configuración de la cuenta",
      });
    }
  }
);

router.put(
  "/account",
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
        email,
        username,
      } = req.body;

      if (
        !name ||
        !email ||
        !username
      ) {
        return res.status(400).json({
          message:
            "Todos los campos son obligatorios",
        });
      }

      const cleanName =
        name.trim();

      const cleanEmail =
        email.trim();

      const cleanUsername =
        username.trim();

      if (
        !cleanName ||
        !cleanEmail ||
        !cleanUsername
      ) {
        return res.status(400).json({
          message:
            "Todos los campos son obligatorios",
        });
      }

      const emailExists =
        await pool.query(
          `
          SELECT id
          FROM users
          WHERE
            email = $1
            AND id <> $2
          `,
          [
            cleanEmail,
            userId,
          ]
        );

      if (
        emailExists.rows.length > 0
      ) {
        return res.status(409).json({
          message:
            "El correo ya está registrado",
        });
      }

      const usernameExists =
        await pool.query(
          `
          SELECT id
          FROM users
          WHERE
            username = $1
            AND id <> $2
          `,
          [
            cleanUsername,
            userId,
          ]
        );

      if (
        usernameExists.rows.length >
        0
      ) {
        return res.status(409).json({
          message:
            "El nombre de usuario ya está en uso",
        });
      }

      const result =
        await pool.query(
          `
          UPDATE users
          SET
            name = $1,
            email = $2,
            username = $3
          WHERE id = $4
          RETURNING
            id,
            name,
            email,
            username
          `,
          [
            cleanName,
            cleanEmail,
            cleanUsername,
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
          "Cuenta actualizada correctamente",
        user: result.rows[0],
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message:
          "Error al actualizar la cuenta",
      });
    }
  }
);

router.put(
  "/password",
  verifyToken,
  async (
    req: AuthRequest,
    res
  ) => {
    try {
      const userId =
        req.user!.id;

      const {
        currentPassword,
        newPassword,
      } = req.body;

      if (
        !currentPassword ||
        !newPassword
      ) {
        return res.status(400).json({
          message:
            "Debes completar ambos campos",
        });
      }

      if (
        newPassword.length < 8
      ) {
        return res.status(400).json({
          message:
            "La nueva contraseña debe tener al menos 8 caracteres",
        });
      }

      const result =
        await pool.query(
          `
          SELECT password_hash
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

      const passwordMatches =
        await bcrypt.compare(
          currentPassword,
          result.rows[0]
            .password_hash
        );

      if (!passwordMatches) {
        return res.status(400).json({
          message:
            "La contraseña actual es incorrecta",
        });
      }

      const newPasswordHash =
        await bcrypt.hash(
          newPassword,
          10
        );

      await pool.query(
        `
        UPDATE users
        SET password_hash = $1
        WHERE id = $2
        `,
        [
          newPasswordHash,
          userId,
        ]
      );

      return res.json({
        message:
          "Contraseña actualizada correctamente",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message:
          "Error al actualizar la contraseña",
      });
    }
  }
);

export default router;