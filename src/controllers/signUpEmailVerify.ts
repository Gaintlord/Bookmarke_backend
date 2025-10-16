import { eq } from "drizzle-orm";
import { userTableDB } from "../models/dbSchemas";
import { db } from "../utils/dataBaseUtil";
import { otpFormater } from "../utils/oneTimePassGen";
import { Request, Response, RequestHandler } from "express";
import { emailSender } from "../utils/EmailSender";
import { deleteOtpFromTable } from "./userTablePatch";

// create and add add otp to data base
export const signUpOtpGen = async (userEmail: string) => {
  const otpString = otpFormater();

  await db
    .update(userTableDB)
    .set({ otp: otpString.dbString })
    .where(eq(userTableDB.userEmail, userEmail));

  // console.log("OTP generated");
  // sending email to client

  emailSender(otpString.otp, userEmail);
};

export const redirectEmailVerify: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { userEmail, otp } = req.query;

  //  selecting the email and getting the otp
  const data = await db
    .select({ otp: userTableDB.otp })
    .from(userTableDB)
    //@ts-ignore
    .where(eq(userTableDB.userEmail, userEmail));
  // console.log(data);
  // if OTP exist move forward
  if (data.length != 0) {
    const otpCheck = data[0].otp?.split("+");
    // console.log(`### ${otpCheck} ###`);
    // otp matching
    //@ts-ignore
    if (otpCheck === undefined) {
      res.status(400).json({
        status:false,
        message: "user already verified",
      });
    } else if (otpCheck[0] != otp) {
      res.status(400).json({
        status:false,
        message: "Invalid Otp",
      });
    } else {
      // verifying expiry
      //@ts-ignore
      const expTime = Number(otpCheck[1]) + 21 * 60 * 1000;
      console.log(expTime);
      const now = new Date();
      console.log(now);
      // console.log(new Date(expTime));
      // console.log(now);
      if (Number(now) < expTime) {
        // console.log("otp verified");
        //@ts-ignore
        await deleteOtpFromTable(userEmail);
        res.status(200).json({
        status:true,
          message: "otp has been verified",
        });
      } else {
        // console.log("otp expired");
        res.status(400).json({
                  status:false,
          message: "otp has expired",
        });
      }
    }
  } else {
    res.status(500).json({
        status:false,
      message: "user Does not exist",
    });
  }
};
