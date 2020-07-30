import { AvatarModel } from "../avatar/avatar.model";
import { connection } from "../app/database/mysql";
/**
 * 存储头像数据
 */
export const createAvatar = async (avatar: AvatarModel) => {
  //准备存储sql
  const statement = `
  INSERT INTO avatar
  SET ?`;

  //执行存储
  const [data] = await connection.promise().query(statement, avatar);

  //返回结果
  return data;
};

/**
 * 定义按用户id查找头像功能
 */
export const findAvatarByUserId = async (userId: number) => {
  //准备查询
  const statement = `
  SELECT *
  FROM avatar
  WHERE userId = ?
  ORDER BY avatar.id DESC
  LIMIT 1
  `;

  //执行查询
  const [data] = await connection.promise().query(statement, userId);

  //返回结果
  return data[0];
};
