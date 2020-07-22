import { Request, Response, NextFunction } from "express";
import { createComment } from "./comment.service";

/**
 * 定义发表评论用的接口处理器
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //准备数据
  const { content, postId } = req.body;
  const { id: userId } = req.user;
  const comment = {
    content,
    postId,
    userId,
  };

  try {
    //保存评论
    const data = await createComment(comment);

    //作出响应
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};
