import express from "express";
/**
 * typescript提供了声明数据类型的功能，
 * 而Request, Response这两个数据类型，是express这个框架声明的。
 * 所以，要从express引入进来。这样理解对吗？
 */
import { Request, Response } from "express";
import { isConstructorDeclaration } from "typescript";
const app = express();
const port = 3000;

//使用json中间件处理客户端传上来的数据
app.use(express.json());
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
  const posts = data.filter((item) => item.id == parseInt(postId));
  //console.log(posts[0]);

  //响应客户端的请求
  res.send(posts[0]);
  res.end();
});

/**
 * 创建内容用的应用接口
 */

app.post("/posts", (req: Request, res: Response) => {
  const { content } = req.body;
  //console.log(content);
  //获得请求的头部数据
  const header1 = req.headers["content-type"];
  const header2 = req.headers.abc;
  console.log(header1);
  console.log(header2);
  //在响应之前设置状态码，
  res.status(202);
  //作出响应
  res.send({
    message: `创建成功，已创建的内容是：${content}`,
  });
  res.end();
});
