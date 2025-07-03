import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./config";

export function signJwt(payload: object): string {
  if (!JWT_SECRET_KEY) {
    throw new Error("エンドポイントエラー");
}
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });
}