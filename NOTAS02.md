# Core Modules
* http
* https
* fs
* path
* os

```javaScript
const http = require('http'); //import global module from NodeJs. 
// require('./http.js') // will look for a local module using relative path, for instance in the same folder of my current file


const server = http.createServer((req, res) => {
    console.log(req);
});

server.listen(3000);
```

## Node.js Program Lifecycle

1. node app.js
2. start script
3. parse code, register variables & functions
4. Event Loop (Keeps running as long as there are event listeners registered)
5. process.exit (exits the program)

Note: nodejs uses a single thread and the event loop takes care of processing the requests, but in the background it uses multi-threading.  


### Single Thread, Event Loop & Blocking Code

* Single JavaScript Thread
* The event loop is automatically starterd by nodejs
  * It is responsible for handling event callbacks
* A blocking operation like file system operation is sent to a worker pool (Do the heavy lifiting) (It runs on different Threads)
  * once the worker is done it will call the trigger for the callback and the event loop will handle it

#### The Event Loop
* Handles all the callbacks
* Timers
  * Execute setTimeout, setInterval Callbacks
* Pending Callbacks
  * Execute I/O related Callbacks that were deferred
* Poll
  * Retrieve new I/O events, execute their callbacks
* Check
  * Execute setImmediate() callbacks
* Close Callbacks
  * Execute all 'close' event callbacks
* process.exit if no more events refs == 0


## References
* Official Node.js Docs: https://nodejs.org/learn
* Full Node.js Reference (for all core modules): https://nodejs.org/docs/latest/api/
* More about the Node.js Event Loop: https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick
* Blocking and Non-Blocking Code: https://nodejs.org/learn/asynchronous-work/dont-block-the-event-loop

# NPM
Node package Manager.  

* npm init (this will initialize a node project)
* npm start (this will start the app)
* npm run start-server (for your own scripts, it requires the word "run") 

## npm & packages
* Local Project
* Your code
* core node packages
* Dependencies (3rd party)
* npm Repository (installed & managed via npm).  
* npm install nodemon --save-dev
* https://www.npmjs.com/package/nodemon
* if you just run npm install, it will go for all your packages install and update the packages picking a later version if available
* package-lock.json file just store the exact versions that were installed. If you share the project with that it will get that versions on lock file.

# Global Features vs Core Modules vs Third-Party Modules
* **Global features**: Keywords like const or function but also some global objects like process
* **Core Node.js Modules**: Examples would be the file-system module ("fs"), the path module ("path") or the Http module ("http")
* **Third-party Modules**: Installed via npm install - you can add any kind of feature to your app via this way

Global features are always available, you don't need to import them into the files where you want to use them.  
Core Node.js Modules don't need to be installed (NO npm install is required) but you need to import them when you want to use features exposed by them.  

Third-party Modules need to be installed (via npm install in the project folder) AND imported.  

## Global & Local npm Packages
Third-party Modules need to be installed (via npm install in the project folder) AND imported.  
In order to install a dependency globally you can run `npm install -g nodemon` the -g flag does the trick.  

You can differentiate between production dependencies (--save), development dependencies (--save-dev) and global dependencies (-g).  

# Types of Errors
* Syntax Errors
* Runtime Errors
* Logical Errors

### Debugging
Debugging is simple using vs code. 
1. Open the app.js file (the entryooint file)
2. go to Run -> Start Debugging on vs code.
3. Add a breakpoint, at this point it should work fine
4. https://code.visualstudio.com/docs/nodejs/nodejs-debugging
5. https://nodejs.org/en/docs/guides/debugging-getting-started/