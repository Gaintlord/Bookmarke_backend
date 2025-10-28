import { eq } from "drizzle-orm";
import { userTableDB } from "../models/dbSchemas";
import { db } from "../utils/dataBaseUtil";
import { hashVerify } from "../utils/hashingUtil";
import { response } from "express";

export const logInUser = async (data: {
  userEmail: string;
  userPassword: string;
}) => {
  const { userEmail, userPassword } = data;

  //getiing hashed pass from DB
  const userHashedPass = await db
    .select({ userPassword: userTableDB.userPassword })
    .from(userTableDB)
    .where(eq(userTableDB.userEmail, userEmail));

  if (userHashedPass.length == 0) {
    return false;
  } else {
    const comapareStatus = await hashVerify(
      userPassword,
      userHashedPass[0].userPassword
    );
    if (comapareStatus) {
      return true;
    } else {
      return false;
    }
  }
};
