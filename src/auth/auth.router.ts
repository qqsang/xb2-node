import express from "express";
import * as authController from "./auth.controller";
import { validataLoginData, authGuard } from "../auth/auth.middleware";
const router = express.Router();
/**
 * 定义用户登录用的路由
 */
router.post("/login", validataLoginData, authController.login);

/**
 * 定义验证用户身份的路由
 */
router.post("/auth/validata", authGuard, authController.valiata);
export default router;
