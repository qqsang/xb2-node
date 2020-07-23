import { Request, Response, NextFunction } from "express";
import { createComment, isReplayComment } from "./comment.service";

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

/**
 * 定义回复评论用的接口处理器
 */
export const replay = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //准备数据
  const { commentId } = req.params;
  const parentId = parseInt(commentId, 10);
  const { id: userId } = req.user;
  const { content, postId } = req.body;

  const comment = {
    content,
    postId,
    userId,
    parentId,
  };
  /*
  //检查是否为回复评论
  try {
    const replay = await isReplayComment(parentId);
    if (replay) return next(new Error("UNABLE_TO_REPLY_THIS_COMMENT"));
  } catch (error) {
    return next(error);
  }
*/
  //现在可以回复评论了
  try {
    const data = await createComment(comment);
    //给客户端响应
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};
