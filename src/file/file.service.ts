import { connection } from "../app/database/mysql";
import { FileModel } from "../file/file.model";
/**
 * 存储文件信息
 */
export const createFile = async (file: FileModel) => {
  //准备查询
  const statement = `
  INSERT INTO file
  SET ?
  `;
  //执行查询
  const [data] = await connection.promise().query(statement, file);
  //返回结果
  return data;
};

/**
 * 定义按id查找文件的服务接口
 */
export const findFileById = async (fileId: number) => {
  //准备查询
  const statement = `
  SELECT * FROM file
  WHERE id = ?`;
  //执行查询
  const [data] = await connection.promise().query(statement, fileId);
  //console.log(data);
  //返回结果
  return data[0];
};
