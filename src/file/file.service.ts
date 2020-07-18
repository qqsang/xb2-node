import path from "path";
import Jimp from "jimp";
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

/**
 * 定义一个调整图片尺寸的服务
 */
export const imageResizer = async (image: Jimp, file: Express.Multer.File) => {
  //图像尺寸
  const { imageSize } = image["_exif"];
  //console.log(image["_exif"]);
  //文件路径
  const filePath = path.join(file.destination, "resized", file.filename);
  //console.log(filePath);
  //console.log(imageSize);
  //大尺寸
  if (imageSize.width > 1280) {
    image.resize(1280, Jimp.AUTO).quality(85).write(`${filePath}-large`);
  }
  //中等尺寸
  if (imageSize.width > 640) {
    image.resize(640, Jimp.AUTO).quality(85).write(`${filePath}-medium`);
  }
  //小尺寸
  if (imageSize.width > 320) {
    image.resize(320, Jimp.AUTO).quality(85).write(`${filePath}-thumbnail`);
  }
};
