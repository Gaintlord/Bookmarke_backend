import { Request, Response } from "express";
import { createAccessToken, verifyRefreshToken } from "../utils/accesstoken";
import { refreshTokenRotation } from "../controllers/refreshTokenController";

export const refreshTokRotate = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log(cookies);
  const verifiedRefToken = await verifyRefreshToken(cookies.refreshToken);

  //@ts-ignore

  if (verifiedRefToken.status) {
    //@ts-ignore
    if (verifiedToken.err == "expiredToken") {
      await refreshTokenRotation();
      return;
    } else {
      return res.status(401).json({ err: "Invalid Token" });
    }
  } else {
    console.log(verifiedRefToken);
    const newAccessToken = await createAccessToken(
      //@ts-ignore
      verifiedRefToken.email as string,
      //@ts-ignore
      verifiedRefToken.userId as string
    );
    console.log(newAccessToken);
    res
      .status(201)
      .header("N_AT", newAccessToken)
      .json({ accessToken: newAccessToken });
    return;
  }
};
