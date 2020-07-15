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
    //console.log(image);//可以调试一下看看控制台输出的图像内容都有啥
  } catch (error) {
    return next(error);
  }
  //从上传的图像文件读取图像文件的信息结构出来我们要的
  const { imageSize, tags } = image["_exif"];
  //在请求中添加图像文件的数据
  //在这个中间件执行后，Request就会带着fileMetaData的数据了，后面的控制器就能用了
  req.fileMetaData = {
    //fileMetaData是我们给Request扩展的类型
    width: imageSize.width,
    height: imageSize.height,
    metadata: JSON.stringify(tags), //把tags对象的内容转换成json字符串格式
  };
  //下一步
  next();
};
