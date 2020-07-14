import { Request, Response, NextFunction } from "express";
//导入签发令牌的服务接口
import { signToken } from "../auth/auth.service";
/**
 * 用户登录处理器
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //准备数据
  //从用户登录主体中拿到数据
  const {
    user: { id, name },
  } = req.body;
  const payload = { id, name };
  //console.log(payload);
  try {
    //签发令牌
    const token = signToken({ payload });
    //作出响应
    res.send({ id, name, token });
  } catch (error) {
    next(error);
  }
};
