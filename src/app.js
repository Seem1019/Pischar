/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { urlencoded } from "express";
import { json } from "express/lib/response";
import cors from "cors";
import cookieparser from "cookie-parser";

const app = express();

//settings
const port = process.env.PORT || 8080;
app.use(express.json());

//routes
import userRouter from "./routes/users";
import postRouter from "./routes/posts";

// Middleware
app.use(urlencoded({ extended: false }));
app.use(json);
app.use(cookieparser());
app.use(cors());

app.use("/posts", postRouter);

//Middleware routs
app.get("/  ", (req, res) => {
  res.json({ Status: true, Message: "Works" });
});

// DB configuration and connection create
mongoose.connect(process.env.URL || "mongodb://localhost:27017/pischar", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
