import { Request, Response, NextFunction } from "express";

/**
 * 过滤器
 */
export const filter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //定义过滤方法
  req.filter = {
    name: "default",
    sql: "comment.parentId IS NULL",
  };

  //下一步
  next();
};
