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
        statusCode: 200,
        detail: {
          userEmail: validatedData.userEmail,
          status: true,
          message: "User Signed Up & Email sent",
        },
      };
    } catch (e) {
      return {
        statusCode: 500,
        detail: {
          status: false,
          message: "Server umable to process the request",
        },
      };
    }
  } else {
    return {
      statusCode: 400,

      detail: { status: false, message: "Bad request || User already exist" },
    };
  }
};
