import mongoose from "mongoose";

const { Schema, model } = mongoose;

const saved_post = new Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      red: "Post",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      red: "User",
    },
  },
  { versionKey: false }
);

export default model("Saved_Post", saved_post);
