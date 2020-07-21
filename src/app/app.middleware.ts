import { Request, Response, NextFunction } from "express";
export const requesturl = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  next();
};
//定义发生错误的默认处理中间件
export const defaultErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //如果遇到错误，在控制台输出错误信息
  if (error.message) {
    console.log(error.message);
  }
  let statusCode: number, message: string;
  //配置默认的错误信息
  switch (
    error.message //从error对象中拿到message内容
  ) {
    case "NAME_IS_REQUIRED":
      statusCode = 400;
      message = "请提供用户名";
      break;
    case "PASSWORD_IS_REQUIRED":
      statusCode = 400;
      message = "请提供密码";
      break;
    case "USER_ALREADY_EXIST":
      statusCode = 409;
      message = "用户名已存在";
      break;
    case "USER_DOES_NOT_EXIST":
      statusCode = 400;
      message = "用户名不存在";
      break;
    case "PASSWORD_DOES_NOT_MATCHED":
      statusCode = 400;
      message = "密码不对";
      break;
    case "UNAUTHORIZED":
      statusCode = 401;
      message = "请先登录";
      break;
    case "USER_DOES_NOT_OWN_RESOURCE":
      statusCode = 403;
      message = "您不能处理这个内容";
      break;
    case "FILE_NOT_FOUND":
      statusCode = 404;
      message = "文件不存在";
      break;
    case "TAG_ALREADY_EXISTS":
      statusCode = 400;
      message = "标签已存在";
      break;
    case "POST_ALREADY_HAS_THIS_TAG":
      statusCode = 400;
      message = "内容已经有这个标签了";
      break;
    default:
      statusCode = 500;
      message = "服务器出了点问题～";
      break;
  }
  //设置状态码，返回错误信息给客户端
  res.status(statusCode).send({ message });
};
