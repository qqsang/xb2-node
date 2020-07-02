const http = require('http');
const server = http.createServer((reg, res) => {
  const data = {
    name: 'lsc',
    sex: 'man',
    age: '18'
  };
  const jsondata = JSON.stringify(data);
  switch (reg.url) {
    case '/':
      res.write('hello~');
      break;
    case '/json':
      res.writeHead(200, { 'Conten-Type': 'application/json,charset=utf-8' });
      res.write(jsondata);
  }
  res.end();
});
server.listen(3000, () => { console.log('服务已启动～') });
