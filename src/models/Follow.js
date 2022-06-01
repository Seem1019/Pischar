import mongoose from "mongoose";

const { Schema, model } = mongoose;

const follow = new Schema(
  {
    followed_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    follower_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    accepted: { type: Boolean, required: true, default: false },
  },
  { versionKey: false }
);

export default mongoose.models["Follow"] || model("Follow", follow);
