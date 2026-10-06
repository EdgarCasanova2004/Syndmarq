import { Router } from "express";
import pool from "../db.js";
import { verifyToken } from "../middleware/auth.js";
import type { AuthRequest } from "../middleware/auth.js";

const router = Router();

router.get("/", verifyToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const result = await pool.query(
      `
        SELECT
          id,
          name,
          COALESCE(given_names, name) AS given_names,
          paternal_surname,
          maternal_surname,
          email,
          username,
          profession,
          bio,
          profile_image_url
        FROM users
        WHERE id = $1
      `,
      [userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener el perfil",
    });
  }
});

router.put("/", verifyToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const {
      name,
      givenNames,
      paternalSurname,
      maternalSurname,
      profession,
      bio,
      profileImageUrl,
    } = req.body ?? {};

    // Acepta llamadas antiguas que solo envían `name`.
    const hasStructuredName =
      typeof givenNames === "string" ||
      typeof paternalSurname === "string" ||
      typeof maternalSurname === "string";

    const cleanGivenNames = hasStructuredName
      ? typeof givenNames === "string"
        ? givenNames.trim()
        : ""
      : typeof name === "string"
        ? name.trim()
        : "";

    const cleanPaternalSurname =
      typeof paternalSurname === "string"
        ? paternalSurname.trim()
        : "";

    const cleanMaternalSurname =
      typeof maternalSurname === "string"
        ? maternalSurname.trim()
        : "";

    if (!cleanGivenNames) {
      return res.status(400).json({
        message: "El nombre o los nombres son obligatorios",
      });
    }

    const fullName = hasStructuredName
      ? [cleanGivenNames, cleanPaternalSurname, cleanMaternalSurname]
          .filter(Boolean)
          .join(" ")
      : cleanGivenNames;

    const result = await pool.query(
      `
        UPDATE users
        SET
          name = $1,
          given_names = $2,
          paternal_surname = $3,
          maternal_surname = $4,
          profession = $5,
          bio = $6,
          profile_image_url = $7
        WHERE id = $8
        RETURNING
          id,
          name,
          given_names,
          paternal_surname,
          maternal_surname,
          email,
          username,
          profession,
          bio,
          profile_image_url
      `,
      [
        fullName,
        cleanGivenNames,
        cleanPaternalSurname || null,
        cleanMaternalSurname || null,
        profession || null,
        bio || null,
        profileImageUrl || null,
        userId,
      ],
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

    return res.status(500).json({
      message: "Error al actualizar el perfil",
    });
  }
});

export default router;
