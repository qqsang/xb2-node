//引入数据库链接方法
import { connection } from "../app/database/mysql";
//引入定义好的post的数据类型
import { postModel } from "../post/post.model";
//定义一个服务方法，从数据库拿到数据。从数据库拿数据，需要数据库mysql处理，需要时间，所以用异步函数async。
export const getPosts = async () => {
  //定义从数据库拿数据的语句
  const statement = `
  SELECT 
    post.id,
    post.title,
    post.content,
    JSON_OBJECT(
      'id',user.id,
      'name',user.name
    ) as user
    FROM post
    LEFT JOIN user
      ON user.id = post.userId`;
  //使用connection方法执行上面的sql语句，从数据库拿东西出来。
  const [data] = await connection.promise().query(statement);
  //导出拿到的数据。
  return data;
};

/**
 * 定义带参数访问内容的接口服务
 */
export const getPostsById = async (postId: number) => {
  //准备查询
  const statement = `
  SELECT 
    post.id,
    post.title,
    post.content,
  JSON_OBJECT(
    'id',user.id,
    'name',user.name
  ) as user
  FROM post
  LEFT JOIN user
    ON user.id = post.userId
  WHERE post.id=?`;
  //执行查询
  const [data] = await connection.promise().query(statement, postId);
  //返回结果
  return data;
};
/**
 * 定义创建内容的接口
 */
export const creatPosts = async (post: postModel) => {
  //准备查询
  const statment = `
  INSERT INTO post
  SET ?`;
  //创建查询
  const [data] = await connection.promise().query(statment, post);
  //返回数据
  return data;
};

/**
 * 定义更新内容接口
 */
export const updatePosts = async (postId: number, post: postModel) => {
  //准备sql语句，用于更新数据库内容
  const statement = `
  UPDATE post
  SET ?
  WHERE id=?`;
  //根据提供的postId更改数据库中的数据；上面的第一个 ？ 由post提供，第二个 ？ 由postId提供
  const [data] = await connection.promise().query(statement, [post, postId]);
  return data;
};

/**
 * 定义删除数据库中内容的接口
 */
export const deletePosts = async (postId: number) => {
  //准备sql删除语句
  const statement = `
  DELETE FROM post
  WHERE id = ?`;
  //执行删除
  const [data] = await connection.promise().query(statement, postId);
  return data;
};

/**
 * 创建内容tag
 */
export const creatPostTag = async (postId: number, tagId: number) => {
  //准备查询
  const statement = `
    INSERT INTO post_tag (postId,tagId)
    VALUES(?,?)`;

  //执行查询
  const [data] = await connection.promise().query(statement, [postId, tagId]);

  //提供数据
  return data;
};

/**
 * 检查内容是否已经被打了标签
 */
export const postHasTag = async (postId: number, tagId: number) => {
  //准备查询sql
  const statement = `
  SELECT * FROM post_tag
  WHERE postId = ? AND tagId = ?
  `;
  //执行查询
  const [data] = await connection.promise().query(statement, [postId, tagId]);

  //提供数据
  return data[0] ? true : false;
};

/**
 * 定义删除内容标签的服务
 */
export const deletePostTag = async (postId: number, tagId: number) => {
  //准备查询sql语句
  const statement = `
  DELETE FROM post_tag
  WHERE postId = ? AND tagId = ?`;

  //执行查询
  const data = await connection.promise().query(statement, [postId, tagId]);

  //返回数据
  return data;
};
