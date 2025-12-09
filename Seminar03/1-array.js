//1. Array and Indexing

// Arrays are resizeable and can contain a mix of different data types [0 , true, "hello"]
// Arrays inherit functionalities from  the Array object type
// Array indexes are object properties in the same way toString is a property
const a = ["x", "y"];

a[1] === a["1"];                // true — bracket access always uses a string key, even when writing a number
a.hasOwnProperty(1);            // true — same as a.hasOwnProperty("1")

const colors = ["red", "green", "blue"];
console.log(colors[0]); //first element
console.log(colors[colors.length - 1]); //last element
colors[1] = "lime"; //write by index
console.log(colors.at(-1)) // access the last value
// colors[6] = "cyan"
console.log(colors)

// Exercise 1: Add "black" to the start and "white" to the end using only indexes (no push/unshift)

//2. Iteration Patterns

const nums = [4, 9, 13];
for (let i = 0; i < nums.length; i++) console.log('for:', nums[i]);
for (const n of nums) console.log('for..of:', n);
nums.forEach((n, i) => console.log('forEach:',i, n));


// for...in iterates keys and can include custom properties—avoid it for arrays.
nums["hello"] = 3
for (const key in nums) {
    console.log(key)
}

// 3. Rest and Spread operators
//Spread(...) expands an iterable(arrays / strings) or an object's own enumerable props inside a new literal.

//Rest(...) gathers remaining items into an array(function params, array destructuring) or into an object(object destructuring).

// 1) Array spread: copy & merge (non‑mutating)

//spread - allows expanding an array or an objects enumerable properties into individual elements
function functionWith3Params(x, y, z) {
    console.log(x);
    console.log(y);
    console.log(z);
}

const arrWith3Params = [1, 2, 3];
functionWith3Params(...arrWith3Params);


const user = { id: 1, name: 'Ana', role: 'user' };
const promoted = { ...user, role: 'admin' };        // role becomes 'admin'
console.log("User: ", user, "Promoted: ", promoted);

//Rest op. - allows sending a variable number of params to a function
function greet(first, ...others) {
    console.log('Hello,', first);
    console.log('And hello to:', others);
}
greet('Ana', 'Bob', 'Cory');
// Hello, Ana
// And hello to: ['Bob', 'Cory']

// 3.1 Copy arrays 
const copyArr = [{ name: "Ana" }, { name: "John" }];

const arrSpreadCopy = [...copyArr];
const arrFromCopy = Array.from(copyArr);
const arrSliceCopy = copyArr.slice();
const arrConcatCopy = copyArr.concat([]);

copyArr[1].name = "Jane";

console.log(arrSpreadCopy);
console.log(arrFromCopy);
console.log(arrSliceCopy);
console.log(arrConcatCopy);

// These methods create new arrays, but the elements are the same object references (no deep clone).


// 4. Mutating vs Non‑Mutating & Safe Copies

// Mutate: push, pop, shift, unshift, splice, sort, reverse.

// Non‑mutate: slice, concat, map, filter, reduce, and modern toSorted, toReversed.

// Copying: shallow copies with [...arr]/slice(). Nested arrays/objects still share references.

// push/pop

const arr = [1, 3, 5];
const len = arr.push(7);
console.log("Array length:", len);

const last = arr.pop(); //extract the last element
console.log("Last element popped:", last);

//unshift/shift

const arr2 = [1, 2];
const len2 = arr2.unshift(0); // insert element at the start of array
console.log("Unshift", arr2, "length: ", len2);

const first = arr2.shift(); // remove element from the begining
console.log("Shift", arr2);

//splice - remove, insert, replace
const a3 = [1, 2, 3, 4];
const removed = a3.splice(1, 2);   // removed -> [2,3], a3 -> [1,4]; remove 2 elements starting at index 1
a3.splice(1, 0, 2, 3);             // insert at index 1, a3 -> [1,2,3,4]
a3.splice(1, 2, 9, 9);             // replace 2 items, a3 -> [1,9,9,4]

console.log("Splice: ", a3);

//sort / reverse (mutate) 
//sort converts the elements to string and sorts them ascending 
const a4 = [10, 2, 5, 100]
a4.sort()
console.log("Sort alphabetically: ", a4)
a4.sort((elem1, elem2) => elem1 - elem2) // -1 is elem1 is smaller; 0 if they a equal; 1 if elem1 is bigger
console.log("Sort: ", a4);

const sortedA4 = a4.toSorted();
console.log("Return sorted array: ", sortedA4, "original array intact: ", a4)

a4.reverse();
console.log("Reverse: ", a4);
const reversedA4 = a4.toReversed();
console.log("Return reversed array: ", reversedA4, "original array intact: ", a4)

//Exercise 2: Make b become [2, 5, 10, 42, 100] using exactly three statements and only these methods:
let b = [10, 2, 5, 100];

// Solution: 
// b.push(42);
// b.sort((a,b)=>a-b);

// Non-mutate 

//slice - returns a shallow copy of a portion of an array into a new array object

const b1 = [1, 2, 3, 4]
console.log("Sliced array: ", b1.slice(1, 4)) // doesn't include last index
const shallowCopy = b1.slice();

//concat - this method doesn't change the existing arrays, it returns a new one

const b2 = [1, 2, 3]
console.log("Concatenate:", b2.concat([4, 5]))

//map - returns new array that contains the results of applying a function on the calling array

const movies = [
    { id: 1, title: "Dune: Part Two", year: 2024, rating: 8.7, minutes: 166 },
    { id: 2, title: "Spider‑Verse", year: 2023, rating: 8.9, minutes: 140 },
    { id: 3, title: "Arrival", year: 2016, rating: 7.9, minutes: 116 },
    { id: 4, title: "Interstellar", year: 2014, rating: 8.6, minutes: 169 },
];

console.log("Mark movies as long:", movies.map(elem => ({ ...elem, isLong: elem.minutes > 120 })));

//filter - iterates through every element, applies a condition, returns only the elements that fulfill that condition

console.log("Only great movies: ", movies.filter(elem => elem.rating > 8))

//reduce
// Starts with an initial accumulator value—either the one you provide or the first array item.
// Processes each element by running your callback to update the accumulator.
// After all elements, returns a single final value (the accumulator).
// Each iteration uses the accumulator from the previous step as its starting value.

console.log("Total duration :", movies.reduce((accumulator, elem) => { return accumulator + elem.minutes }, 0))

//Start: acc = 0
// Step 1(Dune: Part Two 166): 0 + 166 = 166 → acc = 166
// Step 2(Spider - Verse 140): 166 + 140 = 306 → acc = 306
// Step 3(Arrival 116): 306 + 116 = 422 → acc = 422
// Step 4(Interstellar 169): 422 + 169 = 591 → acc = 591

//Under the hood:
// const reduce = function (collection, callback, initialValue) {
//     let accumulator = initialValue
//     for (let i = 0; i < collection.length; i++) {
//         if (i === 0 && initialValue === undefined) {
//             accumulator = collection[0]
//         } else {
//             accumulator = callback(collection[i], accumulator)
//         }
//     }
//     return accumulator
// }

// reduce([1, 2, 4], (v, sum) => v + sum, 0)

// Exercise 3:
// From an array of numbers:

// keep only the even ones,
// double them,
// add them up.

const nums = [1, 2, 3, 4, 5, 6];

const total = nums
    .filter(n => n % 2 === 0)   // [2, 4, 6]
    .map(n => n * 2)            // [4, 8, 12]
    .reduce((sum, n) => sum + n, 0); // 24

console.log(total); // 24


// Search methods

const nums2 = [2, 5, 5, 9];
console.log("Array includes: ", nums2.includes(5));
console.log("Index of firt occurance: ", nums2.indexOf(5))

// find / findIndex (objects)
const people = [
    { id: 1, name: "Ana", score: 82 },
    { id: 2, name: "Bob", score: 47 },
    { id: 3, name: "Cory", score: 95 },
];
const high = people.find(p => p.score >= 80);
console.log("First object found: ", high); //first element
const idxHigh = people.findIndex(p => p.score >= 90);
console.log("Index of first found object: ", idxHigh) //first index

// some / every
const anyFail = people.some(p => p.score < 50);     // true
console.log("Any fail: ", anyFail);
const allPass = people.every(p => p.score >= 50);   // false
console.log("All pass:", allPass);