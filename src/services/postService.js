import post_model from "../models/Post.js";
import comment_model from "../models/Comment.js";
import like_model from "../models/Like.js";
import { getUserId } from "../utils/jwt.js";
import saved_model from "../models/Saved_post.js";
import user_model from "../models/User.js";
import follow_model from "../models/Follow.js";

export const postPost = async (req, res) => {
  if (req.body.img_url && req.body.bio && req.body.author) {
    return createPost(req, res);
  }
  if (req.body.post_id && req.body.comment) {
    return commentPost(req, res);
  }
  return res.status(400).json("Missing one or more parameters.");
};

const createPost = async (req, res) => {
  const { img_url, bio, author } = req.body;
  try {
    await post_model.create({ img_url, bio, author });
    return res.status(201).json({});
  } catch (error) {
    return res.status(500).json(error);
  }
};

const commentPost = async (req, res) => {
  const { post_id, comment } = req.body;
  if (!post_id) {
    return res.status(400).json({ message: "Missing post id." });
  }
  if (!comment) {
    return res.status(400).json({ message: "Missing comment." });
  }
  try {
    const user_id = getUserId(req);
    await comment_model.create({ user_id, post_id, comment });
    res.status(200).json({});
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPost = async (req, res) => {
  if (req.query.author) {
    return uploadedPosts(req, res);
  }
  if (req.body.post_id) {
    return fetchPost(req, res);
  }
  return res.status(400).json("Missing one or more parameters.");
};

const fetchPost = async (req, res) => {
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
    return res.status(500).json(error);
  }
};

export const postTimeline = async (req, res) => {
  const { user_id, page } = req.body;
  if (!page) {
    return res.status(400).json({ message: "Missing page." });
  }
  try {
    const num_post = 10;
    const pipeline = [
      { $match: { user_id } },
      { $project: { img_url: 1, bio: 1, author: 1 } },
      { $skip: num_post * parseInt(page) },
      { $limit: num_post },
    ];
    const posts = await post_model.aggregate(pipeline);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const likePost = async (req, res) => {
  const { post_id } = req.body;
  if (!post_id) {
    return res.status(400).json({ message: "Missing post id." });
  }
  try {
    const user_id = getUserId(req);
    const like = await like_model.findOne({ post_id, user_id });
    like
      ? await like_model.deleteOne(like)
      : await like_model.create({ post_id, user_id });
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const savePost = async (req, res) => {
  const { post_id } = req.body;
  if (!post_id) {
    return res.status(400).json({ message: "Missing post id." });
  }
  try {
    const user_id = getUserId(req);
    const save = await saved_model.findOne({ post_id, user_id });
    save
      ? await saved_model.deleteOne(save)
      : await saved_model.create({ post_id, user_id });
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const savedPosts = async (req, res) => {
  try {
    const user_id = getUserId(req);
    const post_ids = await saved_model.find({ user_id });
    const posts = await post_model.find({ _id: { $in: post_ids.post_id } });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const likedPosts = async (req, res) => {
  const { user_id } = req.query;
  try {
    const logged_user_id = getUserId(req);
    const user_permit = await user_model
      .findById(user_id)
      .select("visible_likes");
    if (logged_user_id === user_id || user_permit.visible_likes) {
      const post_ids = await like_model.find({ user_id }).select("post_id");
      const posts = await post_model.find({ _id: { $in: post_ids.post_id } });
      return res.status(200).json(posts);
    }
    return res
      .status(403)
      .json({ message: "Like visibility is disabled for this user." });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const uploadedPosts = async (req, res) => {
  const { author } = req.query;
  try {
    const logged_user_id = getUserId(req);
    const following = await follow_model.findOne({
      followed_id: author,
      follower_id: logged_user_id,
    });
    if (following || logged_user_id === author) {
      const posts = await post_model.find({ author });
      return res.status(200).json(posts);
    }
    return res
      .status(403)
      .json({ message: "Requested user is not being followed." });
  } catch (error) {
    return res.status(500).json(error);
  }
};
