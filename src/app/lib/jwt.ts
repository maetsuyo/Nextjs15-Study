import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./config";

export function signJwt(payload: object): string {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });
}