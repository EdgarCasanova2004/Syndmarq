import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db.js";

const router = Router();

const getUserIdFromToken = (
  authorization?: string
) => {
  if (!authorization) {
    throw new Error("Token no proporcionado");
  }

  const parts =
    authorization.split(" ");

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
    const userId =
      getUserIdFromToken(
        req.headers.authorization
      );

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
      return res
        .status(404)
        .json({
          message:
            "Usuario no encontrado",
        });
    }

    return res.json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res
      .status(401)
      .json({
        message:
          "Token inválido o expirado",
      });
  }
});

router.put(
  "/account",
  async (req, res) => {
    try {
      const userId =
        getUserIdFromToken(
          req.headers.authorization
        );

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
        return res
          .status(400)
          .json({
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
          [email, userId]
        );

      if (
        emailExists.rows.length > 0
      ) {
        return res
          .status(409)
          .json({
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
          [username, userId]
        );

      if (
        usernameExists.rows.length >
        0
      ) {
        return res
          .status(409)
          .json({
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
            name,
            email,
            username,
            userId,
          ]
        );

      return res.json({
        message:
          "Cuenta actualizada correctamente",
        user: result.rows[0],
      });
    } catch (error) {
      console.error(error);

      return res
        .status(401)
        .json({
          message:
            "Token inválido o expirado",
        });
    }
  }
);

router.put(
  "/password",
  async (req, res) => {
    try {
      const userId =
        getUserIdFromToken(
          req.headers.authorization
        );

      const {
        currentPassword,
        newPassword,
      } = req.body;

      if (
        !currentPassword ||
        !newPassword
      ) {
        return res
          .status(400)
          .json({
            message:
              "Debes completar ambos campos",
          });
      }

      if (
        newPassword.length < 8
      ) {
        return res
          .status(400)
          .json({
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
        return res
          .status(404)
          .json({
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
        return res
          .status(400)
          .json({
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

      return res
        .status(401)
        .json({
          message:
            "Token inválido o expirado",
        });
    }
  }
);

export default router;