import { Router, Request, Response } from "express";
import { registerSchema, loginSchema } from "../schemas/authSchema";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../services/authService";
import db from "../db/database";
import { ZodError } from "zod";

interface ZodIssue {
  message: string;
}

const router = Router();

interface UserRow {
  id: number;
  username: string;
  password_hash: string;
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 24 * 60 * 60 * 1000, // 24 horas
  path: "/",
};

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = registerSchema.parse(req.body);

    const existingUser = db
      .prepare("SELECT id FROM users WHERE username = ?")
      .get(username) as UserRow | undefined;

    if (existingUser) {
      res.status(409).json({
        error: "El nombre de usuario ya está registrado",
      });
      return;
    }

    const passwordHash = await hashPassword(password);

    const result = db
      .prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)")
      .run(username, passwordHash);

    const token = generateToken(
      result.lastInsertRowid as number,
      username
    );

    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: { id: result.lastInsertRowid, username },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: "Datos de registro inválidos",
        details: (error.issues as ZodIssue[]).map((issue) => issue.message),
      });
      return;
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const user = db
      .prepare("SELECT id, username, password_hash FROM users WHERE username = ?")
      .get(username) as UserRow | undefined;

    if (!user) {
      res.status(401).json({
        error: "Nombre de usuario o contraseña incorrectos",
      });
      return;
    }

    const isValid = await comparePassword(password, user.password_hash);

    if (!isValid) {
      res.status(401).json({
        error: "Nombre de usuario o contraseña incorrectos",
      });
      return;
    }

    const token = generateToken(user.id, user.username);

    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({
      message: "Inicio de sesión exitoso",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: "Datos de inicio de sesión inválidos",
        details: (error.issues as ZodIssue[]).map((issue) => issue.message),
      });
      return;
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/logout", (_req: Request, res: Response): void => {
  res.clearCookie("token", { path: "/" });
  res.json({ message: "Sesión cerrada correctamente" });
});

export default router;
