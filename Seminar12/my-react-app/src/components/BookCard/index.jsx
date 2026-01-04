const BookCard = ({ book }) => {
  return (
    <li className="book-card">
      <div className="card-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        
        <div className="book-details">
          <span className="book-year">📅 {book.year}</span>
          <span className="book-pages">📄 {book.pages} pages</span>
        </div>
      </div>
    </li>
  );
};

export default BookCard;