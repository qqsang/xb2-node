import { Request, Response, NextFunction } from "express";
import multer from "multer";

/**
 * 创建一个multer
 */
const fileUpload = multer({
  dest: "uploads/", //设置文件上传的位置
});

/**
 * 创建文件拦截器
 * single()处理单个文件上传
 * single(‘file’)中‘file’是客户端上传文件用的表单字段起的名字
 */
export const fileInterceptor = fileUpload.single("file");
