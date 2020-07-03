import express from "express";
/**
 * typescript提供了声明数据类型的功能，
 * 而Request, Response这两个数据类型，是express这个框架声明的。
 * 所以，要从express引入进来。这样理解对吗？
 */
import { Request, Response } from "express";
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log("test服务已启动");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hi tester~");
});

const data = [
  {
    id: 1,
    name: "lsc",
    sex: "nan",
  },
  {
    id: 2,
    name: "fal",
    sex: "nv",
  },
  {
    id: 3,
    name: "llz",
    sex: "nan",
  },
];

/**
 * 创建json数据响应接口
 */

app.get("/posts", (req: Request, res: Response) => {
  //const jsondata = JSON.stringify(data);//因为express自动帮处理，所以不需要JSON.stringify()转化成json数据格式
  res.send(data);
});

/**
 * 定义带参数带json数据接口，客户端带参数访问，服务端响应请求
 */

app.get("/posts/:postId", (req: Request, res: Response) => {
  //获取客户端请求参数postId
  const { postId } = req.params;
  //console.log(postId);

  //根据客户端请求参数postId，查找服务器对应的内容。
  const content = data.filter((item) => item.id == parseInt(postId));
  //console.log(content[0]);

  //响应客户端的请求
  res.send(content[0]);
  res.end();
});
