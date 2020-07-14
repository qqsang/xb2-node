import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../app/app.config";
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
