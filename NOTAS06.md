# Error Handling
* Technical/Network Errors
  * MongoDB Server is down
  * Show error page to the user
* Expected Errors
  * File can't be read, database operation fails
  * Inform user, possibly retry
* Bugs/Logical Errors
  * User object used when it does not exist
  * Fix during developent

## Working with Errors
* Error is thrown
  * Synchronous Code: try-catch
  * Asynchronous Code
    * then() - catch()
  * Directly handle error
  * Using Express error handling function
* No Error is thrown
  * Validate values
    * Decide if
      * Throw error
      * Directly handle error

Error Page (e.g 500 page).  
Response Page with error information.  
Redirect.  


Error Handling in Express.js - Official Docs: https://expressjs.com/en/guide/error-handling.html.  


# File Upload & Download
`npm install --save multer`.  


* Multer Official Docs: https://github.com/expressjs/multer
* Streaming Files: https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93
* Generating PDFs with PDFKit: http://pdfkit.org/docs/getting_started.html

# Pagination


# Adding Payments
* Stripe


# Rest APIs
* Example: Build a Complete RESTful API from Scratch: https://academind.com/learn/node-js/building-a-restful-api-with/


# Async / Await
Working with Async Code more Elegantly.  

What?  
Asynchronous Requests in a Synchronous Way*.  
* Only by the way it looks, NOT by the way it bahaves.    

Async-await - More Details: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function    

* See feed.js on the Rest Api Project to see an example of async and await


# WebsSckets
Real-Time Web Services with WebSockets.  
Pushing Data from Server to Client.  

If we want the server to send information to the client we use WebSockets instead of HTTP.  

* With HTTP => Request/Response.  
* With WebSockers => Server PUSH Data to the Client.  
* npm install --save socket.io (install this on the server)
* npm install --save socket.io-client (install this on the client (front-end))


## WebSockets Useful Resources
* Socket.io Official Docs: https://socket.io/get-started/chat/
* Alternative Websocket Library: https://www.npmjs.com/package/express-ws


# GraphQL
* npm install --save graphql
* npm install --save express-graphql
* http://localhost:8080/graphql
* Detailed Guide on GraphQL: https://graphql.org

# Deploying your application
* Preparing for deployment
* Deployment Steps & Config
* Security

## Which Kind of Application
* Server Side rendering views
  * vanilla html
  * templateing engine (e.g. ejs)
* APIs
  * REST
  * GraphQL
* The two has the same hosting Requirements

### Deployment Preparations
* Use Environment Variables
  * Avoid hard-coded values in your code
* Use Production API Keys
* Reduce Error Output Details (Do not send sensitive info to yours users)
* Set Secure Response Headers (Implement Best Practices)
* Add Asset Compression (Reduce Response Size)
* Configure Logging (Stay up to date about what is happening)
* use SSL/TLS (Encrypt data in transit)
