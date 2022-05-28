/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middleware/JwtAuth";

const app = express();

//settings
const port = process.env.PORT || 8080;
app.use(express.json(50));

//routes
import userRouter from "./routes/users";
import postRouter from "./routes/posts";
import followRouter from "./routes/follows";

// Middleware
app.use(cookieParser());
app.use(cors());

//Middleware routs
app.all("*", verifyToken);

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/follows", followRouter);

// DB configuration and connection create
mongoose.connect(process.env.URL || "mongodb://localhost:27017/pischar", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
