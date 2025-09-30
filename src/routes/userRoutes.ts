import express, { Router } from "express";
import { signUpauthMidWare } from "../middleWare/authMidware";

export const userRoutes: Router = express.Router();

userRoutes.post("/signup", signUpauthMidWare);
