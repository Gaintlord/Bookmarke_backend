import { NextFunction, Request, RequestHandler, Response } from "express";
import { emailVerify } from "../models/zodSignUpModel";

export const redirectValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = emailVerify.safeParse(req.query);

  if (!data.success) {
    res.status(401).json({
      message: "Unsanitized Data query",
    });
  } else {
    next();
  }
};
