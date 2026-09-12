import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  verifyToken,
} from "../middleware/auth.js";
import type {
  AuthRequest,
} from "../middleware/auth.js";

const router = Router();

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const uploadPath =
  path.join(
    __dirname,
    "../../uploads"
  );

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

const storage =
  multer.diskStorage({
    destination: (
      _req,
      _file,
      cb
    ) => {
      cb(null, uploadPath);
    },

    filename: (
      _req,
      file,
      cb
    ) => {
      const extension =
        path.extname(
          file.originalname
        ).toLowerCase();

      const uniqueName =
        `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${extension}`;

      cb(null, uniqueName);
    },
  });

const fileFilter:
  multer.Options["fileFilter"] = (
    _req,
    file,
    cb
  ) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      allowedTypes.includes(
        file.mimetype
      )
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Formato de imagen no permitido"
        )
      );
    }
  };

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize:
      5 * 1024 * 1024,
  },
});

router.post(
  "/image",
  verifyToken,
  upload.single("image"),
  (
    req: AuthRequest,
    res
  ) => {
    if (!req.file) {
      return res.status(400).json({
        message:
          "No se recibió ninguna imagen",
      });
    }

    const imageUrl =
      `${req.protocol}://${req.get(
        "host"
      )}/uploads/${req.file.filename}`;

    return res.status(201).json({
      message:
        "Imagen subida correctamente",
      imageUrl,
    });
  }
);

export default router;