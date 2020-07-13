/**
 * 定义用户使用的中间件
 */
import { Request, Response, NextFunction } from "express";
//导入nodejs原生态的hash包bcrypt
import bcrypt from "bcrypt";
import * as userService from "./user.service";

/**
 * 定义一个中间件，验证注册用户的数据
 */
export const validataUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("验证用户数据");
  //从客户端提取用户注册时提交上来的数据
  const { name, password } = req.body;
  //验证必填数据
  if (!name) return next(new Error("NAME_IS_REQUIRED"));
  if (!password) return next(new Error("PASSWORD_IS_REQUIRED"));

  //验证用户名是否已存在
  const user = await userService.getUserByName(name);
  if (user) return next(new Error("USER_ALREADY_EXIST"));

  //下一步
  next();
};

//hash 密码
export const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //拿到用户的密码
  const { password } = req.body;
  //hash加密
  //用bcrypt包的hash方法加密用户的password
  req.body.password = await bcrypt.hash(password, 10);
  next();
};
