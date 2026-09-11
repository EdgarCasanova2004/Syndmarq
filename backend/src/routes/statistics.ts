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

    const totalResult = await pool.query(
      `
      SELECT COUNT(*)::int AS total
      FROM portfolio_visits
      WHERE user_id = $1
      `,
      [userId]
    );

    const todayResult = await pool.query(
      `
      SELECT COUNT(*)::int AS total
      FROM portfolio_visits
      WHERE
        user_id = $1
        AND visited_at::date = CURRENT_DATE
      `,
      [userId]
    );

    const last7DaysResult = await pool.query(
      `
      SELECT
        TO_CHAR(
          days.date,
          'YYYY-MM-DD'
        ) AS date,
        COUNT(
          portfolio_visits.id
        )::int AS visits
      FROM generate_series(
        CURRENT_DATE - INTERVAL '6 days',
        CURRENT_DATE,
        INTERVAL '1 day'
      ) AS days(date)
      LEFT JOIN portfolio_visits
        ON portfolio_visits.user_id = $1
        AND portfolio_visits.visited_at::date =
          days.date::date
      GROUP BY days.date
      ORDER BY days.date ASC
      `,
      [userId]
    );

    return res.json({
      totalVisits:
        totalResult.rows[0].total,

      todayVisits:
        todayResult.rows[0].total,

      last7Days:
        last7DaysResult.rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message:
        "Token inválido o expirado",
    });
  }
});

export default router;