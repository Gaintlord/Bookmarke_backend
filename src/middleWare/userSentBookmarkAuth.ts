import { Request, Response } from "express";
import { userSentBokmarke } from "../models/zodDataModel";
import { addUserBookmarke } from "../controllers/userBokmarkeController";

export const userSentBookmarkeAuth = async (req: Request, res: Response) => {
  console.log(req.body);
  // @ts-ignore
  // @ts-ignore
  const userId = parseInt( req.userid);
  console.log(userId);
  const validatedBokmarke = userSentBokmarke.safeParse(req.body);

  if (!validatedBokmarke.success) {
    res.status(401).json({ status: "unsanitized data" });
  } else {
    const { image, link, hostName } = validatedBokmarke.data?.userBokmarke;
    await addUserBookmarke(image, link, hostName,userId);
    res.status(201).json({ status: "Bokmarke stored" });
  }
};
