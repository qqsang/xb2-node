import express from "express";
import * as postController from "../post/post.controller";
import { requesturl } from "../app/app.middleware";
import { authGuard, accessControl } from "../auth/auth.middleware";
const router = express.Router();

/**
 * 内容列表
 */

router.get("/posts", requesturl, postController.index);

/**
 * 创建内容
 * 使用控制器中定义的store方法创建内容
 */
router.post("/posts", authGuard, postController.store);

/**
 * 更新内容
 * 使用控制器中定义的update()方法更新内容
 */
router.patch(
  "/posts/:postId",
  authGuard,
  accessControl({ possession: true }),
  postController.update
);

/**
 * 删除内容
 * 使用控制器中定义的destroy()方法删除内容
 */
router.delete(
  "/posts/:postId",
  authGuard,
  accessControl({ possession: true }),
  postController.destroy
);

/**
 * 导出路由
 */

export default router;
