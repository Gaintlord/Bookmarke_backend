import express, { Router } from "express";
import { signUpauthMidWare } from "../middleWare/signUpAuthMidware";
import { LogInAuthMidware } from "../middleWare/logInAuthMidware";

export const userRoutes: Router = express.Router();

userRoutes.post("/signup", signUpauthMidWare);
userRoutes.get("/login", LogInAuthMidware);
