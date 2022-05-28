import mongoose from "mongoose";

const { Schema, model } = mongoose;

const saved_post = new Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { versionKey: false }
);

export default mongoose.models["Saved_Post"] || model("Saved_Post", saved_post);
