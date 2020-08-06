import { Request, Response, NextFunction } from "express";

/**
 * 过滤器
 */
export const filter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //解构查询符
  const { post, user, action } = req.query;

  //定义默认的过滤方法
  req.filter = {
    name: "default",
    sql: "comment.parentId IS NULL",
  };

  //定义按内容id过滤评论
  if (post && !user && !action) {
    req.filter = {
      name: "postComments",
      sql: "comment.parentId IS NULL AND comment.postId = ?",
      param: `${post}`,
    };
  }

  //用户发布过的评论
  if (user && action == "published" && !post) {
    req.filter = {
      name: "userPublished",
      sql: "comment.parentId IS NULL AND comment.userId = ?",
      param: `${user}`,
    };
  }

  //用户回复过的评论
  if (user && action == "replied" && !post) {
    req.filter = {
      name: "userReplied",
      sql: "comment.parentId IS NOT NULL AND comment.userId = ?",
      param: `${user}`,
    };
  }

  //用户发布和回复过的评论
  if (user && action == "pubrep" && !post) {
    req.filter = {
      name: "userPubrep",
      sql: "comment.userId = ?",
      param: `${user}`,
    };
  }
  //下一步
  next();
};
