/**
 * 定义用户服务方法
 */
//导入处理数据的方法
import { connection } from "../app/database/mysql";
//导入用户的数据类型
import { userModel } from "./user.model";
/**
 * 创建用户
 * 往数据库插入用户注册的账户信息
 */
export const createUser = async (post: userModel) => {
  const statement = `
  INSERT INTO user
  SET ?`;
  const [data] = await connection.promise().query(statement, post);
  return data;
};
