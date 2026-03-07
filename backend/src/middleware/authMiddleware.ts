import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "../services/authService";

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.cookies?.token as string | undefined;

  if (!token) {
    res.status(401).json({ error: "No se proporcionó token de autenticación" });
    return;
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}
