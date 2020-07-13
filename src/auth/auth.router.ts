import express from "express";
import * as authController from "./auth.controller";
import { validataLoginData } from "../auth/auth.middleware";
const router = express.Router();
/**
 * 定义用户登录用的路由
 */
router.post("/login", validataLoginData, authController.login);
export default router;
