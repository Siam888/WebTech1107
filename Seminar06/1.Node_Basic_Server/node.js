
// Node.js

// Node.js is a popular JavaScript runtime built on Chrome’s V8 engine. 
// It lets you run JavaScript on the server, not just in the browser, which makes it a great fit for building web back-ends and APIs.


const http = require("http");
const { URL } = require("url");

// For now, we simulate a database with an in-memory array
let books = [
    { id: 1, title: "Dune" },
    { id: 2, title: "1984" },
    { id: 3, title: "Book" },
];

http
    .createServer(async (req, res) => { // creates a new HTTP server instance
        // Parse the URL so we can check the path and query params easily
        const url = new URL(req.url, "http://localhost");

        // GET /api/books -> list all books
        if (url.pathname === "/api/books" && req.method === "GET") {
            res.write(JSON.stringify({ records: books })); // sets the response body
            res.end(); // Sends response and ends conncetion
        }
    })
    // Start the server on port 8080
    .listen(8080, () => {
        console.log("Server running at http://localhost:8080");
    });


// Since this server doesn't have a lot of functionalities the code seems clear and understandable
// Yet we can see that right now we define a "database" in the file and also the handling of the requests
// This would be inefficient in a more complex application since it would make the code hard to read and maintain