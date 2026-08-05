# NoSQL and Using MongoDB
* npm install --save mongodb

## Useful resource
* MongoDB Official Docs: https://docs.mongodb.com/manual/core/security-encryption-at-rest/https://docs.mongodb.com/manual/
* SQL vs NoSQL: https://academind.com/learn/web-dev/sql-vs-nosql/
* Learn more about MongoDB: https://academind.com/learn/mongodb

# Mongoose
A MongoDB ODM.  

A Object-Document Mapping Library.  

## Core Concepts
* Schemas & Models -> e.g. User, Product
* Instances -> const user = new User()
* Queries -> User find()

npm install --save mongoose  

## Userful Resource & Links
* Mongoose Official Docs: https://mongoosejs.com/docs/

# Sessions & Cookies

## What is a Cookie?
* A Cookie is set via Response Header.  
* A Cookie can store information in the browser.  
* IMPORTANT: Cookies are stored on the client-side!
* User -> front end (Views) -> Server (Node App) -> Set the cookie via Response Header

## What is a Session?
* User -> front end (Views) -> Server (Node App) -> Session
* A Session can be stored in a Database
* We will associate with user/client via cookie (In the cookie we will store the ID of the Session) for security we will store the hash of the ID
* IMPORTANT: Sessions are stored on the server-side!!!!

`npm install --save express-session`   
`npm install --save connect-mongodb-session`  


### Useful resource:
* More on Sessions: https://www.quora.com/What-is-a-session-in-a-Web-Application
* More on Cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
* Express-session Official Docs: https://github.com/expressjs/session


# Authentication

## for password encryption
npm install --save bcryptjs


## CSRF Attacks
Cross-Site Request Forgery.  
`npm install --save csurf`   


### csurf() Alternatives
Unfortunately, the csurf package, which is used in some sections of this course, is no longer maintained at this time. The development team recently deprecated this popular package, saying that it should no longer be used (https://github.com/expressjs/csurf#deprecated).  

The purpose of the corresponding course lectures is to explain the general principle of CSRF attacks. You can still safely use the deprecated package for learning purposes, since attacks are only simulated locally in our code.  

However, in practice you should now choose a different package (https://www.npmjs.com/search?q=express%20csrf). You may, for example, consider using this package (which has a different API than csurf()): https://www.npmjs.com/package/csrf-csrf.  

Please understand that support in this course currently still focuses on the csurf API, as shown in the course videos and code snapshots.  

And most importantly, the general principle explained in this course is package independent.  


## Error messages and flash messages
npm install --save connect-flash  
