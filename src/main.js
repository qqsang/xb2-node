const express = require('express');
const app = express();
const port = 3000;
/**
 * 使用JSON中间件
 */
app.use(express.json());

app.listen(port, () => {
  console.log('服务已启动');
})

app.get('/', (req, res) => {
  res.send('你好');
});

const data = [
  {
    name: 'lsc',
    age: 18,
    id: 1
  },
  {
    name: 'lxj',
    age: 19,
    id: 2
  },
  {
    name: 'fal',
    age: 20,
    id: 3
  }
];
/**
 * 创建内容
 */

app.post('/posts', (req, res) => {
  //获取请求里的数据
  const { content, age } = req.body;

  //设置响应状态码
  res.status(201);

  //作出响应
  res.send({ message: `成功创建了内容：${content},${age}` });
});

app.get('/posts/:postsId', (req, res) => {
  //console.log(req.params);
  //获取postsId
  const { postsId } = req.params;

  //查找具体内容
  const post = data.filter(item => item.id == postsId);

  //给客户端响应内容
  res.send(post[0]);
  //console.log(post);

});

