
// Async - await

// Promises add an complexity layer to the code, even if they are better then callbacks
// Async - await keyword pair offers the ability to write async code as if it were synchronous


// fake async fetch that resolves after 1s
function fetchMessage() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Hello from async!"), 1000);
    });
}

async function showMessage() {
    console.log("Start");
    const msg = await fetchMessage();   // waits here without blocking the thread
    console.log("Message:", msg);
    console.log("End");
}

showMessage();

// async keyword marks a function as being asynchronous so every returned value is wrapped by a Promise

async function getData() {
    return { id: 1, name: "Bob", age: 33 }
}

console.log(getData())

// Await keyword will suspend the execution of the function until the Promise is settled
// In this sense one can think of the code followin await as being the same as the callback passed to "then" method
async function displayData() {
    const data = await getData();
    console.log("123");
    console.log(data);
}

displayData()

// Error handling
// Error handling is done in the same way as with synchronous code

async function showData() {
    try {
        await getData()
    } catch (err) {
        console.error(err)
    }
}