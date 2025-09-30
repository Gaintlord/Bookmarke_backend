import { NextFunction, Request, Response } from "express";
import { zoduserSignUp } from "../models/zodSignUpModel";
import { HashFunction } from "../utils/hashingUtil";
import { signUpUser } from "../controllers/SignUpController";
import { signUpOtpGen } from "../controllers/signUpEmailVerify";

export const signUpauthMidWare = async (req: Request, res: Response) => {
  const parseData = zoduserSignUp.safeParse(req.body);

  //     IF WRONG INPUT
  if (!parseData.success) {
    const errors = parseData.error.issues.map((i) => ({
      code: i.code,
      path: i.path.join("."),
      message: i.message,
    }));
    res.status(400).json({
      status: false,
      errors,
    });
  }
  //    FOR RIGHT INPUT
  else {
    const hashedPassword = await HashFunction(parseData.data.userPassword);
    const validatedData = {
      userEmail: parseData.data.userEmail,
      userPassword: hashedPassword,
    };
    const response = await signUpUser(validatedData);
    if (response.status) {
      res.status(response.detail.statusCode).json(response.status);
      //@ts-ignore
      await signUpOtpGen(response.userEmail);
    } else {
      res.status(response.detail.statusCode).json(response.detail.message);
    }
  }
};
