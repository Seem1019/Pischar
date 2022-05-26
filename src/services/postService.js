import post_model from "../models/Post.js";
import comment_model from "../models/Comment.js";
import like_model from "../models/Like.js";

export const createPost = async (req, res) => {
  const { img_url, bio, author } = req.body;
  try {
    await post_model.create({ img_url, bio, author });
    return res.status(201);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const fetchPost = async (req, res) => {
  const { post_id } = req.body;
  if (!post_id) {
    return res.status(400).json({ message: "Missing post id." });
  }
  try {
    const post = await post_model.findById(post_id);
    const comments = await comment_model.find({ post_id });
    const likes = await like_model.find({ post_id }).count();
    return res.status(200).json({ post, likes, comments });
  } catch (error) {
    return res.status(200).json(error);
  }
};
