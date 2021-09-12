var http = require('http')

const server = http.createServer((req, res) =>{
  res.end("my first respone");
})

server.listen(3000);
