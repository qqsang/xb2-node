/**
 * 定义评论内容数据类型
 */
export class CommentModel {
  id?: number;
  comment?: string;
  postId?: number;
  userId?: number;
  parentId?: number;
}
