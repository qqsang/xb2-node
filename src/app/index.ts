/**
 * 使用express框架
 */

import express from "express";
import postRouter from "../post/post.router";
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

app.use(postRouter);
app.use(defaultErrorHandler);

export default app;
