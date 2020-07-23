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

/**
 * 定义检查评论是否为回复评论的服务
 */
export const isReplayComment = async (commentId: number) => {
  //准备查询
  const statement = `
  SELECT parentId FROM comment
  WHERE id = ?`;

  //执行查询
  const [data] = await connection.promise().query(statement, commentId);

  //提供结果
  return data[0].parentId ? true : false;
};

/**
 * 定义修改评论的服务
 */
export const updateComment = async (comment: CommentModel) => {
  //准备数据
  const { id, content } = comment;

  //准备查询sql
  const statement = `
  UPDATE comment
  SET content = ?
  WHERE id = ?`;

  //执行查询
  const [data] = await connection.promise().query(statement, [content, id]);

  //返回结果
  return data;
};

/**
 * 定义删除评论的服务
 */
export const deleteComment = async (commentId: number) => {
  //准备删除sql
  const statement = `
  DELETE FROM comment
  WHERE id = ?`;

  //执行删除操作
  const [data] = await connection.promise().query(statement, commentId);

  //提供结果
  return data;
};
