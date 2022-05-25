/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { urlencoded } from "express";
import { json } from "express/lib/response";

const app = express();

//settings
const port = process.env.PORT || 8080;
app.use(express.json());

// Middleware
app.use(urlencoded({ extended: false }));
app.use(json);

//Middleware routs
app.get("/  ", (req, res) => {
  res.json({ Status: true, Message: "Works" });
});

// DB configuration and connection create
async function dbconnection() {
  await mongoose.connect(process.env.URL || 27017, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB");
  });
}
dbconnection().catch(console.error);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
