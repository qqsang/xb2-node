//导入定义好的数据类型
import { TokenPayload } from "../src/auth/auth.interface";
import {
  GetPostsOptionsFilter,
  GetPostsOptionsPagination,
} from "../src/post/post.service";
//将定义好的数据类型，扩展给Request类型
//这个Request类型是express这个包定义的。我们要扩展它。
//扩展它之后，需要配置tsconfig.json这个文件，"files": ["types/express.d.ts"]，让ts引擎能找到这个声明的类型
declare global {
  namespace Express {
    export interface Request {
      user: TokenPayload; //扩展Request 类型，让使用后的请求带着这个属性
      fileMetaData: { width?: number; height?: number; metadata: {} }; //扩展上传图像文件请求类型
      sort: string; //用于查询
      filter: GetPostsOptionsFilter; //用于查询过滤
      pagination: GetPostsOptionsPagination; //用于分页
    }
  }
}
