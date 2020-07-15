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
    //作出响应
    res.sendFile(file.filename, {
      //把查找到到文件发送给客户端
      root: "uploads", //文件所在根目录
      headers: {
        "Content-type": file.mimetype, //告诉客户端这个是什么类型的文件
      },
    });
  } catch (error) {
    next(error);
  }
};
