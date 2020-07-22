/**
 * 定义评论内容数据类型
 */
export class CommentModel {
  id?: number;
  content?: string;
  postId?: number;
  userId?: number;
  parentId?: number;
}
