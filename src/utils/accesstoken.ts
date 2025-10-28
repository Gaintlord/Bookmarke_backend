import jwt from "jsonwebtoken";

const accessJwtSecret = process.env.JWT_SECRET_A || "SherhiKehde";
const refreshJwtSecret = process.env.JWT_SECRET_R || "cheetahhiKehde";

export async function createAccessToken(email: string): Promise<string> {
  return jwt.sign({ email }, accessJwtSecret, { expiresIn: "15m" });
}
export async function createRefreshToken(email: string): Promise<string> {
  return jwt.sign({ email }, refreshJwtSecret, { expiresIn: "15d" });
}
