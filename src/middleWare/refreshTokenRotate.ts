import { Request, Response } from "express";
import {
  createAccessToken,
  decodeRefreshToken,
  verifyRefreshToken,
} from "../utils/accesstoken";
import { refreshTokenRotation } from "../controllers/refreshTokenController";

export const refreshTokRotate = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log("### at refresh token ###");

  const verifiedRefToken = await verifyRefreshToken(cookies.DR_TAG_TOKEN);

  //@ts-ignore

  if (verifiedRefToken.status) {
    //@ts-ignore
    if (verifiedToken.err == "expiredToken") {
      //@ts-ignore
      let { email, userId } = await decodeRefreshToken(cookies.DR_TAG_TOKEN);

      console.log(email);
      console.log(userId);

      await refreshTokenRotation(
        cookies.DR_TAG_TOKEN,
        req.ip || "unkown",
        req.get("User-Agent") || "unknown",
        email,
        userId
      );
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
    res
      .status(201)
      .header("N_AT", newAccessToken)
      .json({ accessToken: newAccessToken });
    return;
  }
};
