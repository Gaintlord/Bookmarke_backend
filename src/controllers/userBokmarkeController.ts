import { eq } from "drizzle-orm";
import { bokmarkeTable } from "../models/dbSchemas";
import { db } from "../utils/dataBaseUtil";


export const addUserBookmarke = async (
  image: string,
  link: string,
  hostName: string,
  userId:number,
) => {
  try {
    await db.insert(bokmarkeTable).values({
      userId: userId,
      pageLink: link,
      imageLink: image,
      hostName: hostName,

    });
  } catch (err) {
    const timeNow = new Date();
// @ts-ignore
    if (err.cause.code === "23505") {
      await db
        .update(bokmarkeTable)
        .set({ reAddedAt: timeNow })
        .where(eq(bokmarkeTable.pageLink, link));
    } else {
      console.log(`error for user ${userId} at ${new Date()} :\n\n`, err);
    }
  }
};
