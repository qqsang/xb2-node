import dotenv from "dotenv";
dotenv.config();
/**
 * 应用配置
 */
export const { APP_PORT } = process.env;

/**
 * 数据仓库配置
 */
export const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

//配置密钥，从env文件读取base64格式的密钥内容，再从base64格式还原回原来的样子。
export let { PRIVATE_KEY, PUBLIC_KEY } = process.env;
PRIVATE_KEY = Buffer.from(PRIVATE_KEY, "base64").toString();
PUBLIC_KEY = Buffer.from(PUBLIC_KEY, "base64").toString();

//分页
export const { POSTS_PER_PAGE } = process.env;
