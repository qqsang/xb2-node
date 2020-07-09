import express from "express";
import * as postController from "../post/post.controller";
import { requesturl } from "../app/app.middleware";
const router = express.Router();

/**
 * 内容列表
 */

router.get("/posts", requesturl, postController.index);

/**
 * 导出路由
 */

export default router;
