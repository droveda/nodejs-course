const http = require('http'); //import global module from NodeJs. 
// require('./http.js') // will look for a local module using relative path, for instance in the same folder of my current file

const routes = require('./routes');
console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(3000);
