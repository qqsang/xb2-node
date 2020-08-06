import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import {
  getPosts,
  getPostsById,
  creatPosts,
  updatePosts,
  deletePosts,
  creatPostTag,
  postHasTag,
  deletePostTag,
  getPostsTotalCount,
} from "./post.service";
import { tagModel } from "../tag/tag.model";
import { createTag, getTagByName } from "../tag/tag.service";
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
    //统计内容数量
    const totalCount = await getPostsTotalCount({ filter: req.filter });
    //设置响应头部
    res.header("X-Total-Count", totalCount);
  } catch (error) {
    next(error);
  }

  try {
    //用定义好的数据服务方法getPosts()从数据库拿到数据，异步操作。
    const posts = await getPosts({
      sort: req.sort,
      filter: req.filter,
      pagination: req.pagination,
    });
    res.send(posts);
    //如果出错，执行catch
  } catch (error) {
    //用next()把错误交给中间件处理。
    next(error);
  }
};

/**
 * 定义单个内容接口处理器
 * @param req
 * @param res
 * @param next
 */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  //获得请求地址的postId参数
  const { postId } = req.params;
  //console.log(postId);
  try {
    const data = await getPostsById(parseInt(postId, 10));
    res.send(data);
  } catch (error) {
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
  const { id: userId } = req.user;
  //把title content 存到数据库中
  try {
    //用一下定义好的创建内容接口creatPosts(),把数据存入数据库
    const data = await creatPosts({ title, content, userId });
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

/**
 * 删除数据库中的数据
 */
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //获取要删除的id
  const { postId } = req.params;
  //执行删除
  const data = await deletePosts(parseInt(postId, 10));
  res.send(data);
};

/**
 * 添加内容标签
 */
export const storePostTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //准备数据
  const { postId } = req.params;
  const { name } = req.body;
  let tag: tagModel;
  //console.log(name);

  //查找标签
  try {
    tag = await getTagByName(name);
  } catch (error) {
    return next(error);
  }

  //找到了标签，接着验证改内容是否已存在该标签
  if (tag) {
    try {
      const postTag = await postHasTag(parseInt(postId, 10), tag.id);
      if (postTag) return next(new Error("POST_ALREADY_HAS_THIS_TAG"));
    } catch (error) {
      return next(error);
    }
  }

  //没找到标签，就创建这个标签
  if (!tag) {
    try {
      const data = await createTag({ name });
      //console.log(data);
      tag = { id: data.insertId };
    } catch (error) {
      return next(error);
    }
  }

  //给内容打上标签
  try {
    await creatPostTag(parseInt(postId, 10), tag.id);
    res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};

/**
 * 定义移除内容标签的接口
 */
export const destroyPostTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //准备数据
  const { postId } = req.params;
  const { tagId } = req.body;
  //console.log(tagId);

  //移除内容标签
  try {
    await deletePostTag(parseInt(postId, 10), tagId);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
