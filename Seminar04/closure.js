
// -----------------------------------------------------------------------------
/**
 * 1) CLOSURES (Scopes & Closure Context)
 *
 * DEFINITIONS:
 * - Global scope: covers the entire program; variables here are global and
 *   accessible from anywhere during execution.
 * - Local scope: variables live only while the scope is active; includes:
 *   - Function scope: created when a function runs; sees globals + function vars.
 *   - Block scope: created by blocks (if/for/while/...); sees globals + current
 *     function vars + block vars.
 * - Closure: is a bundle that consists of a function that "remembers" variables from the scope where it was
 *   CREATED (its own scope, parent scope, and global), even after that scope
 *   would otherwise be gone.
 *            closures are created every time a function is created, 
              at function creation time.
 */
// -----------------------------------------------------------------------------

// 1.1 Scope demo 
// University → Faculty → Department → Seminar (rules & scope)

// GLOBAL scope: applies everywhere in the program
const uniRule1 = "Carry student ID on campus";
const uniRule2 = "Academic integrity is mandatory";

function faculty(facultyName, departmentName) {
    // FUNCTION scope: applies everywhere inside this faculty
    const facultyRule = "Assessments follow the faculty grading policy";

    // Show what's visible at the faculty level
    console.log(
        "[FACULTY]",
        "| faculty:", facultyName,
        "| rules:", uniRule1, "·", uniRule2, "·", facultyRule
    );

    // BLOCK scope: department-specific rules (only for this branch)
    if (departmentName === "Computer Science") {
        const departmentRule = "Use departments computers";
        console.log(
            "[DEPARTMENT]",
            "|", departmentName,
            "| rules:", uniRule1, "·", uniRule2, "·", facultyRule, "·", departmentRule, "·"
        );
    }

    // Outside the 'if' and 'for', only the broader scopes are visible
    // console.log(departmentRule); //  ReferenceError (block-scoped in the if)
}

// Example
faculty("Engineering", "Computer Science"); // hits dept & seminar rules


// 1.2 Closure context

function makeCounter() {
    let count = 0;              // private to the inner function
    return function () {
        count = count + 1;
        return count;
    };
}

const c1 = makeCounter();
console.log(c1()); // 1
console.log(c1()); // 2

const c2 = makeCounter();
console.log(c2()); // 1  (independent counter)
console.log(c1()); // 3  (c1 kept its own count)


// 1.3 Closure as encapsulation
/* 
    - Before classes the way to declare private methods was with closures
*/
const counter = (function () {
    let privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }

    return {
        increment() {
            changeBy(1);
        },

        decrement() {
            changeBy(-1);
        },

        value() {
            return privateCounter;
        },
    };
})();

console.log(counter.value()); // 0.

counter.increment();
counter.increment();
console.log(counter.value()); // 2.

counter.decrement();
console.log(counter.value()); // 1.


// 1.4 Closures as memoization

function makeMemoSquare() {
    const cache = {}; // private cache kept alive by the closure
    return function square(n) {
        if (n in cache) {
            console.log("(from cache)");
            return cache[n];
        }
        console.log("(computing)");
        const result = n * n;
        cache[n] = result;
        return result;
    };
}

const square = makeMemoSquare();

console.log(square(12)); // (computing) 144
console.log(square(12)); // (from cache) 144
console.log(square(5));  // (computing) 25
console.log(square(5));  // (from cache) 25



// Exercise - what does this log?
var a = 10;

function f1() {

    return function() {
        console.log(a);
    }
    var a = 20;
}

var f2 = f1();
f2();