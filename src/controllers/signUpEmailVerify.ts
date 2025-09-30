import { eq } from "drizzle-orm";
import { userTableDB } from "../models/dbSchemas";
import { db } from "../utils/dataBaseUtil";
import { otpFormater } from "../utils/oneTimePassGen";
import { Request, Response, RequestHandler } from "express";

export const signUpOtpGen = async (userEmail: string) => {
  console.log("######control reach here#####");
  const otpString = otpFormater();

  await db
    .update(userTableDB)
    .set({ otp: otpString })
    .where(eq(userTableDB.userEmail, userEmail));

  console.log("OTP generated");
};

export const redirectEmailVerify: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { userEmail, otp } = req.query;

  const data = await db
    .select({ otp: userTableDB.otp })
    .from(userTableDB)
    //@ts-ignore
    .where(eq(userTableDB.userEmail, userEmail));

  if (data.length != 0) {
    const otpCheck = data[0].otp?.split("+");
    console.log(otpCheck);
    //@ts-ignore
    if (otpCheck[0] != otp) {
      res.status(400).json({
        message: "Invalid Otp",
      });
    } else {
      //@ts-ignore
      const expTime = Number(otpCheck[1]) + 21 * 60 * 1000;
      const now = new Date();
      // console.log(new Date(expTime));
      // console.log(now);
      if (expTime > Number(now)) {
        // console.log("otp verified");
        res.status(200).json({
          message: "otp has been verified",
        });
      } else {
        // console.log("otp expired");
        res.status(400).json({
          message: "otp has expired",
        });
      }
    }
  } else {
    res.status(500).json({
      message: "user Does not exist",
    });
  }
};
