import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import * as userService from "../user/user.service";
/**
 * 验证用户登录数据
 */
export const validataLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("验证用户登录数据");
  //获得用户登录的用户名和密码
  const { name, password } = req.body;
  //验证登录时是否输入了用户名和密码
  if (!name) return next(new Error("NAME_IS_REQUIRED"));
  if (!password) return next(new Error("PASSWORD_IS_REQUIRED"));
  //验证用户名是否已经存在
  const user = await userService.getUserByName(name, { password: true });
  if (!user) return next(new Error("USER_DOES_NOT_EXIST"));
  //验证用户密码
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return next(new Error("PASSWORD_DOES_NOT_MATCHED"));

  //给登录的用户发放令牌
  //console.log(user);
  req.body.user = user;
  next();
};
