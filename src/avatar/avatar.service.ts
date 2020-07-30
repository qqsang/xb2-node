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
