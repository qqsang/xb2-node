import request from "supertest";
import app from "../app";
import { connection } from "../app/database/mysql";
import { greet } from "./playground/demo";

/**
 * 测试单元
 */
describe("演示测试单元", () => {
  //测试
  test("测试greet函数", () => {
    //准备
    const greeting = greet("李善创");

    //断言
    expect(greeting).toBe("你好，李善创");
  });
});

/**
 * 测试接口
 */
describe("演示接口测试", () => {
  //测试完成后端口数据库链接
  afterAll(async () => {
    connection.end();
  });

  //测试接口
  test("测试接口 GET /", async () => {
    //请求接口
    const response = await request(app).get("/");

    //作出断言
    expect(response.status).toBe(200); //响应状态码应该是200
    expect(response.body).toEqual({ title: "小白兔开发之路" });
  });

  test("测试接口 POST /echo", async () => {
    //请求接口
    const response = await request(app)
      .post("/echo")
      .send({ massage: "你好～" });

    //作出断言
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ massage: "你好～" });
  });
});
