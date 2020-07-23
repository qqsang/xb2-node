/**
 * sql查询片段
 */
export const sqlFragment = {
  user: `
  JSON_OBJECT(
    'id',user.id,
    'name',user.name
  ) as user
  `,
  leftjoinuser: `
  LEFT JOIN user
  ON user.id = post.userId
  `,
};