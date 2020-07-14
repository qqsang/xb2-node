import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../app/app.config";
import { connection } from "../app/database/mysql";
/**
 * 签发令牌
 */
interface SignTokenOptions {
  payload?: any;
}
//创建签发令牌的服务接口
export const signToken = (options: SignTokenOptions) => {
  //准备选项
  //从参数中结构出来登录的id，name
  //console.log(PRIVATE_KEY);
  const { payload } = options;
  //签发jwt
  const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: "RS256" });
  //提供令牌
  return token;
};

/**
 * 检查用户是否拥有指定的资源
 */
interface ProccessOptions {
  //定义一个数据类型
  resourceId: number;
  resourceType: string;
  userId: number;
}

export const process = async (options: ProccessOptions) => {
  //准备选项
  const { resourceId, resourceType, userId } = options;
  //准备sql查询
  const statement = `
    SELECT COUNT(${resourceType}.id) as count
    FROM ${resourceType}
    WHERE ${resourceType}.id = ? AND userId = ?`;
  //检查拥有权
  const [data] = await connection
    .promise()
    .query(statement, [resourceId, userId]);
  //判断并提供结果
  return data[0].count ? true : false;
};
