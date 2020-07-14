import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userService from "../user/user.service";
import { PUBLIC_KEY } from "../app/app.config";
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

/**
 * 验证用户身份
 */
export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  console.log("验证用户身份");
  try {
    //提取用户登录请求的头部数据Authorization
    const authorization = req.header("Authorization");
    //console.log(authorization);
    if (!authorization) throw new Error();

    //提取令牌
    //使用replace字符串工具把上面提取到到用户令牌中到‘Bearer ’去掉，有个空格。
    const token = authorization.replace("Bearer ", "");
    //console.log(token);
    if (!token) throw new Error();

    //验证令牌
    //用公钥验证一下用户令牌
    jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });

    //下一步
    next();
  } catch (error) {
    next(new Error("UNAUTHORIZED"));
  }
};
