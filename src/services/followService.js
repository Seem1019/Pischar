import { getUserId } from "../utils/jwt";
import follow_model from "../models/Follow.js";
import user_model from "../models/User.js";

export const fetchFollowers = async (req, res) => {
  const user_id = req.body.user_id;
  try {
    const logged_user_id = getUserId(req);
    const following = await follow_model.findOne({
      followed_id: user_id,
      follower_id: logged_user_id,
      accepted: true,
    });
    if (following || user_id === logged_user_id) {
      const follower_users = await follow_model.find({ followed_id: user_id });
      const users = await user_model.find({
        _id: { $in: follower_users.follower_id },
      });
      return res.status(200).json(users);
    } else {
      return res.status(403).json({ message: "Not following selected user." });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const fetchFollowing = async (req, res) => {
  const user_id = req.body / user_id;
  try {
    const logged_user_id = getUserId(req);
    const following = await follow_model.findOne({
      followed_id: user_id,
      follower_id: logged_user_id,
      accepted: true,
    });
    if (following || user_id === logged_user_id) {
      const followed_users = await follow_model.find({ follower_id: user_id });
      const users = await user_model.find({
        _id: { $in: followed_users.followed_id },
      });
      return res.status(200).json(users);
    } else {
      return res.status(403).json({ message: "Not following selected user." });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const requestFollow = async (req, res) => {
  const user_id = req.body.user_id;
  try {
    const logged_user_id = getUserId(req);
    const request = await follow_model.findOne({
      followed_id: user_id,
      follower_id: logged_user_id,
    });
    if (!request) {
      await follow_model.create({
        followed_id: user_id,
        follower_id: logged_user_id,
      });
    } else {
      return res.status(400).json({ message: "Request already exists." });
    }
    return res.status(201).json({});
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const requestResponse = async (req, res) => {
  const { request_id, action } = req.body;
  try {
    const logged_user_id = getUserId(req);
    const request = await follow_model.findOne({
      followed_id: logged_user_id,
      follower_id: request_id,
      accepted: false,
    });
    if (action === "accept") {
      request.accepted = true;
      await request.save();
      return res.status(200).json({});
    }
    if (action === "reject") {
      await follow_model.deleteOne({ _id: request._id });
      return res.status(200).json({});
    }
    return res.status(400).json({ message: "Action is invalid." });
  } catch (error) {
    return res.status(500).json(error);
  }
};
