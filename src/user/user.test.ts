import request from "supertest";
import app from "../app";
import bcrypt from "bcrypt";
import { connection } from "../app/database/mysql";
import { signToken } from "../auth/auth.service";
import { deleteUser, getUserById } from "./user.service";
import { userModel } from "./user.model";

/**
 * 准备测试数据
 * 一个用户
 */
const testUser: userModel = {
  name: "测试用户",
  password: "121212",
};

/**
 * 准备测试数据
 * 一个要改名的或改密码的用户
 */
const testUpdateUser: userModel = {
  name: "测试用户新",
  password: "123123",
};

/**
 * 预先声明一个
 */
let testUserCreated: userModel;

/**
 * 所有测试结束后做一件事
 * 结束数据库链接
 */
afterAll(async () => {
  //删除测试用户
  if (testUserCreated) {
    await deleteUser(testUserCreated.id);
  }

  //结束数据库链接
  connection.end();
});

/**
 * 开始测试
 */
describe("测试创建用户接口", () => {
  test("创建用户时必须提供用户名", async () => {
    const response = await request(app)
      .post("/users")
      .send({ password: testUser.password });

    //作出断言
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("请提供用户名");
  });

  test("创建用户时必须提供密码", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: testUser.name });

    //作出断言
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("请提供密码");
  });

  test("成功创建用户以后 响应状态码应该是 201", async () => {
    const response = await request(app).post("/users").send(testUser);
    //console.log(response);

    //成功创建的用户找出来，一会儿要删掉
    testUserCreated = await getUserById(parseInt(response.body.insertId), {
      password: true,
    });

    //作出断言
    expect(response.status).toBe(201);
  });

  test("获取某个用户 响应里应该包含指定属性", async () => {
    //请求接口
    const response = await request(app).get(`/user/${testUserCreated.id}`);

    expect(response.body.name).toBe(testUser.name);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      avatar: null,
    });
  });
});

/**
 * 测试用户账户
 */
describe("测试用户账户接口", () => {
  test("响应里应该包含指定属性", async () => {
    //发出请求
    const response = await request(app).get(`/user/${testUserCreated.id}`);

    //作出断言
    expect(response.body.name).toBe(testUser.name);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      avatar: null,
    });
  });

  test("当用户不存在时，响应状态码应该时404.", async () => {
    const response = await request(app).get("/users/-1");
    //作出断言
    expect(response.status).toBe(404);
  });
});

/**
 * 测试更新用户
 */
describe("测试更新用户", () => {
  test("更新用户需要验证身份", async () => {
    const response = await request(app).patch("/users");
    //作出断言
    expect(response.status).toBe(401);
  });

  test("更新用户数据", async () => {
    //签发令牌
    const token = signToken({
      payload: { id: testUserCreated.id, name: testUserCreated.name },
    });
    //请求接口
    const response = await request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        validate: {
          password: testUser.password,
        },
        update: {
          name: testUpdateUser.name,
          password: testUpdateUser.password,
        },
      });
    //获取用户
    const user = await getUserById(testUserCreated.id, { password: true });

    //对比密码
    const matched = await bcrypt.compare(
      testUpdateUser.password,
      user.password
    );

    //作出断言
    expect(response.status).toBe(200);
    expect(matched).toBeTruthy();
    expect(user.name).toBe(testUpdateUser.name);
  });
});
