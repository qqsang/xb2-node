import express from "express";
import { authGuard, accessControl } from "../auth/auth.middleware";
import * as commentController from "./comment.controller";
const router = express.Router();
/**
 * 定义发表评论的路由
 */
router.post("/comments", authGuard, commentController.store);

/**
 * 定义回复评论的路由
 */
router.post("/comments/:commentId/replay", authGuard, commentController.replay);

/**
 * 定义修改评论内容的路由
 */
router.patch(
  "/comments/:commentId",
  authGuard,
  accessControl({ possession: true }),
  commentController.update
);

export default router;
