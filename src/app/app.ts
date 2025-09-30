// express call routes , controller and middleweres

import express from "express";
import { userRoutes } from "../routes/userRoutes";
import { userVerifyRoute } from "../routes/userVerifyRoute";

export const app = express();
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", userVerifyRoute);
