
// Controllers (app/controllers/*.js)

// Purpose: Orchestrate a single request–response.

// Define:
// Read inputs from req.params, req.query, req.body, req.headers
// Validate/sanitize inputs (or call a validator)
// Call the appropriate service function
// Choose HTTP status codes and shape the JSON response
// Translate known service errors to HTTP errors (e.g., 400/404/409)

// Avoid: Data persistence logic, complex domain rules, SQL/ORM calls.

import * as bookService from "../services/books.js"


const getBooks = (req, res) => {
    const books = bookService.getBooks();
    res.send({ records: books });
}

const getRandomBook = (req, res) => {
    res.send({ book: bookService.getRandomBook() })
}

const searchBook = (req, res) => {
    const book = bookService.search(req.query.title);

    if (!!book) {
        res.send(book)
    } else {
        res.status(404).send({ message: "Book not found" })
    }
}

const getById = (req, res) => {
    const book = bookService.getById(req.params.id);
    if (!!book) {
        res.send(book)
    } else {
        res.status(404).send({ message: "Book not found" })
    }
}

const create = (req, res) => {
    const newBook = req.body.title
    const isCreated = bookService.create(newBook)

    if (isCreated)
        return res.status(201).send({ result: "Book was created" });

    return res.status(400).send({ message: "Book already exists" });
}

export {
    getBooks,
    getById,
    searchBook,
    getRandomBook,
    create
}