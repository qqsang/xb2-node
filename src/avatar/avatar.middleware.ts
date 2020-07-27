import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { fileFilter } from "../file/file.middleware";

/**
 * 创建一个文件过滤器
 */
const avatarFilter = fileFilter(["image/jpg", "image/jpeg", "image/png"]);

/**
 * 创建一个multer
 */
const avatarUpload = multer({
  dest: "uploads/avatar",
  fileFilter: avatarFilter,
});

/**
 * 创建文件拦截器
 */
export const avatarInterceptor = avatarUpload.single("avatar");
