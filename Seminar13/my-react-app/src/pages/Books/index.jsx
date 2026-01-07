import { useEffect, useState } from "react";
import './style.css'
import BookCard from "../../components/BookCard";
import AddBookModal from "../../components/AddBook";
import { Link } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { setBooks, addBook } from "../../actions/books";

export default function Books() {

    // const [books, setBooks] = useState([]);

    const books = useSelector(state => state.books.data);
    const dispatch = useDispatch();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const SERVER_URL = "http://localhost:8080/api"

    const loadBooks = () => {
        fetch(`${SERVER_URL}/books`)
            .then(response => response.json())
            .then(books => {
                dispatch(setBooks(books));
            })
            .catch(error => {
                console.error("Error loading books:", error);
            });
    }

    const addNewBook = (newBook) => {
        fetch(`${SERVER_URL}/books`, {
            method: "POST", // Specify the HTTP method
            headers: { "Content-Type": "application/json" }, // Tell the server we are sending JSON
            body: JSON.stringify(newBook) // Convert the JS object to a JSON string
        })
            .then(response => response.json())
            .then(newBook => {
                dispatch(addBook(newBook))
                setIsAddModalOpen(false)
            })
            .catch(err => console.log(err));
    }


    useEffect(() => {
        loadBooks()
    }, [])



    return (
        <main className="container">
            <div className="actions-container">
                <input type="text" placeholder="Search for a book" />
                <button>Search</button>
                <button onClick={() => setIsAddModalOpen(true)}>Add</button>
            </div>
            <h2>My Library</h2>
            <button id="loadButton" onClick={loadBooks}>Load Books</button>
            <ul id="bookList">
                {books.length == 0 ? <li className="empty-message">No books loaded yet...</li> :
                    books.map(x => <BookCard key={x.id} book={x}></BookCard>)}
            </ul>
            {isAddModalOpen && <AddBookModal onAddBook={addNewBook} onClose={() => setIsAddModalOpen(false)} />}
            <Link to="/somewhere">Go Somewhere</Link>
        </main>

    )
}