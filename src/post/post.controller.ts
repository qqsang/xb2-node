import { Request, Response, NextFunction } from "express";
import { getPosts } from "./post.service";
import { error } from "console";
/**
 * 内容列表接口
 * @param req 获取HTTP请求
 * @param res 响应HTTP请求
 * @param next
 */
export const index = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization !== "SECRET") {
    return next(new error());
  }
  const posts = getPosts();
  res.send(posts);
};
