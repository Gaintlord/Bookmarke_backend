import { Request, Response } from "express";
import { zoduserSignUp } from "../models/zodSignUpModel";
import { logInUser } from "../controllers/logINController";
import { createAccessToken, createRefreshToken } from "../utils/accesstoken";

export const LogInAuthMidware = async (req: Request, res: Response) => {
  const parseData = zoduserSignUp.safeParse(req.body);

  if (!parseData.success) {
    res.status(401).json({
      status: false,
    });
  } else {
    const response = await logInUser(parseData.data);
    if (!response) {
      res.status(401).json({
        status: false,
      });
    } else {
      // Access token and Refresh token
      const acessToken = await createAccessToken(parseData.data.userEmail);
      const refreshToken = await createRefreshToken(parseData.data.userEmail);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 14 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ status: false, accessToken: acessToken });
    }
  }
};
