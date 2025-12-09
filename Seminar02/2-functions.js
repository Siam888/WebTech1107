//FUNCTIONS

// this binding
// Regular functions: this depends on call site (method call, new, call/apply/bind, or default undefined in strict mode / global in sloppy mode).
// Arrow functions: no own this (lexically captures from surrounding scope); cannot be used as constructors; no prototype.

// Functions are first-class objects, so they can be treated as variables ( declared, assigned to a variable, passed as params )

//Declarations
console.log(sum(3, 5))

function sum(a, b) { return a + b; }

// Expression (not hoisted)

//console.log(mul(2, 3)); // ReferenceError
const mul = function (a, b) { return a * b; };
console.log(mul(2, 4))

const inc = (x) => { return x + 1 }
const incSimplified = x => x + 1


//this keyword -> special keyword that refers to the context where a piece of code is supposed to run. It usually points to the calling object
const counter = {
    n: 0,
    inc() { this.n++; console.log(this.n) }
}

counter.inc();
const f = counter.inc;
f();

// this - Arrow -> they have a lexical this, which is "Searched for" at their creation 


const ctx = {
    id: 'CTX',
    demo() {
        const arrow = () => this.id;           // captures ctx
        const regular = function () { return this.id; };

        console.log(arrow());   // "CTX"  ← ignored
        console.log(regular()); // "undefined" ← respected
    }
};

ctx.demo();

//Ex2
const obj = {
    x: 42,
    getX() { return this.x; },
    getXArrow: () => this?.x, // likely undefined
};
const getX = obj.getX;
console.log(getX()); // ?
console.log(obj.getX()); // ?
console.log(obj.getXArrow()); // ?
console.log(getX.call(obj)); // ?