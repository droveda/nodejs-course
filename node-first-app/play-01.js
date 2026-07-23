const name = 'Max';
let age = 29;
const hasHobbies = true;

age = 30;

// var is kind of an outdated way to declare variables, but it is still used in some codebases. The modern way to declare variables or constants is by using let and const.

console.log(name);

const sumarizeUser2 = (userName, userAge, userHasHobby) => {
    return (
        'Name is ' + userName +
        ', age is ' + userAge +
        ', and the user has hobbies: ' + userHasHobby
    );
};

function sumarizeUser(userName, userAge, userHasHobby) {
    return (
        'Name is ' + userName +
        ', age is ' + userAge +
        ', and the user has hobbies: ' + userHasHobby
    );
}

const add = (a,b) => a + b;
const addOne = a => a + 1;
const addRandom = () => 1 + 2;

console.log(sumarizeUser(name, age, hasHobbies));

console.log(sumarizeUser2('Diegues', 42, false));

console.log(add(1, 2));
console.log(addOne(5));
console.log(addRandom());