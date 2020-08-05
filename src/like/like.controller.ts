import { Request, Response, NextFunction } from "express";
import { createUserLikePost } from "./like.service";

/**
 * 定义用户点赞内容接口处理器
 */
export const storeUserLikePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //准备数据
  const { postId } = req.params;
  const { id: userId } = req.user;

  try {
    //用户点赞
    const like = await createUserLikePost(userId, parseInt(postId, 10));

    //作出响应
    res.status(201).send(like);
  } catch (error) {
    next(error);
  }
};
