import { Router } from "express";

const router = Router();
import post_service from "../services/postService.js";

router.post("/", post_service.createPost);
router.get("/", post_service.fetchPost);

export default router;
