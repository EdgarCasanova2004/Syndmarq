import { Router } from "express";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = Router();

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
      SELECT
        id,
        title,
        url,
        icon,
        sort_order,
        is_active,
        created_at,
        updated_at
      FROM links
      WHERE user_id = $1
      ORDER BY sort_order ASC, created_at ASC
      `,
      [userId]
    );

    return res.json({
      links: result.rows,
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
      url,
      icon,
      isActive,
    } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "El título es obligatorio",
      });
    }

    if (!url || url.trim() === "") {
      return res.status(400).json({
        message: "La URL es obligatoria",
      });
    }

    const orderResult = await pool.query(
      `
      SELECT
        COALESCE(MAX(sort_order), 0) + 1 AS next_order
      FROM links
      WHERE user_id = $1
      `,
      [userId]
    );

    const nextOrder = Number(
      orderResult.rows[0].next_order
    );

    const result = await pool.query(
      `
      INSERT INTO links (
        user_id,
        title,
        url,
        icon,
        sort_order,
        is_active
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
      )
      RETURNING *
      `,
      [
        userId,
        title.trim(),
        url.trim(),
        icon?.trim() || null,
        nextOrder,
        isActive ?? true,
      ]
    );

    return res.status(201).json({
      message: "Enlace creado correctamente",
      link: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al crear el enlace",
    });
  }
});

router.put("/:id/order", async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = getUserIdFromToken(
      req.headers.authorization
    );

    const linkId = Number(req.params.id);

    const { direction } = req.body;

    if (
      direction !== "up" &&
      direction !== "down"
    ) {
      return res.status(400).json({
        message: "Dirección no válida",
      });
    }

    await client.query("BEGIN");

    const linksResult = await client.query(
      `
      SELECT
        id,
        sort_order
      FROM links
      WHERE user_id = $1
      ORDER BY sort_order ASC, created_at ASC
      `,
      [userId]
    );

    const userLinks = linksResult.rows;

    const currentIndex = userLinks.findIndex(
      (link) =>
        Number(link.id) === linkId
    );

    if (currentIndex === -1) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Enlace no encontrado",
      });
    }

    const targetIndex =
      direction === "up"
        ? currentIndex - 1
        : currentIndex + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= userLinks.length
    ) {
      await client.query("ROLLBACK");

      return res.json({
        message:
          "El enlace ya está en esa posición",
      });
    }

    const reordered = [...userLinks];

    const temp =
      reordered[currentIndex];

    reordered[currentIndex] =
      reordered[targetIndex];

    reordered[targetIndex] =
      temp;

    for (
      let i = 0;
      i < reordered.length;
      i++
    ) {
      await client.query(
        `
        UPDATE links
        SET
          sort_order = $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
          AND user_id = $3
        `,
        [
          i + 1,
          reordered[i].id,
          userId,
        ]
      );
    }

    await client.query("COMMIT");

    return res.json({
      message:
        "Orden actualizado correctamente",
    });
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch {
    }

    console.error(error);

    return res.status(500).json({
      message:
        "No se pudo actualizar el orden",
    });
  } finally {
    client.release();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = getUserIdFromToken(
      req.headers.authorization
    );

    const linkId = Number(req.params.id);

    const {
      title,
      url,
      icon,
      isActive,
    } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "El título es obligatorio",
      });
    }

    if (!url || url.trim() === "") {
      return res.status(400).json({
        message: "La URL es obligatoria",
      });
    }

    const result = await pool.query(
      `
      UPDATE links
      SET
        title = $1,
        url = $2,
        icon = $3,
        is_active = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
        AND user_id = $6
      RETURNING *
      `,
      [
        title.trim(),
        url.trim(),
        icon?.trim() || null,
        isActive ?? true,
        linkId,
        userId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Enlace no encontrado",
      });
    }

    return res.json({
      message:
        "Enlace actualizado correctamente",
      link: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "No se pudo actualizar el enlace",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = getUserIdFromToken(
      req.headers.authorization
    );

    const linkId = Number(req.params.id);

    await client.query("BEGIN");

    const result = await client.query(
      `
      DELETE FROM links
      WHERE id = $1
        AND user_id = $2
      RETURNING id
      `,
      [
        linkId,
        userId,
      ]
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Enlace no encontrado",
      });
    }

    const remainingLinks =
      await client.query(
        `
        SELECT id
        FROM links
        WHERE user_id = $1
        ORDER BY sort_order ASC, created_at ASC
        `,
        [userId]
      );

    for (
      let i = 0;
      i < remainingLinks.rows.length;
      i++
    ) {
      await client.query(
        `
        UPDATE links
        SET
          sort_order = $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
          AND user_id = $3
        `,
        [
          i + 1,
          remainingLinks.rows[i].id,
          userId,
        ]
      );
    }

    await client.query("COMMIT");

    return res.json({
      message:
        "Enlace eliminado correctamente",
    });
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch {
    }

    console.error(error);

    return res.status(500).json({
      message:
        "No se pudo eliminar el enlace",
    });
  } finally {
    client.release();
  }
});

export default router;