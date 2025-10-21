// -----------------------------------------------------------------------------
/**
 * 2) CLASSES
 *
 * DEFINITIONS:
 * - In JS, classes are syntactic sugar over prototypes.
 * - Class declaration vs class expression (anonymous or named).
 * - Methods: defined on the prototype of the class.
 * - Getters/Setters: controlled access to properties.
 * - Static methods/properties: callable on the class itself.
 * - Public vs private fields: private are prefixed with # and only accessible
 *   within the class body.
 */
// -----------------------------------------------------------------------------

// 2.1 Declarations: classic, anonymous expression, named expression
class Device {
    constructor(name, kind) {
        this.name = name;
        this.kind = kind;
    }
}

const Gadget = class {
    constructor(category) {
        this.category = category;
    }
};

const MyWidgetClass = class Widget {
    constructor(id, version) {
        this.id = id;
        this.version = version;
    }
};

const phone = new Device("Pixel", "phone");
const sensor = new Gadget("temperature");
const widget = new MyWidgetClass("W-42", "1.0.0");

console.log(phone, sensor, widget);

// Declarations define a named class at the top level; expressions make a class on the fly and assign it somewhere.
// Class expression represent a class as a value; can be anonymous or have an internal name; handy for local/conditional/returned classes.

// 2.2 Constructor, getter/setter, instance method, static method
/*
- Constructor: special method for creating & initializing an object. Only one
               per class; multiple constructors would be an error.
*/
class Course {
    constructor(code) {
        this._code = code;
    }

    // getters/setters
    get code() { return this._code; }
    set code(newCode) { this._code = newCode; }

    // instance method
    info() {
        console.log(`The code for the course is ${this.code}`);
    }
}

const cs = new Course("CS101");
cs.info();

// Methods defined inside a class are implemented as functions attached to the parent prototype


// 2.4 Public/Private fields + static property/method

class Counter {
    static created = 0;            // static (shared by the class)
    #value = 0;                    // private (per instance)

    constructor() {
        Counter.created++;           // track how many Counters we made
    }

    inc() { this.#value++; }       // instance method (can touch #value)
    get value() { return this.#value; }  // read-only access

    static howMany() { return Counter.created; } // static method
}

const a = new Counter();
const b = new Counter();

a.inc(); a.inc();
console.log(a.value);          // 2
console.log(b.value);          // 0
console.log(Counter.howMany()); // 2

//Task: Build a class Square(side) with a private #label, an area() method, and getters/setters for the label. Log area & label.

// TODO: Uncomment for a sample solution
// class Square {
//   #label;
//   constructor(side) {
//     this.side = side;
//     this.#label = "square";
//   }
//   area() { return this.side * this.side; }
//   get label() { return this.#label; }
//   set label(v) { this.#label = v; }
// }
// const s = new Square(4);
// console.log("Square area:", s.area());
// console.log("Square label:", s.label);
// s.label = "S1";
// console.log("Square new label:", s.label);

// -----------------------------------------------------------------------------
/**
 * 3) CONSTRUCTOR FUNCTIONS & PROTOTYPES
 *
 * DEFINITIONS:
 * - Before classes, OOP behavior was simulated using constructor functions with
 *   methods attached on the prototype.
 * - Structurally, objects created by classes and constructor functions are both
 *   derived from the base Object.
 */
// -----------------------------------------------------------------------------

// Constructor function + prototype 
function City(name, country) {
    this.name = name;
    this.country = country;
}
City.prototype.describe = function () {
    console.log(`${this.name}, ${this.country}`);
};

const cluj = new City("Cluj-Napoca", "Romania");
cluj.describe(); // Cluj-Napoca, Romania

// Equivalent class 
class CityClass {
    constructor(name, country) {
        this.name = name;
        this.country = country;
    }
    describe() {
        console.log(`${this.name}, ${this.country}`);
    }
}

new CityClass("Vienna", "Austria").describe(); // Vienna, Austria

// .prototype is the mold on the maker function; __proto__ is the link on the made object.
// Classes are just nicer syntax for functions + prototypes.
// Methods live on the prototype, so instances share them.

class CapitalCity extends CityClass {
    constructor(name, country) {
        super(name, country); // call parent constructor
    }

    describe() {
        super.describe();      // call parent method
        console.log("(capital city)");
    }
}

const capitalCity = new CapitalCity("Bucharest", "Romania");
capitalCity.describe();

console.log(capitalCity instanceof CapitalCity); // true
console.log(capitalCity instanceof City);        // true

// extends sets up the prototype chain so parent methods can be called
// super(...) is used to call the parents constructor
// super.method(...) is used to call the parents methods
// instanceof shows the relationship, child instances are also instances of the parents