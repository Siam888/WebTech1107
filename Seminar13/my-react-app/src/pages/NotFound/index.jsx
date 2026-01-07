import { useSelector } from "react-redux";
import "./style.css"
import { Link } from 'react-router'

export default function NotFound() {

    const books = useSelector(state => state.books.data)

    return (
        <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '4rem', color: '#6c5ce7', margin: '0' }}>404</h1>
            <h3 style={{ marginBottom: '20px' }}>Page Not Found</h3>

            <p className="empty-message" style={{ marginBottom: '30px' }}>
                Oops! It looks like this page got lost in the library.
                
                    There are {books.length} items to see
            </p>

            <Link to="/">
                <button>Back to Home</button>
            </Link>
        </div>
    );
}