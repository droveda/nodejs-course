const num1Element = document.getElementById('num1');
const num2Element = document.getElementById('num2');
const buttonElement = document.querySelector('button');
const numResults = [];
const textResults = [];
class MyClass {
    // name: string;
    // age: number;
    constructor(name, age) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num1 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}
function printResult(resultObj) {
    console.log(resultObj.val);
}
buttonElement === null || buttonElement === void 0 ? void 0 : buttonElement.addEventListener('click', () => {
    const num1 = num1Element === null || num1Element === void 0 ? void 0 : num1Element.value;
    const num2 = num2Element === null || num2Element === void 0 ? void 0 : num2Element.value;
    // console.log(add(1, 6));
    const result = add(+num1, +num2);
    numResults.push(result);
    const stringResult = add(num1, num2);
    textResults.push(stringResult);
    console.log(result);
    console.log(stringResult);
    printResult({
        val: result,
        timestamp: new Date()
    });
    console.log(numResults, textResults);
    const c = new MyClass('Droveda', 35);
    console.log(c.getName());
});
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('It Worked!');
    }, 1000);
});
myPromise.then((result) => {
    console.log(result.split(' '));
});
export {};
//# sourceMappingURL=app.js.map