import { refreshTokenTable } from "../models/dbSchemas";
import { createAccessToken, createRefreshToken } from "../utils/accesstoken";
import { db } from "../utils/dataBaseUtil";
import { HashFunction } from "../utils/hashingUtil";
export const createAndStoreTokens = async (
  email: string,
  id: number,
  userIp: string,
  userAgent: string
) => {
  const refreshToken = await createRefreshToken(email, id.toString());
  const accessToken = await createAccessToken(email, id.toString());

  const hashedToken = await HashFunction(refreshToken);

  const expiration = 30 * 24 * 60 * 60 * 1000;
  await db.insert(refreshTokenTable).values({
    userId: id,
    tokenHash: hashedToken,
    userAgent: userAgent,
    ipAddress: userIp,
    expiresAt: new Date(Date.now() + expiration),
  });

  return { refreshToken, accessToken, expiration };
};
