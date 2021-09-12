var http = require('http')
var app = require('./backend/app')

const port = 3000;

app.set('port', port)
const server = http.createServer(app)

server.listen(port);
