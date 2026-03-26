import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env["JWT_SECRET"] || "fitboom_dev_secret_key_change_in_prod";
const REFRESH_SECRET = process.env["JWT_REFRESH_SECRET"] || "fitboom_refresh_secret_key_change_in_prod";

export interface JwtPayload {
  userId: number;
  phone: string;
  type?: "access" | "refresh";
}

export function signAccessToken(payload: Omit<JwtPayload, "type">): string {
  return jwt.sign({ ...payload, type: "access" }, ACCESS_SECRET, { expiresIn: "30d" });
}

export function signRefreshToken(payload: Omit<JwtPayload, "type">): string {
  return jwt.sign({ ...payload, type: "refresh" }, REFRESH_SECRET, { expiresIn: "90d" });
}

export function signTokenPair(payload: Omit<JwtPayload, "type">): { accessToken: string; refreshToken: string } {
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
}

export function signToken(payload: Omit<JwtPayload, "type">): string {
  return signAccessToken(payload);
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateTelegramCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
