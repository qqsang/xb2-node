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

/**
 * 定义删除评论的路由
 */
router.delete(
  "/comments/:commentId",
  authGuard,
  accessControl({ possession: true }),
  commentController.destroy
);

/**
 * 定义获取评论列表的路由
 */
router.get("/comments", commentController.index);

export default router;
