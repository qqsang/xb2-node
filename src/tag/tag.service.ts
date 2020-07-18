import { connection } from "../app/database/mysql";
import { tagModel } from "./tag.model";

/**
 * 创建标签
 */
const createTag = async (tag: tagModel) => {
  //准备查询
  const statement = `
  INSERT INTO tag
  SET ?`;

  //执行查询
  const [data] = await connection.promise().query(statement, tag);

  //返回数据
  return data as any; //返回任意类型的data数据
};
