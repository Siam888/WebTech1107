// Objects and Prototypes

// JS is a object-oriented language that is based on the concept of prototype, different from C# or Java which are based on classes
// A prototype is an OBJECT that is used by the parent object to extend properties and functionalities
// Think of a prototype like a template

//Prototypal inheritance

Object.getPrototypeOf(Object.prototype)
Object.getPrototypeOf(Function.prototype)

const car = {
    color: "red"
};

const volkswagen = {
    engine: "v8"
}


// volkswagen.__proto__ = car;
Object.setPrototypeOf(volkswagen, car)
console.log(volkswagen.color);

// volkswagen.__proto__ -> car
// car.__proto__ -> Object.prototype 
// Object.__proto__ -> null

// Object.create()

const robotMethods = {
    speak() {
        return `beep… I am ${this.id}`;
    }
};

function createRobot(id) {
    const bot = Object.create(robotMethods); // bot.__proto__ → robotMethods
    bot.id = id;          // own property
    return bot;
}

const r2d2 = createRobot('R2-D2');
const t123 = createRobot('t123');

console.log(r2d2.speak());
console.log(t123.speak());

console.log(r2d2.hasOwnProperty('id'));       // true  (own)
console.log(r2d2.hasOwnProperty('speak'));    // false (inherited)
console.log(Object.getPrototypeOf(r2d2) === robotMethods); // true


// Constructor function + prototype method
function Person(name) {
    this.name = name;
}

//Object.getPrototypeOf(Person)
Person.prototype.greet = function () { //NOT Person.__proto__
    return `Hi, I'm ${this.name}`;
};

const p = new Person('Radu'); // 1. newInstance is created, 2. newInstance.__proto__ = Person.prototype, 3. this = newInstance, 4. Function body is called and returns this (newInstance)
console.log(p.greet());


//Classes
class PersonClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        //this.greet = () => console.log(`Hello from ${this.name}`)
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
    }
}

const pers = new PersonClass("John", 25);
const pers1 = new PersonClass("Marius", 25);
pers.greet();


// Objects have own properties and a single prototype link for fallbacks.

// Object.create(proto) makes a new object whose prototype is proto.

// Regular functions are constructors and expose an extra .prototype object for instances to share methods.

// Classes are syntax sugar over the same prototype mechanism.

// Use prototypes for shared behavior, own properties for instance data.