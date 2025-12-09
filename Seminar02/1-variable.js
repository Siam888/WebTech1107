

//7 Primitive types
//number, string, bolean, bigint, symbol, null, undefined
//Object types
// Arrays, Functions, Objects, etc.



// var         
//  function-scoped
// 
// let , const
//  block-scoped

{
    let x = 1;
    var y = 2;
}

function f1() {
    var z = 3;
}

//console.log(x);
console.log(y);
// console.log(z);

// Hoisting -> process where variable and function DECLARATIONS are moved to the top of their scope

//console.log(a); //TDZ
let a = 10;

console.log(b); // undefined
var b = 20;


//const and mutation
const user = { name: 'Ana' }
//user = {} // TypeError (reassignment)
user.name = 'Andrei' // OK (mutation)
console.log(user)

// Use const by default, let for reassignment, and avoid var; mind TDZ and block scope.

const myCar = {
    color: 'red',
    year: 2024,
    brand: 'Toyota',
    doSomething: (a) => {
        console.log("do " + a)
    }
}

console.log(myCar.doSomething("javascript"));