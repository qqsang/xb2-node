import express from "express";
import * as fileController from "../file/file.controller";
import { authGuard } from "../auth/auth.middleware";
import { fileInterceptor } from "./file.middleware";
const router = express.Router();
/**
 * 定义上传文件的接口
 */
router.post("/files", authGuard, fileInterceptor, fileController.store);
export default router;
