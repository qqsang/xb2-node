import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userService from "../user/user.service";
import { TokenPayload } from "../auth/auth.interface";
import { PUBLIC_KEY } from "../app/app.config";
import { process } from "../auth/auth.service";
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
    //const authorization = req.heades.authorization;  //这种写法也可以。
    //header("Authorization")  ===  req.heades.authorization
    // header()方法是从headers这个对象中拿东西
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
    const decoded = jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });
    req.user = decoded as TokenPayload;

    //下一步
    next();
  } catch (error) {
    next(new Error("UNAUTHORIZED"));
  }
};

/**
 * 访问控制
 */
interface AccessControlOptions {
  possession?: boolean;
}

export const accessControl = (options: AccessControlOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("访问控制");
    //解构选项
    const { possession } = options;
    //获取当前用户id
    const { id: userId } = req.user;
    //放行管理员
    if (userId == 1) return next();
    //准备资源
    const resourceIdParam = Object.keys(req.params)[0];
    const resourceType = resourceIdParam.replace("Id", "");
    const resourceId = parseInt(req.params[resourceIdParam], 10);

    //检查资源拥有权
    if (possession) {
      try {
        const ownResource = await process({ resourceId, resourceType, userId });
        if (!ownResource) {
          return next(new Error("USER_DOES_NOT_OWN_RESOURCE"));
        }
      } catch (error) {
        return next(new Error());
      }
    }
    next();
  };
};
