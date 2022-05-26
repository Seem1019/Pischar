import mongoose from "mongoose";

const { Schema, model } = mongoose;

const comment = new Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    comment: { type: String, required: true },
  },
  { versionKey: false }
);

export default model("Comment", comment);
