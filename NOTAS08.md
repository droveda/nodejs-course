# TypeScript

* What is TypeScript and Why?  
  * It is a Superset of JavaScript.  
* Type Script has to be compiled into java script.  
* Adds features to the code and helps the development.  
* Strict type checks.  

```javascript
function add(num1, num2) {
    return num1 + num2;
}
console.log(add('2', '3')); //23
```

```typescript
type NumOrString = number | string;

function add(num1: NumOrString, num2: NumOrString) : (NumOrString) {
    if (typeof num1 === 'number' && typeof num2 === 'number' ) {
        return num1 + num2;
    } else if(typeof num1 === 'string' && typeof num1 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}
```


### TypeScript adds...
* Types!.  
* Nex-gen JavaScript Features (compiled down for older browsers).  
* Non-JavaScript Features like interfaces and Generics.  
* Meta-Programming Features like decorators.  
* Rich Configuration Options.  
* Modern Tooling that helps even in non-TypeScript ptojects.  

`npm install -g typescript@5.9.3 (this will install typescript globally).`.   
`tsc app.ts (this will compile the typescript code and generate the app.js file).`.    
`tsc --init (this will add the tsconfig.json file that has typescript configuration).`.   


## Some Types in TypeScript
* number
* string
* boolean
* object
* Array

Take a look at `basic-type-script-01` folder.  


## Node & TypeScript - Setup and Project
* tsc --init
* npm init
* npm install --save express
* npm install --save body-parser

