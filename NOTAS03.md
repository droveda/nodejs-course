# Express.js
Do not re-invent the Wheel!  

* What is Express.js?
* Using Middleware
* Working with Requests and Responses (Elegantly)
* Routing

## What is Express.js ?
* Server Logic is Complex!  
* You want to focus on your Business Logic, not on the nitty-gritty Details! 
* Use a Framework for the Heavy Lifting!
* Alternatives to Express.js
  * Vanilla Node.js
  * Adonis.js
  * Koa
  * Sails.js
  * ...


## Install express.js
* npm install --save express
* basic-express-app (place where I did the lab)

### Middleware
It is all about Middleware.  
A middleware means that an incomming request is funelled through a bunch of functions.  

No Express, um middleware é uma função que recebe:  
Ela pode:  
* Ler/modificar a requisição
* Ler/modificar a resposta
* Executar lógica antes do controller
* Executar lógica depois (dependendo de como foi implementado)
* Interromper a requisição
* Encaminhar para o próximo middleware usando next()


Aqui o fluxo:  
* Request -> Middleware (next()) -> Middleware (res.send()) -> Response

Middleware examle:  
```javaScript
const http = require('http');

const express = require('express');

const app = express();
app.use((req, res, next) => {
    console.log('In the middleware!');
    next();
});

app.use((req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from express!</h1>');
});

const server = http.createServer(app);

server.listen(3000);
```

//module.exports = path.dirname(process.mainModule.filename);
//module.exports = path.dirname(require.main.filename);

# Summary

## What is Express.js
* Express.js is a Node.js framework - a package that adds a bunch of utility functions and tools and a clear set of rules on how the app should be built (middleware!)\
* It is highly extensible and other packages can be pugged into it (middleware)

## Middleware, next() and res()
* Express.js relies heavily on middleware functions - you can easily add them by calling use()
* Middleware functions handle a request and should call next() to forward the request to the next function in line or send a response 

## Routing
* You can filter requests by path and method
* If you filter by method, paths are matched exactly, otherwise, the first segment of a URL is matched
* You can use the express.Router to split your routes across files elegantely

## Server Files
* You are not limited to serving dummy text as a response
* You can sendFile()s to your users - e.g. HTML files
* If a request is directly made for a file (e.g. a .css file is requested), you can enable static serving for such files via express.static()