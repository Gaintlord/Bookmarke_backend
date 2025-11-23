import { NextFunction, Request, Response } from "express";
import { verifyAccesToken } from "../utils/accesstoken";
// import cookieParser from "cookie-parser";

export const userReqAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const headerPayload = req.headers["authorization"];
  if (!headerPayload) {
    return res.status(401).json({ err: "Missing Header" });
  }
  if (!headerPayload?.startsWith("Bearer")) {
    return res.status(401).json({ err: "Missing Header" });
  }
  const accessToken = headerPayload?.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ err: "Missing Token" });
  }
  console.log(accessToken);

  const verifiedToken: any = await verifyAccesToken(accessToken);

  console.log(verifiedToken);

  if (verifiedToken.status) {
    console.log(verifiedToken.err);
    if (verifiedToken.err === "expiredToken") {
      return res.status(200).header("AC_ERR", "YL203").json({ err: "YL203" });
    } else {
      return res.status(401).json({ err: "Invalid Token" });
    }
  }
  //@ts-ignore
  req.body = req.body;
  //@ts-ignore
  req.userid = verifiedToken.userId;
  next();
};
