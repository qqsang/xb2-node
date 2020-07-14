//定义一个数据类型
export interface TokenPayload {
  id?: number;
  name?: string;
  iat?: number; //颁发令牌的时间戳
}
