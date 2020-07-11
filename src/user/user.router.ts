import express from "express";
import * as userController from "./user.controller";
//创建路由
const router = express.Router();
//导出路由
export default router;

/**
 * 创建接口
 * 给用户一个地址注册用户
 */
router.post("/users", userController.store);
