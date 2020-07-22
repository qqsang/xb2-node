import { connection } from "../app/database/mysql";
import { CommentModel } from "./comment.model";

/**
 * 定义存储评论数据的服务
 */
export const createComment = async (comment: CommentModel) => {
  //准备查询sql
  const statement = `
  INSERT INTO comment
  SET ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement, comment);

  //返回结构
  return data as any;
};
