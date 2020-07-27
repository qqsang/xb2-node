import Path from "path";
import Jimp from "jimp";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { fileFilter } from "../file/file.middleware";

/**
 * 创建一个文件过滤器
 */
const avatarFilter = fileFilter(["image/jpg", "image/jpeg", "image/png"]);

/**
 * 创建一个multer
 */
const avatarUpload = multer({
  dest: "uploads/avatar",
  fileFilter: avatarFilter,
});

/**
 * 创建文件拦截器
 */
export const avatarInterceptor = avatarUpload.single("avatar");

/**
 * 创建头像处理器中间件
 */
export const avatarProcessor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //从请求中获得文件信息
  const { file } = req;
  //console.log(file.destination);  //控制台输出：uploads/avatar

  //准备文件路径
  const filePath = Path.join(file.destination, "resize", file.filename);
  //console.log(filePath);//控制台输出：上传后的文件的路径，包含文件名。uploads/avatar/resize/57f8ad16a76544d4241d50cb0992a07f

  //处理头像文件，让头像文件拥有不同的尺寸，应对不同的屏幕
  try {
    //读取文件信息
    const image = await Jimp.read(file.path);

    //调整尺寸
    image.cover(256, 256).quality(85).write(`${filePath}-large`); //256px*265px
    image.cover(128, 128).quality(85).write(`${filePath}-medium`); //128px*128px
    image.cover(64, 64).quality(85).write(`${filePath}-small`); //64px*64px
  } catch (error) {
    next(error);
  }
  //下一步
  next();
};
