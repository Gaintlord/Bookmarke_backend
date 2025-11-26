import { eq } from "drizzle-orm";
import { refreshTokenTable } from "../models/dbSchemas";
import { db } from "../utils/dataBaseUtil";
import { HashFunction } from "../utils/hashingUtil";
import { createRefreshToken } from "../utils/accesstoken";
import { refreshTokenExp } from "../utils/expirationManager";

export const refreshTokenRotation = async (
  oldRefToken: string,
  userIp: string,
  userAgent: string,
  email: string,
  userId: string
) => {
  const oldtoken = await HashFunction(oldRefToken);
  const newRefToken = await createRefreshToken(email, userId);
  const newHashToken = await HashFunction(newRefToken);
  const userID = parseInt(userId);
  db.transaction(async (tx) => {
    await tx
      .update(refreshTokenTable)
      .set({ revoked: true })
      .where(eq(refreshTokenTable.tokenHash, oldtoken));

    await tx.insert(refreshTokenTable).values({
      userId: userID,
      tokenHash: newHashToken,
      userAgent: userAgent,
      ipAddress: userIp,
      expiresAt: new Date(Date.now() + refreshTokenExp),
    });
  });
};
export const revokeOldAndAddNewRefToken = async (
  userIp: string,
  userAgent: string,
  userId: number,
  newRefToken: string
) => {
  const newHashToken = await HashFunction(newRefToken);

  db.transaction(async (tx) => {
    await tx
      .update(refreshTokenTable)
      .set({ revoked: true })
      .where(eq(refreshTokenTable.ipAddress, userIp));

    await tx.insert(refreshTokenTable).values({
      userId: userId,
      tokenHash: newHashToken,
      userAgent: userAgent,
      ipAddress: userIp,
      expiresAt: new Date(Date.now() + refreshTokenExp),
    });
  });
};
