import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { getPosts, creatPosts, updatePosts } from "./post.service";
/**
 * 内容列表接口
 * @param req 获取HTTP请求
 * @param res 响应HTTP请求
 * @param next
 */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //if (req.headers.authorization !== "SECRET") {
  //  return next(new Error());
  //}
  // try 先执行，如果有错，就报错，执行catch 板块下面的语句。
  try {
    //用定义好的数据服务方法getPosts()从数据库拿到数据，异步操作。
    const posts = await getPosts();
    res.send(posts);
    //如果出错，执行catch
  } catch (error) {
    //用next()把错误交给中间件处理。
    next(error);
  }
};

/**
 * 创建内容
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //接收从客户端发过来的title content
  const { title, content } = req.body;
  //把title content 存到数据库中
  try {
    //用一下定义好的创建内容接口creatPosts(),把数据存入数据库
    const data = await creatPosts({ title, content });
    //告诉客户端，我存好数据了
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 更新数据库中的内容
 */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //拿到客户端请求要更改的内容页面的id
  const { postId } = req.params;
  //拿到客户端请求要更改的内容
  //这里用了一个lodash包的一个方法.pick(),这个方法从请求的内容中挑选需要的内容，生成一个对象。
  //如果这个req.body只有一个title，那么这个post对象只有一个title值对。
  //解决更新title内容后content内容变为空的问题。
  const post = _.pick(req.body, ["title", "content"]);
  //把拿到的内容更新到数据库
  try {
    const data = await updatePosts(parseInt(postId, 10), post);
    res.send(data);
  } catch (error) {
    next(error);
  }
};
