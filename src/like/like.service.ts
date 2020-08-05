import { connection } from "../app/database/mysql";

/**
 * 定义存储点赞内容的功能
 */
export const createUserLikePost = async (userId: number, postId: number) => {
  //准备sql查询
  const statement = `
    INSERT INTO 
      user_like_post (userId,postId)
    VALUES(?,?)
  `;

  //执行查询
  const [data] = await connection.promise().query(statement, [userId, postId]);

  //提供数据
  return data;
};

/**
 * 定义取消用户点赞内容的服务
 */
export const deleteUserLikePost = async (userId: number, postId: number) => {
  //准备sql语句
  const statement = `
    DELETE FROM
      user_like_post
    WHERE userId = ? AND postId = ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement, [userId, postId]);

  //提供数据
  return data;
};
