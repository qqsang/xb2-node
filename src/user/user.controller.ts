/**
 * 定义用户的控制器
 */
import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import * as userService from "./user.service";
/**
 * 创建用户
 * 创建一个创建用户的方法，让这个方法使用前面定义的用户数据服务
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //获取用户注册的用户名和密码
  const { name, password } = req.body;
  //将用户名和密码写入数据库
  const data = await userService.createUser({ name, password });
  //作出响应
  res.status(201).send(data);
};

/**
 * 用户账户
 */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  //获取数据
  const { userId } = req.params;

  //调取用户
  try {
    const user = await userService.getUserById(parseInt(userId, 10), {
      password: true,
    });

    if (!user) {
      return next(new Error("USER_NOT_FOUND"));
    }

    //作出响应
    res.send(user);
  } catch (error) {
    next(error);
  }
};

/**
 * 更新用户的接口处理器
 */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //获取当前用户
  const { id } = req.user;

  //获取用户更新数据
  const userDate = _.pick(req.body.update, ["name", "password"]);

  try {
    //更新用户
    const data = await userService.updateUser(id, userDate);

    //作出响应
    res.send(data);
  } catch (error) {
    next(error);
  }
};
