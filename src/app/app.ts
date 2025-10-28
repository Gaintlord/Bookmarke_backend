// express call routes , controller and middleweres

import express from "express";
import cors from "cors";
import { userRoutes } from "../routes/userRoutes";
import { userVerifyRoute } from "../routes/userVerifyRoute";
import { LogInAuthMidware } from "../middleWare/logInAuthMidware";

export const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", userRoutes);

app.use("/api/v1", userVerifyRoute);
