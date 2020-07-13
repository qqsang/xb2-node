import { Request, Response, NextFunction } from "express";
import * as userService from "../user/user.service";
/**
 * 用户登录处理器
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //活动用户登录的用户名和密码
  const { name, password } = req.body;
  //作出响应
  res.send({ message: `欢迎回来，${name}` });
};
