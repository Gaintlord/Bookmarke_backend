import { eq } from "drizzle-orm";
import { userTableDB } from "../models/dbSchemas";
import { db } from "../utils/dataBaseUtil";

export const deleteOtpFromTable = async (userEmail: string) => {
  try {
    await db
      .update(userTableDB)
      .set({ otp: null })
      .where(eq(userTableDB.userEmail, userEmail));
  } catch (e) {
    console.log("unsuccessfull deletion", e);
  }
};
