import mongoose from "mongoose";

const { Schema, model } = mongoose;

const user = new Schema(
  {
    display_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, required: false },
    birthDate: { type: Date, required: true },
  },
  { versionKey: false }
);

export default model("User", user);
