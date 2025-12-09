
// if

function isDivisible(number, divisor) {
    if (number % divisor) {
        return false;
    } else {
        return true;
    }
}

console.log(isDivisible(5, 2))
console.log(isDivisible(6, 2))

// Truthy vs falsy
if ("") console.log("'' truthy"); else console.log("'' is falsy");
if ([]) console.log("[] is truthy"); else console.log("[] falsy");
if ({}) console.log("{} is truthy"); else console.log("{} falsy");
if ("0") console.log("'0' is truthy"); else console.log("'0' falsy");
if (0) console.log("0 truthy"); else console.log("0 is falsy");

Boolean(false);         // false
Boolean(undefined);     // false
Boolean(null);          // false
Boolean('');            // false
Boolean(NaN);           // false
Boolean(0);             // false
Boolean(-0);            // false
Boolean(0n);            // false

Boolean(true);          // true
Boolean('hi');          // true
Boolean(1);             // true
Boolean([]);            // true
Boolean([0]);           // true
Boolean([1]);           // true
Boolean({});            // true
Boolean({ a: 1 });      // true


//Defaulting values: || vs ??
const a = 0, s = "";
console.log(a || 42); // 42  (0 is falsy → falls back)
console.log(a ?? 42); // 0   (nullish only)
console.log(s || "N/A"); // "N/A" ('' is falsy)
console.log(s ?? "N/A"); // ""    ('' kept)

//Coercion with == (why to prefer ===)
console.log("0" == 0);     // true  (string → number)
console.log(0 == false);   // true  (both → 0)
console.log([] == 0);      // true  ([] -> "" -> 0)
console.log("0" === 0);    // false
console.log(0 === false);  // false

//while

let n = 3;               // start value

while (n > 0) {          // keep looping while the condition is true
    console.log(n);        // do something each time
    n--;                   // make progress toward ending the loop
}

console.log("Liftoff!");

//for 

function occurences(text, character) {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) === character) {
            count++;
        }
    }

    return count;
}

console.log(occurences("sample text", 'e'))

// iterate through items of array
const array = [1, 2, 3, 4, 5];
for (const elem of array) {
    console.log(elem);
}

// object properties iteraton
const obj = { name: "John", age: 23 };
for (const key in obj) {
    console.log(`Key: ${key}: Value ${obj[key]}`);
}