import { NextFunction, Request, Response } from "express";
import { zoduserSignUp } from "../models/zodDataModel";
import { HashFunction } from "../utils/hashingUtil";
import { signUpUser } from "../controllers/SignUpController";

export const signUpauthMidWare = async (req: Request, res: Response) => {
  const parseData = zoduserSignUp.safeParse(req.body);

  //     IF WRONG INPUT
  if (!parseData.success) {
    res.status(400).json({
      status: false,
    });
  }
  //    FOR RIGHT INPUT
  else {
    const hashedPassword = await HashFunction(parseData.data.userPassword);
    const validatedData = {
      userEmail: parseData.data.userEmail,
      userPassword: hashedPassword,
    };
    // add user to database email pass and time
    const response = await signUpUser(validatedData);
    if (response.detail.status) {
      //@ts-ignore
      res.status(response.statusCode).json(response.detail);
    } else {
      res.status(response.statusCode).json(response.detail);
    }
  }
};
