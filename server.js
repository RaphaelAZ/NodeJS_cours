const http = require('http');
const app = require('./app');

const port = 6000;
const server = http.createServer(app);

server.on('error', function (err) {
    console.log(err);
    process.exit(1);
});
server.on('listening', function () {
    console.log('Server is listening on port' + port);
});

server.listen(port);