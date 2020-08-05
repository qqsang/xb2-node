import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { createAvatar, findAvatarByUserId } from "./avatar.service";
import _ from "lodash";

/**
 * 上传头像的处理器
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //准备要存储的数据:当前用户id
  const { id: userId } = req.user;

  //使用lodash的 .pick()方法从请求中选一些我们要的数据
  const fileInfo = _.pick(req.file, ["mimetype", "filename", "size"]);

  //把数据整理好
  const avatar = { ...fileInfo, userId };

  try {
    //开始存入数据库
    const data = await createAvatar(avatar);

    //作出响应
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 定义一个头像尺寸处理服务
 */
export const server = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //提供给用户三种尺寸的头像服务

  //获取当前用户id 创建路由时会是这样users/:userId/avatar
  const { userId } = req.params;

  try {
    //按当前用户的id查找出头像数据
    const avatar = await findAvatarByUserId(parseInt(userId, 10));

    //需要提供的尺寸 请求地址应该这样设计：/users/:userId/avatar?size=large
    const { size } = req.query;

    //头像文件与目录
    let filename = avatar.filename;
    let root = path.join("uploads", "avatar");
    let resize = "resize";

    if (size) {
      //提供可用的三种头像
      const imageSize = ["large", "medium", "small"];

      //测试可用的头像尺寸
      if (!imageSize.some((item) => item === size)) {
        throw next(new Error("FILE_NOT_FOUND"));
      }

      //检查文件是否存在
      const fileExist = fs.existsSync(
        path.join(root, resize, `${filename}-${size}`)
      );

      //作出判断
      if (!fileExist) {
        throw next(new Error("FILE_NOT_FOUND"));
      }
      //如果存在，就设置成存储在磁盘中的文件名和路径
      if (fileExist) {
        filename = `${filename}-${size}`;
        root = path.join(root, resize);
      }

      //作出响应
      res.sendFile(filename, {
        //要给客户端发送的文件叫什么名字
        root, //要给客户端发送的这个文件在什么路径
        headers: {
          "Content-Type": avatar.mimetype, //告诉客户端文件的类型是什么
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
