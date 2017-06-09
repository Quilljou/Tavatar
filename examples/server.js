const http = require('http');
const url = require('url');
const Navatar = require('../index')
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

const PORT = 2000;


const server = http.createServer((req, res) => {
let urlObj = url.parse(req.url);
let pathname = urlObj.pathname.slice(8);
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
  default:
    res.end('404')
}
}).listen(PORT);

server.on('listening', () => {
console.log('Server is listening in Port %d', PORT);
})
