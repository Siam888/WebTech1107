
export const SET_BOOKS = "SET_BOOKS";
export const ADD_BOOKS = "ADD_BOOKS";

export function setBooks(books) {
    return {
        type: SET_BOOKS,
        payload: books
    }
}

export function addBook(book) {
    return {
        type: ADD_BOOKS,
        payload: book
    }
}