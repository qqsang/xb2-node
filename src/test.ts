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
