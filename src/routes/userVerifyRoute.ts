import express, { Router } from "express";
import { redirectEmailVerify } from "../controllers/signUpEmailVerify";
import { redirectValidation } from "../middleWare/redirectValidation";

export const userVerifyRoute: Router = express.Router();

userVerifyRoute.get("/email-verify", redirectValidation, redirectEmailVerify);
