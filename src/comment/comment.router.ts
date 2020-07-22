import express from "express";
import { authGuard } from "../auth/auth.middleware";
import * as commentController from "./comment.controller";
const router = express.Router();
/**
 * 定义发表评论的路由
 */
router.post("/comments", authGuard, commentController.store);
export default router;
