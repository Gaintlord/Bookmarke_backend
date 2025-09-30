import { eq } from "drizzle-orm";
import { userTableDB } from "../models/dbSchemas";
import { db } from "../utils/dataBaseUtil";
import { responseMessage } from "../types/tsTypes";

export const signUpUser = async (validatedData: {
  userEmail: string;
  userPassword: string;
}): Promise<responseMessage> => {
  const data = await db
    .select({ email: userTableDB.userEmail })
    .from(userTableDB)
    .where(eq(userTableDB.userEmail, validatedData.userEmail));

  if (data.length == 0) {
    try {
      await db.insert(userTableDB).values({
        userEmail: validatedData.userEmail,
        userPassword: validatedData.userPassword,
        createdAt: new Date(),
      });
      return {
        status: true,
        userEmail: validatedData.userEmail,
        detail: {
          message: "User Signed Up",
          statusCode: 200,
        },
      };
    } catch (e) {
      return {
        status: false,
        detail: {
          message: "Server umable to process the request",
          statusCode: 500,
        },
      };
    }
  } else {
    return {
      status: false,
      detail: {
        message: "Bad request || User already exist",
        statusCode: 400,
      },
    };
  }
};
