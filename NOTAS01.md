# What is NodeJs?

A JavaScript Runtime.  
JavaScript on the Server.  

NodeJS uses V8 and compiles JavaScript to Machine code.  

## Installing NodeJS and Creating the first App.
* install from the website
* node -v
* node (interactive mode)
* node first-app.js

## Undestanding the Role and Usage of NodeJS
* Basically you use node Js to write server side code, but this is not the only option you can akso write client side code
* NodeJs in Web Development
  * Run Server - Create Server & Listen to Incoming Requests
* Business Logic
  * Handle Requests, Validate Input, Connect to Databases
* Responses
  * Return Responses (Rendered HTML, JSON, ...)


# JavaScript Basics
* Weakly Typed Language
* Object Oriented
* Versatile Language

```javaScript
const copiedArray = [...hobbies]; //spread operator.

const toArray = (...args) => { //rest operator
    return args;
}

// destructing example
const printName = ({ name, age }) => {
    console.log(name);
    console.log(age);
}

printName(person);

const { name, age } = person;
console.log(name, age);

let [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);

const name = "Max";
const age = 29;
console.log(`My name is ${name} and I am ${age} years old.`);
```