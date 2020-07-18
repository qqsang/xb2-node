import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { createFile, findFileById } from "../file/file.service";

/**
 * 上传文件
 * @param req
 * @param res
 * @param next
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //在控制台输出请求
  console.log(req.file);
  //当前用户
  //因为控制器之前使用了中间件authGuard，扩展了Request 类型，返回的请求数据就带有了user属性
  const { id: userId } = req.user;
  //所属内容
  //req.query可以从地址查询符中提取东西，如/files?post=3,问号后面的post是req.query的属性。
  const { post: postId } = req.query;
  //准备文件信息
  //_.pick()来自包lodash，它能从某个地方挑选我们想要的东西，重新组建一个对象给我们。
  //req.file中的file来自我们定义的中间件fileInterceptor定义的字段，上传文件时表的请求字段必须包含file
  const fileInfo = _.pick(req.file, [
    "originalname",
    "mimetype",
    "filename",
    "size",
  ]);

  try {
    //保存文件信息
    const data = await createFile({
      ...fileInfo,
      userId,
      postId: parseInt(`${postId}`, 10),
      ...req.fileMetaData, //把从中间件fileProcessor来的req.fileMetaData结构存入数据库
    });
    //作出响应
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 定义一个文件服务接口的处理器
 */
export const server = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //从地址参数获得文件id
  const { fileId } = req.params;
  try {
    //查询文件信息
    const file = await findFileById(parseInt(fileId, 10));
    //console.log(file);

    //要提供图像的尺寸,req.query从请求的地址参数获得查询符？后面的字段size。
    const { size } = req.query;
    console.log(req.query);

    //准备文件名与目录
    let filename = file.filename;
    let root = "uploads";
    let resized = "resized";

    if (size) {
      //可用的图像尺寸
      const imageSizes = ["large", "medium", "thumbnail"];

      //查找文件尺寸是否可用
      if (!imageSizes.some((item) => item == size)) {
        throw new Error("FILE_NOT_FOUND");
      }

      //同步检查一下文件是否存在
      const fileExit = fs.existsSync(
        //检查uploads/resized下有没有文件名为{filename}-${size}的文件
        path.join(root, resized, `${filename}-${size}`)
      );

      //设置文件名与目录
      if (fileExit) {
        //如果文件存在，把文件名取出来
        filename = `${filename}-${size}`;
        //把文件路径也取出来
        root = path.join(root, resized); //把文件路径设置成root/resized，也就是uploads/resized
        //console.log(root);
      }
    }

    //作出响应
    res.sendFile(filename, {
      //把查找到到文件发送给客户端
      root: root, //文件所在根目录
      headers: {
        "Content-type": file.mimetype, //告诉客户端这个是什么类型的文件
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 定义一个给客户端响应图像文件的接口处理器
 */
export const metadata = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //拿到客户端请求的fileId
    const { fileId } = req.params;
    //执行查询
    const file = await findFileById(parseInt(fileId, 10));
    //从查询出来的数据中筛选我们要给客户端响应的数据
    const data = _.pick(file, ["id", "size", "width", "height", "metadata"]);
    //给客户端响应数据
    res.send(data);
  } catch (error) {
    next(error);
  }
};
