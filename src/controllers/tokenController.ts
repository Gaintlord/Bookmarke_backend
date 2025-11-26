import { refreshTokenTable } from "../models/dbSchemas";
import { createAccessToken, createRefreshToken } from "../utils/accesstoken";
import { db } from "../utils/dataBaseUtil";
import { refreshTokenExp } from "../utils/expirationManager";
import { HashFunction } from "../utils/hashingUtil";
import { revokeOldAndAddNewRefToken } from "./refreshTokenController";
export const createAndStoreTokens = async (
  email: string,
  id: number,
  userIp: string,
  userAgent: string
) => {
  const refreshToken = await createRefreshToken(email, id.toString());
  const accessToken = await createAccessToken(email, id.toString());

  revokeOldAndAddNewRefToken(userIp, userAgent, id, refreshToken);

  return { refreshToken, accessToken };
};
