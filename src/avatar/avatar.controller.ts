import { Request, Response, NextFunction } from "express";
import { authGuard } from "../auth/auth.middleware";
import { avatarInterceptor } from "../avatar/avatar.middleware";
import { createAvatar } from "./avatar.service";
import _ from "lodash";

/**
 * 上传头像的处理器
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //准备要存储的数据:当前用户id
  const { id: userId } = req.user;

  //使用lodash的 .pick()方法从请求中选一些我们要的数据
  const fileInfo = _.pick(req.file, ["mimetype", "filename", "size"]);

  //把数据整理好
  const avatar = { ...fileInfo, userId };

  try {
    //开始存入数据库
    const data = await createAvatar(avatar);

    //作出响应
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};
