import { Router } from "express";

const router = Router();
import * as post_service from "../services/postService.js";

router.post("/", post_service.postPost);
router.get("/", post_service.fetchPost);
// router.post("/like", post_service.postLike);
router.get("/timeline", post_service.postTimeline);

export default router;
