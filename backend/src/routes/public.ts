import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const userResult = await pool.query(
      `
      SELECT
        id,
        name,
        username,
        profession,
        bio,
        theme,
        profile_image_url,
        is_active
      FROM users
      WHERE username = $1
      `,
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "Portafolio no encontrado",
      });
    }

    const user = userResult.rows[0];

    if (!user.is_active) {
      return res.status(404).json({
        message:
          "Este portafolio no se encuentra disponible actualmente",
      });
    }

    const projectsResult = await pool.query(
      `
      SELECT
        p.id,
        p.title,
        p.description,
        p.image_url,
        p.project_url,
        p.is_featured,
        p.sort_order,
        c.name AS category_name
      FROM projects p
      LEFT JOIN categories c
        ON p.category_id = c.id
      WHERE
        p.user_id = $1
        AND p.is_active = TRUE
      ORDER BY
        p.is_featured DESC,
        p.sort_order ASC,
        p.created_at DESC
      `,
      [user.id]
    );

    const linksResult = await pool.query(
      `
      SELECT
        id,
        title,
        url,
        icon,
        sort_order
      FROM links
      WHERE
        user_id = $1
        AND is_active = TRUE
      ORDER BY
        sort_order ASC,
        created_at ASC
      `,
      [user.id]
    );

    return res.json({
      user: {
        name: user.name,
        username: user.username,
        profession: user.profession,
        bio: user.bio,
        theme: user.theme || "default",
        profile_image_url:
          user.profile_image_url,
      },
      projects:
        projectsResult.rows,
      links:
        linksResult.rows,
    });
  } catch (error) {
    console.error(
      "Error al cargar portafolio público:",
      error
    );

    return res.status(500).json({
      message:
        "Error al cargar el portafolio público",
    });
  }
});

router.post(
  "/:username/visit",
  async (req, res) => {
    try {
      const { username } =
        req.params;

      const userResult =
        await pool.query(
          `
          SELECT
            id,
            is_active
          FROM users
          WHERE username = $1
          `,
          [username]
        );

      if (
        userResult.rows.length ===
        0
      ) {
        return res.status(404).json({
          message:
            "Portafolio no encontrado",
        });
      }

      const user =
        userResult.rows[0];

      if (!user.is_active) {
        return res.status(404).json({
          message:
            "Este portafolio no se encuentra disponible actualmente",
        });
      }

      await pool.query(
        `
        INSERT INTO portfolio_visits (
          user_id
        )
        VALUES ($1)
        `,
        [user.id]
      );

      return res.status(201).json({
        message:
          "Visita registrada correctamente",
      });
    } catch (error) {
      console.error(
        "Error al registrar visita:",
        error
      );

      return res.status(500).json({
        message:
          "Error al registrar la visita",
      });
    }
  }
);

export default router;