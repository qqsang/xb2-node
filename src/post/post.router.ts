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
 * 根据访问参数返回内容
 */

router.get("/posts/:postId", requesturl, postController.getPostById);

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
 * 定义给内容添加标签的接口
 */
router.post(
  "/posts/:postId/tag",
  authGuard,
  accessControl({ possession: true }),
  postController.storePostTag
);

/**
 * 定义移除内容标签的接口
 */
router.delete(
  "/posts/:postId/tag",
  authGuard,
  accessControl({ possession: true }),
  postController.destroyPostTag
);
/**
 * 导出路由
 */

export default router;
