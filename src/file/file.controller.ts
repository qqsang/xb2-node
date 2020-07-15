import { Request, Response, NextFunction } from "express";

/**
 * 上传文件
 * @param req
 * @param res
 * @param next
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.file);
  res.sendStatus(200);
};
