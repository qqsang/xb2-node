import express from "express";
import * as authController from "./auth.controller";
const router = express.Router();
/**
 * 定义用户登录用的路由
 */
router.post("/login", authController.login);
export default router;
