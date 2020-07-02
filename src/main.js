const express = require('express');
const app = express();
const port = 3000;

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
app.get('/posts', (req, res) => {
  res.send(data);
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

})