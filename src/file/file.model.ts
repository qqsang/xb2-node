/**
 * 定义file数据模型
 */
export class FileModel {
  id?: string;
  originalname: string;
  mimetype: string;
  filename: string;
  size: number;
  userId: number;
  postId?: number;
}
