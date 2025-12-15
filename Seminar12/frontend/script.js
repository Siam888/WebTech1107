const loadButton = document.getElementById("loadButton");
const booksList = document.getElementById("bookList");
const form = document.querySelector("#addBookForm");


// Attach the function to the click event
loadButton.addEventListener("click", loadBooks);
document.addEventListener('bookInserted', loadBooks);
form.addEventListener('submit', onAddBook)

function loadBooks() {
    // Call the actual endpoint to list books
    fetch("http://localhost:8080/api/books")
        .then(response => response.json())
        .then(books => {
            // Clear existing content from the list
            booksList.innerHTML = "";

            // Check if we receive the data correctly (for debugging)
            console.log("Books received:", books);

            // For each returned book, generate HTML elements
            for (let book of books) {
                // Create a new HTML list item (li) element
                const item = document.createElement("li");

                // Add a CSS class
                item.classList.add("book-item");

                // Attach an event handler for the click on the book
                item.addEventListener("click", () => onBookClick(book));

                // Build the text content: "Title - Author (Year)"
                item.innerText = `${book.title} - ${book.author} (${book.year})`;

                // Attach the newly created element to the parent list (<ul>)
                booksList.appendChild(item);
            }
        })
        .catch(error => {
            console.error("Error loading books:", error);
            booksList.innerHTML = '<li class="empty-message">Error connecting to the server.</li>';
        });
}

function onAddBook(event) {
    // 1. Prevent the default browser behavior (page reload)
    event.preventDefault();

    // 2. Gather data from the input fields
    const newBook = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        // Convert strings to numbers for the backend
        year: parseInt(document.getElementById("year").value),
        pages: parseInt(document.getElementById("pages").value)
    };

    // 3. Send the new book data to the backend
    fetch("http://localhost:8080/api/books", {
        method: "POST", // Specify the HTTP method
        headers: { "Content-Type": "application/json" }, // Tell the server we are sending JSON
        body: JSON.stringify(newBook) // Convert the JS object to a JSON string
    })
        .then(response => {
            // 4. Check if the request was successful
            if (response.ok) {
                console.log("Hello")
                // 5. Create and dispatch a custom event to notify other parts of the app
                const bookEvent = new Event('bookInserted');
                document.dispatchEvent(bookEvent);

                // 6. Clear the form inputs
                form.reset();
            }
        });
}

function onBookClick(book) {
    // Display details in an alert
    alert(`The book "${book.title}" has ${book.pages} pages.`);
}