import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import projectRoutes from "./routes/projects.js";
import linkRoutes from "./routes/links.js";
import publicRoutes from "./routes/public.js";
import designRoutes from "./routes/design.js";
import statisticsRoutes from "./routes/statistics.js";
import settingsRoutes from "./routes/settings.js";

dotenv.config();

const app = express();

const PORT =
  process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/links",
  linkRoutes
);

app.use(
  "/api/public",
  publicRoutes
);

app.use(
  "/api/design",
  designRoutes
);

app.use(
  "/api/statistics",
  statisticsRoutes
);

app.use(
  "/api/settings",
  settingsRoutes
);

app.get("/", (_req, res) => {
  res.json({
    message:
      "API de Syndmarq funcionando",
  });
});

app.get(
  "/api/test-db",
  async (_req, res) => {
    try {
      const result =
        await pool.query(
          "SELECT NOW()"
        );

      res.json({
        message:
          "Conexión con PostgreSQL exitosa",
        fecha:
          result.rows[0].now,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Error al conectar con PostgreSQL",
      });
    }
  }
);

app.listen(
  PORT,
  () => {
    console.log(
      `Servidor ejecutándose en http://localhost:${PORT}`
    );
  }
);