import jwt, { TokenExpiredError } from "jsonwebtoken";

const accessJwtSecret = process.env.JWT_SECRET_A || "SherhiKehde";
const refreshJwtSecret = process.env.JWT_SECRET_R || "cheetahhiKehde";

export async function createAccessToken(
  email: string,
  userId: string
): Promise<string> {
  return jwt.sign({ email, userId }, accessJwtSecret, { expiresIn: "1h" });
}
export async function createRefreshToken(
  email: string,
  userId: string
): Promise<string> {
  return jwt.sign({ email, userId }, refreshJwtSecret, { expiresIn: "30d" });
}

export async function verifyAccesToken(token: string) {
  try {
    let decoded = jwt.verify(token, accessJwtSecret);
    return decoded;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return {
        status: true,
        err: "expiredToken",
      };
    } else {
      return {
        status: true,
        err: "invalidToken",
      };
    }
  }
}
export async function verifyRefreshToken(token: string) {
  try {
    const decoded = jwt.verify(token, refreshJwtSecret);
    return decoded;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return {
        status: true,
        err: "expiredToken",
      };
    } else {
      return {
        status: true,
        err: "invalidToken",
      };
    }
  }
}
export async function decodeRefreshToken(token: string) {
  const decoded = jwt.decode(token);
  return decoded;
}
