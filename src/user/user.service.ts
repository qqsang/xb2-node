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
export const createUser = async (user: userModel) => {
  const statement = `
  INSERT INTO user
  SET ?`;
  const [data] = await connection.promise().query(statement, user);
  return data;
};

/**
 *定义一个类型
 * @param GetUserOptions
 */
interface GetUserOptions {
  password?: boolean;
}

/**
 * 定义一个接口，验证注册的用户名是否存在
 */
export const getUserByName = async (
  name: string,
  //给可选参数一个默认空值
  options: GetUserOptions = {}
) => {
  //从上面定义的GetUserOptions拿点东西进来
  const { password } = options;
  //准备一条sql查询
  const statement = `
  SELECT 
    id,
    name
    ${password ? ",password" : ""}
  FROM user
  WHERE name =?`;
  //执行查询
  const [data] = await connection.promise().query(statement, name);
  //返回查询到到结果
  return data[0];
};
