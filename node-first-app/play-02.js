const person = {
    name: 'Max',
    age: 29,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
};

person.greet();

const hobbies = ['Sports', 'Cooking'];

for (let hobby of hobbies) {
    console.log(hobby);
}

console.log(hobbies.map(hobby => {
    return 'Hobby: ' + hobby
}));
console.log(hobbies);

hobbies.push('Music');
console.log(hobbies);

const copiedArray = [...hobbies]; //spread operator
console.log(copiedArray);

const toArray = (...args) => { //rest operator
    return args;
}

console.log(toArray(1, 2, 3, 4));

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