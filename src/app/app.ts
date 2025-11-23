// express call routes , controller and middleweres

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "../routes/userRoutes";
import { bookmarkeRoute } from "../routes/bookmarkRoute";

export const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1", userRoutes);
app.use("/api/v1", bookmarkeRoute);
