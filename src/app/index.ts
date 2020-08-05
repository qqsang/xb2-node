/**
 * 使用express框架
 */

import express from "express";
import postRouter from "../post/post.router";
import userRouter from "../user/user.router";
import authRouter from "../auth/auth.router";
import fileRouter from "../file/file.router";
import tagRouter from "../tag/tag.router";
import avatarRouter from "../avatar/avatar.router";
import commentRouter from "../comment/comment.router";
import likeRouter from "../like/like.router";
import { defaultErrorHandler } from "../app/app.middleware";
/**
 * 创建应用
 */

const app = express();

/**
 * 使应用能处理json的中间件
 */

app.use(express.json());

/**
 * 路由
 */

app.use(
  postRouter,
  userRouter,
  authRouter,
  fileRouter,
  tagRouter,
  avatarRouter,
  commentRouter,
  likeRouter
);
app.use(defaultErrorHandler);
export default app;
