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