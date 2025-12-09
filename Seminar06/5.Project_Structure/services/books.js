// Services (app/services/*.js)

// Purpose: Business/domain logic; reusable and testable.

// Define:
// Operations like list, getById, create, update, remove
// Rules, invariants, and calculations (e.g., duplicates not allowed)
// Calls to models/repositories to read/write data
// Domain-level errors (throw NotFoundError, ConflictError, etc.)

// Avoid: Touching Express objects (req, res), hardcoding HTTP status.


import random from "random"
import books from "../models/books.js"

const getBooks = () => {
    return books;
}

const getRandomBook = () => {
    const randInt = random.int(0, books.length - 1);
    const randomBook = books[randInt];
    return randomBook;
}

const search = (title) => {
    const book = books.find(x => x.title.toUpperCase() === title.toUpperCase());
    return book;
}

const getById = (id) => {
    return books[id];
}

const create = (title) => {
    if (!books.some(x => x.title.toUpperCase() === title.toUpperCase())) {
        const lastId = books.reduce((max, o) => Math.max(max, o.id));
        books.push({ id: lastId + 1, title: title })
        return true;
    }

    return false;
}

export {
    getBooks,
    getRandomBook,
    search,
    getById,
    create
}