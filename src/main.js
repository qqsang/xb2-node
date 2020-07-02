const http = require('http');
const server = http.createServer((req, res) => {
  const data = {
    id: '1',
    title: 'llldasd',
    name: '李善创'
  };
  const jsondata = JSON.stringify(data);

  switch (req.url) {
    case '/':
      res.write('hello~');
      break;
    case '/map':
      res.write('map');
      break;
    case '/search':
      res.write('search');
      break;
    case '/json':
      res.writeHead(200, { 'Content-Type': 'application/json,charset=uft-8' });
      res.write(jsondata);
      break;
    default:
      res.writeHead(404);
      res.write('404');
      break;

  }
  res.end();
});
server.listen(3000, () => { console.log('服务已启动'); });