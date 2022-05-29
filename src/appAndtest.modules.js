/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middleware/JwtAuth";

import userRouter from "./routes/users";
import postRouter from "./routes/posts";
import followRouter from "./routes/follows";

export function Testapp() {
  const app = express();

  //settings

  app.use(express.json(50));

  //routes

  // Middleware
  app.use(cookieParser());
  app.use(cors());

  //Middleware routs
  app.all("*", verifyToken);

  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use("/follows", followRouter);

  return app;
}
