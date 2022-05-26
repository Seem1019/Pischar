import { Router } from "express";
import * as UserService from "../services/userService.js";

const router = Router();

//router.get("/", UserService.fetchUser);

router.post("/", UserService.register);

router.post("/login", UserService.login);

export default router;
