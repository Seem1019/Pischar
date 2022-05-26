import mongoose from "mongoose";

const { Schema, model } = mongoose;

const follow = new Schema(
  {
    display_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

export default model("Follow", follow);
