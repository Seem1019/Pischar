import post_model from "../models/Post.js";
import comment_model from "../models/Comment.js";
import like_model from "../models/Like.js";

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
    return res.status(201);
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
    await comment_model.create({ post_id, comment });
  } catch (error) {
    res.status(500).json(error);
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
    return res.status(500).json(error);
  }
};

export const postTimeline = async (req, res) => {
  const { page } = req.body;
  if (!page) {
    return res.status(400).json({ message: "Missing page." });
  }
  try {
    const num_post = 10;
    const pipeline = [
      { $project: { img_url: 1, bio: 1 } },
      { $skip: num_post * parseInt(page) },
      { $limit: num_post },
    ];
    const posts = await post_model.aggregate(pipeline);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// export const postLike = async (req, res) => {
//     const {post_id} = req.body;
//     if (!post_id) {
//         return res.status(400).json({message: "Missing post id."});
//     }
//     try {

//     } catch (error) {
//         return res.status(200).json(error);
//     }
// };
