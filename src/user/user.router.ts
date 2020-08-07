import express from "express";
import * as userController from "./user.controller";
//导入验证用户的中间件，这个是自己定义好的。
import { validataUserData, hashPassword } from "../user/user.middleware";
//创建路由
const router = express.Router();

/**
 * 创建接口
 * 给用户一个地址注册用户
 * 使用中间件validataUserdata验证用户数据
 * 使用中间件hashPassword加密用户密码
 */
router.post("/users", validataUserData, hashPassword, userController.store);

/**
 * 获取用户
 */
router.get("/user/:userId", userController.show);

//导出路由
export default router;
