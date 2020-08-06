/**
 * SQL 查询片段
 */
export const sqlFragment = {
  leftjoinuser: `
    LEFT JOIN user
      ON user.id = comment.userId
    LEFT JOIN avatar
      ON user.id = avatar.userId
  `,
  user: `
    JSON_OBJECT(
      'id',user.id,
      'name',user.name,
      'avatar',IF(COUNT(avatar.id),1,null)
    ) AS user
  `,
  leftjoinpost: `
    LEFT JOIN post
      ON post.id = comment.postId
  `,
  post: `
    JSON_OBJECT(
      'id',post.id,
      'title',post.title
    ) AS post
  `,
};
