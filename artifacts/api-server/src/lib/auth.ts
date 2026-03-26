import jwt from "jsonwebtoken";

const JWT_SECRET = process.env["JWT_SECRET"] || "fitboom_dev_secret_key_change_in_prod";
const JWT_EXPIRES_IN = "30d";

export interface JwtPayload {
  userId: number;
  phone: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
