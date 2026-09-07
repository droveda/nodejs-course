# Automated Tests
* Manual test code
* Automated code testing

## Why Testing?
* Automatically test everything
* Easily detect breaking changes
* ensure prodictable and clearly defined testing steps

## Testing Tools & Setup
* Running the tests
  * asserting results
* execute the test code
  * validating the test outcome
* Mocha (testing library/framework)
* Chai (testing library/framework)
* Sinon (to create stubs and mocks)

npm install --save-dev mocha chai
npm install --save-dev sinon  
npm test     

```json
"devDependencies": {
    "chai": "^4.5.0",
    "mocha": "^10.8.2",
    "nodemon": "^3.1.14"
  }
```

### Useful Resources:
* Mocha: https://mochajs.org/
* Chai: https://www.chaijs.com/
* Sinon: https://sinonjs.org/

# npm & Node as a Build Tool
* Beyond Node Web Servers
* Node.js
  * execute code
  * interact with files
* npm
  * manage packages
  * Run Scripts

## Understanding npm
* Node Package Manager
* npm CLI
* npm Repository
* npm install
* https://www.npmjs.com/
* npm install express@4.16.4
* https://docs.npmjs.com/
* https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies
* https://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json/25861938#25861938

Remember: Node can execute any .js File!  

### What is a "Build Tool" and Why?
Generate Optimized Code.  
Primarily important in frontend development.  
npm run build.  

### Useful resources:
* Official npm Docs: https://docs.npmjs.com/
* Learn more about Webpack (a build tool using Node.js): https://academind.com/tutorials/webpack-2-the-basics

# Modern JavaScript & NodeJS
ES Modules.  
Promises in Core APIs.  

## What are "ES Modules"?
* Import/Export Syntax for modern JavaScript in the Browser.  
* export const doSomething = () => { ... };
* import { doSomething } from 'my-file';
