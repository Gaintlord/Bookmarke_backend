import { eq } from "drizzle-orm";
import { userTableDB } from "../models/dbSchemas";
import { db } from "../utils/dataBaseUtil";
import { responseMessage } from "../types/tsTypes";
import { otpFormater } from "../utils/oneTimePassGen";
import { emailSender } from "../utils/EmailSender";

export const signUpUser = async (validatedData: {
  userEmail: string;
  userPassword: string;
}): Promise<responseMessage> => {
  let otp = otpFormater();
  try {
    await db.insert(userTableDB).values({
      userEmail: validatedData.userEmail,
      userPassword: validatedData.userPassword,
      createdAt: new Date(Date.now()),
      otp: otp,
    });
    emailSender(otp, validatedData.userEmail);
    return {
      statusCode: 200,
      detail: {
        userEmail: validatedData.userEmail,
        status: true,
        message: "User Signed Up",
      },
    };
  } catch (err) {
    // @ts-ignore
    if (err.cause.code === "23505") {
      return {
        statusCode: 400,
        detail: { status: false, message: "Bad request" },
      };
    } else {
      return {
        statusCode: 500,
        detail: {
          status: false,
          message: "Server unable to process the request",
        },
      };
    }
  }
};
