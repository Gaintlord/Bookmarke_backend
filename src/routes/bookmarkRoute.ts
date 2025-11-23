import express from "express";
import { userReqAuth } from "../middleWare/userReqAuth";
import { userSentBookmarkeAuth } from "../middleWare/userSentBookmarkAuth";

export const bookmarkeRoute = express.Router();

// bookmarkeRoute.post("/adddata", userReqAuth);
bookmarkeRoute.post("/storelink", userReqAuth,userSentBookmarkeAuth);
