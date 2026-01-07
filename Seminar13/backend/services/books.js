import { Book } from "../model/books.js";
import { Op } from "sequelize";

async function getBooksByFilter(query) {
    const filters = query;
    const attributes = Object.keys(Book.getAttributes())

    delete filters.id;

    console.log(Object.keys(filters)
        .filter(x => attributes.includes(x)))

    const whereCondition = Object.keys(filters)
        .filter(x => attributes.includes(x))
        .map(
            key => {
                if (key === "title" || key === "author") {
                    return { [key]: { [Op.like]: `%${filters[key]}%` } }
                }
                return { key: filters[key] }
            }
        );

    const books = await Book.findAll({
        attributes: ['id', 'title', 'author', 'year', 'pages'],
        where: whereCondition
    })

    return books
}

async function createBook(bookToCreate) {
    const book = await Book.create(bookToCreate);
    return book;
}

async function updateBook(id, book) {
    try {
        const bookToUpdate = await Book.findByPk(id)
        if (!bookToUpdate) {
            return null;
        }
        const updatedBook = book;

        delete bookToUpdate.id

        bookToUpdate.set({
            ...updatedBook
        })

        await bookToUpdate.save();
    } catch (err) {
        throw err;
    }
}

async function deleteBook(id) {
    try {
        const book = await Book.findOne({
            where: { id: id }
        })

        await book.destroy();

    } catch (err) {
        throw err;
    }
}

export default {
    updateBook,
    createBook,
    deleteBook,
    getBooksByFilter
} 