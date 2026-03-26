import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/auth";

export interface AuthenticatedRequest extends Request {
  userId?: number;
  userPhone?: string;
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Autentifikatsiya talab qilinadi" });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    req.userPhone = payload.phone;
    next();
  } catch {
    res.status(401).json({ message: "Token yaroqsiz yoki muddati o'tgan" });
  }
}
