import mongoose from "mongoose";

const { Schema, model } = mongoose;

const user = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, required: false },
    birthDate: { type: Date, required: true },
    visible_likes: { type: Boolean, required: true, default: true },
  },
  { versionKey: false }
);

export default mongoose.models["User"] || model("User", user);
