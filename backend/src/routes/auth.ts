import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = Router();

router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message:
            "Correo y contraseña son obligatorios",
        });
      }

      const result =
        await pool.query(
          `
          SELECT
            id,
            name,
            email,
            username,
            password_hash,
            role,
            is_active
          FROM users
          WHERE email = $1
          `,
          [email.trim()]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(401).json({
          message:
            "Correo o contraseña incorrectos",
        });
      }

      const user =
        result.rows[0];

      const passwordIsValid =
        await bcrypt.compare(
          password,
          user.password_hash
        );

      if (!passwordIsValid) {
        return res.status(401).json({
          message:
            "Correo o contraseña incorrectos",
        });
      }

      if (!user.is_active) {
        return res.status(403).json({
          message:
            "Tu cuenta ha sido bloqueada",
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

      const token =
        jwt.sign(
          {
            id: user.id,
            email: user.email,
            username: user.username,
          },
          jwtSecret,
          {
            expiresIn: "1d",
          }
        );

      return res.json({
        message:
          "Inicio de sesión correcto",

        token,

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message:
          "Error interno del servidor",
      });
    }
  }
);

export default router;