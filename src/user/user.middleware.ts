/**
 * 定义用户使用的中间件
 */
import { Request, Response, NextFunction } from "express";
//导入nodejs原生态的hash包bcrypt
import bcrypt from "bcrypt";
import _ from "lodash";
import * as userService from "./user.service";

/**
 * 定义一个中间件，验证注册用户的数据
 */
export const validateUserData = async (
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

/**
 * 创建验证更新用户数据中间件
 */
export const validateUserUpdateData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //获取用户更新的数据
  const { validate, update } = req.body;

  //获取当前用户
  const { id: userId } = req.user;

  try {
    //检查用户是否提供了密码
    if (!_.has(validate, "password")) {
      return next(new Error("PASSWORD_IS_REQUIRED"));
    }

    //获取用户数据
    const user = await userService.getUserById(userId, { password: true });

    //验证用户密码是否匹配
    const matched = await bcrypt.compare(validate.password, user.password);

    //如果不匹配
    if (!matched) {
      return next(new Error("PASSWORD_DOES_NOT_MATCH"));
    }

    //检查用户名是否被占用
    if (update.user) {
      const user = await userService.getUserByName(update.user);
      if (user) {
        return next(new Error("USER_ALREADY_EXIST"));
      }
    }

    //处理用户更新的密码
    if (update.password) {
      const matched = await bcrypt.compare(update.password, user.password);
      if (matched) {
        return next(new Error("PASSWORD_IS_THE_SAME"));
      }
    }

    //hash密码
    req.body.update.password = await bcrypt.hash(update.password, 10);
  } catch (error) {
    return next(error);
  }
};
