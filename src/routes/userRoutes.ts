import express, { Router } from "express";
import { signUpauthMidWare } from "../middleWare/signUpAuthMidware";
import { LogInAuthMidware } from "../middleWare/logInAuthMidware";
import { redirectValidation } from "../middleWare/redirectValidation";
import { refreshTokRotate } from "../middleWare/refreshTokenRotate";

export const userRoutes: Router = express.Router();

userRoutes.post("/signup", signUpauthMidWare);
userRoutes.post("/login", LogInAuthMidware);
userRoutes.get("/email-verify", redirectValidation);
userRoutes.get("/auth/refresh",refreshTokRotate)