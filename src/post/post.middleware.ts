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
