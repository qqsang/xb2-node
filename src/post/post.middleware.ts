import { Request, Response, NextFunction } from "express";

/**
 * 排序方法
 */
export const sort = (req: Request, res: Response, next: NextFunction) => {
  //获取请求地址参数的排序查询
  const { sort } = req.query;
  let sortSql: string;

  //作出判断
  switch (sort) {
    case "earliest":
      sortSql = "post.id ASC"; //升序排列
      break;
    case "latest":
      sortSql = "post.id DESC"; //降序排列
      break;
    case "most_comments":
      sortSql = "totalComments DESC,post.id DESC";
      break;

    default:
      sortSql = "post.id DESC";
      break;
  }

  //把这些查询交给请求
  req.sort = sortSql;
  //下一步
  next();
};

/**
 * 过滤列表
 */
export const filter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //解构查询符
  const { tag, user, action } = req.query;

  //设置默认的过滤
  req.filter = {
    name: "default",
    sql: "post.id IS NOT NULL",
  };

  //按标签名过滤
  if (tag && !user && !action) {
    req.filter = {
      name: "tagName",
      sql: "tag.name = ?",
      param: `${tag}`,
    };
  }

  // 过滤出用户发布的内容
  if (user && action == "published" && !tag) {
    req.filter = {
      name: "userPublished",
      sql: "user.id = ?",
      param: `${user}`,
    };
  }

  // 下一步
  next();
};
