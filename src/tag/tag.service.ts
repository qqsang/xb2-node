import { connection } from "../app/database/mysql";
import { tagModel } from "./tag.model";

/**
 * 创建标签
 */
export const createTag = async (tag: tagModel) => {
  //准备查询
  const statement = `
  INSERT INTO tag
  SET ?`;

  //执行查询
  const [data] = await connection.promise().query(statement, tag);
  //console.log(data);

  //返回数据
  return data as any; //返回任意类型的data数据
};

/**
 * 定义按标签名字查找标签
 */
export const getTagByName = async (tagName: string) => {
  //准备查询
  const statement = `
  SELECT id,name FROM tag
  WHERE name = ?`;

  //执行查询
  const [data] = await connection.promise().query(statement, tagName);

  //提供数据
  return data[0];
};

/**
 * 定义删除内容标签的服务
 */
export const deletePostTag = async (postId: number, tagId: number) => {
  //准备查询sql语句
  const statement = `
  DELETE FROM post_tag
  WHERE postId = ? AND tagId = ?`;

  //执行查询
  const data = await connection.promise().query(statement, [postId, tagId]);

  //返回数据
  return data;
};
