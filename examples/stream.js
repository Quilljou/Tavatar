const http = require('http');
const url = require('url');
const Navatar = require('../index')
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

const PORT = 2000;

const server = http.createServer((req, res) => {
  let urlObj = url.parse(req.url);
  let method = req.method;
  let pathname = urlObj.pathname;

  var body = '';
  req.on('data',function(chunk) {
    body += chunk;
  })
  req.on('end',function() {
    console.log(body);
  })

  switch (method) {
    case 'GET':
      switch (pathname) {
        case '/avatar':
          let { size, name } = querystring.parse(urlObj.query)
          size = parseInt(size,10)
          navatar = new Navatar(name, size);
          res.writeHead(200, {
               'Content-Type': 'image/png',
           });
          navatar.stream().pipe(res)
          break;
        case '/download':
          var rs = fs.createReadStream(path.join(__dirname,'./a.txt'));
          rs.pipe(res);
        case '/get':
          res.end('get 收银机')
        default:
          res.end('404')
      }
      break;
    case 'POST':
      switch (pathname) {
        case '/post':
          res.end('post 收银机')
        default:
          res.end('404')
      }
    break;
  }

}).listen(PORT);

server.on('listening', () => {
  console.log('Server is listening in Port %d', PORT);
})
