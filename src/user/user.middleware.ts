/**
 * 定义用户使用的中间件
 */
import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";

/**
 * 定义一个中间件，验证注册用户的数据
 */
export const validataUserdata = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //从客户端提取用户注册时提交上来的数据
  const { name, password } = req.body;
  //验证必填数据
  if (!name) return next(new Error("NAME_IS_REQUIRED"));
  if (!password) return next(new Error("PASSWORD_IS_REQUIRED"));
  //下一步
  next();
};
