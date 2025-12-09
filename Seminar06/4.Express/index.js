
import express from "express"
import random from "random";
import books from "../3.Node_Server_NPM_Modules/books.js";

const PORT = 8080;

const app = express();



app.get("/", (req, res) => {
    // req has details about the request
    // res has deatils about the response
    res.send({ records: books });
});


app.get("/random", (req, res) => {
    const randInt = random.int(0, books.length - 1);
    const randomBook = books[randInt]
    res.send({ book: randomBook })
})




// Node.js is powerful but its built-in http module is low-level
// Adding new routes means more code inside createServer, which can get messy
// Frameworks like express add a small routing layer so you can define endpoints cleanly and keep code modular


// A request can contain information that is stored in different places
// Query, path, and body params (with Express)
// Query params: extra info at the end of the URL, after ? (e.g., ?title=moth).
// Path params: identifiers inside the URL path (e.g., /book/1).
// Body params: data sent in the request body (commonly JSON) for create/update actions.




app.get("/search", (req, res) => {
    const title = req.query.title; // way of accessing query params
    const book = books.find(x => x.title.toUpperCase() === title.toUpperCase()); // this method returns the first element that matches the criteria

    if (!!book) { // double negation make gives the boolean value of the variable
        res.send(book)
    } else {
        res.status(404).send({ message: "Book not found" }) // each response has a status, here we mark the absence of the resource
    }
})


app.get("/books/:id", (req, res) => {
    const id = req.params.id
    const book = books[id]

    if (!!book) { // double negation make gives the boolean value of the variable
        res.send(book)
    } else {
        res.status(404).send({ message: "Book not found" }) // each response has a status, here we mark the absence of the resource
    }
})

// Request of type POST, PUT, PATCH that update/create resources on the server can also have a body
// Because the body can have multiple formats we need to specify which format express should expect
// To read JSON bodies, enable the JSON parser middleware: app.use(express.json()).
// Middlewares are methods that intercept the request and process it before it gets to the handler

app.use(express.json())

app.post("/", (req, res) => {
    const newBook = req.body.title

    if (!books.some(x => x.title.toUpperCase() === newBook.toUpperCase())) {
        const lastId = books.reduce((max, o) => Math.max(max, o.id));
        books.push({ id: lastId + 1, title: newBook })

        return res.status(201).send({ result: "Book was created" });
    }

    return res.status(400).send({ message: "Book already exists" });
})

app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})