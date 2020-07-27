import { Request, Response, NextFunction } from "express";
import { authGuard } from "../auth/auth.middleware";
import { avatarInterceptor } from "../avatar/avatar.middleware";

/**
 * 上传头像的处理器
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.file;
  res.status(200).send(data);
};
