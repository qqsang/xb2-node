//导入nodejs自带的fs（文件系统）模块和path模块
const fs = require("fs");
const path = require("path");

/**
 * 读取密钥文件
 */
const privateKey = fs.readFileSync(path.join("config", "private.key"));
const publicKey = fs.readFileSync(path.join("config", "public.key"));

/**
 * 把读取的密钥文件内容转换成Base64格式
 */
const privateKeyBase64 = Buffer.from(privateKey).toString("base64");
const publicKeyBase64 = Buffer.from(publicKey).toString("base64");

/**
 * 在终端输出结果
 */
console.log("\nPrivate Key:");
console.log(privateKeyBase64);
console.log("\nPublic Key");
console.log(publicKeyBase64);
