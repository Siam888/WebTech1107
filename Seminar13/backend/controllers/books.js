import bookService from "../services/books.js"

async function getBooksByFilter(req, res) {
    const data = await bookService.getBooksByFilter(req.query)

    return res.send(data)
}

async function createBook(req, res) {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function updateBook(req, res) {
    try {
        const book = await bookService.updateBook(req.params.id, req.body);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteBook(req, res) {
    try {
        await bookService.deleteBook(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export default {
    updateBook,
    createBook,
    deleteBook,
    getBooksByFilter
}