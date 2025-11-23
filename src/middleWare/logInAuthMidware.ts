import { Request, Response } from "express";
import { zoduserSignUp } from "../models/zodDataModel";
import { logInUser } from "../controllers/logINController";
import { createAndStoreTokens } from "../controllers/tokenController";

export const LogInAuthMidware = async (req: Request, res: Response) => {
  console.log(req.get("User-Agent"));
  const userIp = req.ip;

  const parseData = zoduserSignUp.safeParse(req.body);

  if (!parseData.success) {
    res.status(401).json({
      status: false,
    });
  } else {
    const response = await logInUser(parseData.data);

    if (!response.status) {
      res.status(401).json({
        status: false,
        err: "unsanitized credentials",
      });
    } else {
      // Access token and Refresh token
      const { refreshToken, accessToken, expiration } =
        await createAndStoreTokens(
          parseData.data.userEmail,
          //@ts-ignore
          response.userId,
          userIp,
          req.get("User-Agent")
        );

      res.cookie("DR_TAG_TOKEN", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: expiration,
      });
      res
        .status(200)
        .json({ status: true, accessToken: accessToken, dr_tag: refreshToken });
    }
  }
};
