import express from "express";
import * as tagController from "./tag.controller";
import { authGuard } from "../auth/auth.middleware";
const router = express.Router();
/**
 * 定义创建标签的路由
 */
router.post("/tags", authGuard, tagController.store);
export default router;
