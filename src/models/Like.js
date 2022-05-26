import mongoose from "mongoose";

const { Schema, model } = mongoose;

const like = new Schema(
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

export default model("Like", like);
