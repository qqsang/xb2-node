import express from "express";
import * as fileController from "../file/file.controller";
import { authGuard } from "../auth/auth.middleware";
import { fileInterceptor, fileProcessor } from "./file.middleware";
const router = express.Router();
/**
 * 定义上传文件的接口
 */
router.post(
  "/files",
  authGuard,
  fileInterceptor,
  fileProcessor,
  fileController.store
);
/**
 * 定义带地址参数请求查找文件的路由
 */
router.get("/files/:fileId/server", fileController.server);
/**
 * 定义给客户端返回图像文件信息的接口
 */
router.get("/files/:fileId/metadata", fileController.metadata);
export default router;
