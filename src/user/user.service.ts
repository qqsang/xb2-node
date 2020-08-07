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
 * 获取用户
 */
export const getUser = (conditions: string) => {
  return async (
    param: string | number,
    //给可选参数一个默认空值
    options: GetUserOptions = {}
  ) => {
    //从上面定义的GetUserOptions拿点东西进来
    const { password } = options;
    //准备一条sql查询
    const statement = `
    SELECT 
      user.id,
      user.name,
      IF(COUNT(avatar.id),1,null) AS avatar
      ${password ? ",password" : ""}
    FROM user
    LEFT JOIN avatar ON avatar.userId = user.id
    WHERE ${conditions} =?`;
    //执行查询
    const [data] = await connection.promise().query(statement, param);
    //返回查询到到结果
    return data[0].id ? data[0] : null;
  };
};

/**
 * 按用户id查找用户
 */
export const getUserById = getUser("user.id");

/**
 * 按用户名查找用户
 */
export const getUserByName = getUser("user.name");

/**
 * 更新用户
 */
export const updateUser = async (userId: number, userDate: userModel) => {
  //准备查询
  const statement = `
  UPDATE user
  SET ?
  WHERE user.id = ?
  `;

  //sql参数
  const param = [userDate, userId];

  //执行查询
  const [data] = await connection.promise().query(statement, param);

  //提供结果
  return data;
};
