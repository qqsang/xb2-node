import { Request, Response, NextFunction } from "express";
//导入上传文件用的包multer
import multer from "multer";
//导入 读取和调整 图像文件的包jimp
import Jimp from "jimp";

/**
 * 创建一个multer
 */
const fileUpload = multer({
  dest: "uploads/", //设置文件上传的位置
});

/**
 * 创建文件拦截器
 * single()处理单个文件上传
 * single(‘file’)中‘file’是客户端上传文件用的表单字段起的名字
 */
export const fileInterceptor = fileUpload.single("file");

/**
 * 处理文件使用的中间件
 * 文件处理器
 */
export const fileProcessor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //获取客户端请求的要处理的文件路径,需要放在上传文件中间件后面才能获得上传文件请求中的path
  const { path } = req.file;
  let image: Jimp;
  try {
    //读取图像文件
    image = await Jimp.read(path);
    console.log(image);
  } catch (error) {
    return next(error);
  }
  //下一步
  next();
};
