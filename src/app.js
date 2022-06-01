import { Testapp } from "./appAndtest.modules";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// eslint-disable-next-line no-undef
const port = process.env.PORT || 8080;

const app = Testapp();
// DB configuration and connection create
// eslint-disable-next-line no-undef
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
