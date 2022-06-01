import { Router } from "express";

const router = Router();
import * as post_service from "../services/postService.js";

// router.post("/", post_service.postPost);
// router.get("/", post_service.fetchPost);
// router.post("/like", post_service.likePost);
// router.get("/timeline", post_service.postTimeline);
router.get("/liked-by", post_service.likedPosts);
router.get("/saved-by", post_service.savedPosts);
router.get("/timeline", post_service.postTimeline);
router.post("/", post_service.postPost);
router.get("/", post_service.getPost);
router.post("/like", post_service.likePost);
router.post("/save", post_service.savePost);

export default router;
