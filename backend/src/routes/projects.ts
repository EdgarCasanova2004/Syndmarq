import { Router } from "express";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = Router();

const getUserIdFromToken = (authorization?: string) => {
  if (!authorization) {
    throw new Error("Token no proporcionado");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new Error("Token no proporcionado");
  }

  const decoded = jwt.verify(
    token,
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
      SELECT
        p.id,
        p.title,
        p.description,
        p.category_id,
        c.name AS category_name,
        p.image_url,
        p.project_url,
        p.is_featured,
        p.is_active,
        p.sort_order,
        p.created_at,
        p.updated_at
      FROM projects p
      LEFT JOIN categories c
        ON p.category_id = c.id
      WHERE p.user_id = $1
      ORDER BY p.sort_order ASC, p.created_at DESC
      `,
      [userId]
    );

    return res.json({
      projects: result.rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const userId = getUserIdFromToken(
      req.headers.authorization
    );

    const {
      title,
      description,
      categoryId,
      imageUrl,
      projectUrl,
      isFeatured,
      isActive,
    } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "El título es obligatorio",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO projects (
        user_id,
        title,
        description,
        category_id,
        image_url,
        project_url,
        is_featured,
        is_active
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        userId,
        title.trim(),
        description || null,
        categoryId || null,
        imageUrl || null,
        projectUrl || null,
        isFeatured || false,
        isActive ?? true,
      ]
    );

    return res.status(201).json({
      message: "Proyecto creado correctamente",
      project: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = getUserIdFromToken(
      req.headers.authorization
    );

    const projectId = Number(req.params.id);

    const {
      title,
      description,
      categoryId,
      imageUrl,
      projectUrl,
      isFeatured,
      isActive,
    } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "El título es obligatorio",
      });
    }

    const result = await pool.query(
      `
      UPDATE projects
      SET
        title = $1,
        description = $2,
        category_id = $3,
        image_url = $4,
        project_url = $5,
        is_featured = $6,
        is_active = $7,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
        AND user_id = $9
      RETURNING *
      `,
      [
        title.trim(),
        description || null,
        categoryId || null,
        imageUrl || null,
        projectUrl || null,
        isFeatured || false,
        isActive ?? true,
        projectId,
        userId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Proyecto no encontrado",
      });
    }

    return res.json({
      message: "Proyecto actualizado correctamente",
      project: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = getUserIdFromToken(
      req.headers.authorization
    );

    const projectId = Number(req.params.id);

    const result = await pool.query(
      `
      DELETE FROM projects
      WHERE id = $1
        AND user_id = $2
      RETURNING id
      `,
      [projectId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Proyecto no encontrado",
      });
    }

    return res.json({
      message: "Proyecto eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
});

router.get("/categories/list", async (_req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT id, name
      FROM categories
      WHERE status = TRUE
      ORDER BY name ASC
      `
    );

    return res.json({
      categories: result.rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener las categorías",
    });
  }
});

export default router;