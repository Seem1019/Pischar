import { Router } from "express";

const router = Router();
import * as follow_service from "../services/followService.js";

router.get("/following", follow_service.fetchFollowing);
router.get("/followers", follow_service.fetchFollowers);
router.post("/request", follow_service.requestFollow);
router.post("/response", follow_service.requestResponse);

export default router;
