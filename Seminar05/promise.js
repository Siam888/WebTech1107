
/* 
Promises
    - A promise is an object that represents the eventual result of an async operation
    - It is basically a returned object to which you attach callbacks as oppsed to calling the callbacks from a series of functions ( callback hell )
*/

// Promise creation

// The constructor received a callback function (executor) that gets 2 functions as input params (resolve, reject)
// By default the state of the promise is pending
// resolve - is responsible with setting the state of the Promise to fulfilled when the async operation is successfull
// reject - is responsible with setting the state of the Promise rejected when the async operation has failed

// A promise is settled when it is in one of the two final state fulfilled or rejected

const promise = new Promise((resolve, reject) => {
    const rnd = Math.random();
    if (rnd > 0.2) {
        resolve("Done!")
    } else {
        reject("Rejected!")
    }
})

// t1 : Promise : {value : undefined, state: pending}
// t2 : Promise : {value : <ConcreteValue>/<ReasonForError>, state: Fulfilled/Rejected}

// In order to react to the changing of states of a promise we need to attach a series of callbacks with then, catch, finally

promise
    .then(x => console.log(x)) // will be executed when promise is FULFILLED
    .catch(x => console.error("This is the error: ", x)) // will be executed when promise is REJECTED 
    .finally(x => console.log("Handling is finished", x)) // Optional, will be executed at the end regardless of promise state


// Promise Chaining

// then, catch, finally will wrap the non-promise result of the callback they execute into a Promise
// Through this sequential chaining we can avoid the troubles of callback hell
// If no handler ( fullfill or reject ) is passed to the original promise the value and state of that promise is passed down the promise chain

const getRandom = () => new Promise((res, rej) => setTimeout(res(Math.floor(Math.random() * 10)), 100));

getRandom()
    .then(n => {                 // Step 1
        console.log("Got number:", n);
        return n * 2;              // return a plain value
    })
    .then(n2 => {                // Step 2
        console.log("Doubled:", n2);
        return n2 ** 2
    })
    .then(n3 => {                // Step 3
        console.log("Squared:", n3);
    })
    .catch(err => {
        console.error("Error:", err);
    })
    .finally(() => {
        console.log("Done.");
    });


// Error handling

// rejected promise
function simulateError() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Something went wrong");
        }, 1000);
    });
}

// use of catch method
simulateError()
    .then((result) => {
        console.log("This will not be executed");
    })
    .then((result) => {
        console.log("This will not be executed");
    })
    .then((result) => {
        console.log("This will not be executed");
    })
    .catch((error) => {
        console.error("This will be printed:", error);
    });

// If an error is thrown inside a then block, the error will be bundled in a Promise and will be handled by the catch block

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("The promise finished");
        }, 1000);
    });
}

// catch method
fetchData()
    .then((result) => {
        console.log(result);
        console.log("This will be executed");
    })
    .then((result) => {
        throw new Error("Something bad happened");
    })
    .then((result) => {
        console.log("This will not be executed");
    })
    .catch((error) => {
        console.error("This will be printed:", error);
    });


// Promise static metods

// resolve -> creates a resolved promise

var resolved = Promise.resolve("Success!")
resolved.then(x => console.log(x))

// rejected -> creates a rejected promise

var rejected = Promise.reject("Reject!")
rejected.then(result => console.log(result))
    .catch(error => console.error("Error: " + error));


// Promise.all

// This static method takes an array of promises and returns a single one
// That single promise resolves when all of the input promises resolve
// It rejects if any of the input promises reject
// The fulfillment value of the single promise is an array of all fulfillment values of the input promises
// The reject values of the single promise is first rejected value of the input promises
// Usefull when you want aggregate multiple async tasks and you need all of their results before continuing

const promise1 = Promise.reject(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(reject, 100, "foo");
});

Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values);
})
    .catch(err => console.error(err));

// Promise.allSettled
// Returns a settled promise once every promise is settled 

const promise4 = Promise.resolve(3);
const promise5 = new Promise((resolve, reject) => setTimeout(reject, 2000, 'foo'));
const promises = [promise4, promise5];
Promise.allSettled(promises).then((results) => results.forEach((result) => console.log(result.status)));

// Promise.race -> gets an array of promises, returns the first settled promise
// Promise.any -> gets an array of promises, resolves if at least one input promise is resolved, rejects if all input promises are rejected


