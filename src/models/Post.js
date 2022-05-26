import mongoose from "mongoose";

const { Schema, model } = mongoose;

const post = new Schema(
  {
    img_url: { type: String },
    bio: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { versionKey: false }
);

export default model("Post", post);
