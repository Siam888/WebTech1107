// Big server files get hard to read, test, and change. Splitting code into small, focused modules gives you:

// Separation of concerns: routes only route, controllers shape responses, services hold logic, models hold data.
// Reusability & testability: small pieces are easy to unit test and reuse.
// Scalability: teams can work in parallel without stepping on each other.
// Maintainability: features live in predictable places.

// A common pattern in Express is: routes → controllers → services → models.
// The code can be structured by either type or feature
// Type                     
// app/                     
// ├── controllers/ 
// │   └── book.js
// ├── models/
// │   └── book.js
// ├── routes/
// │   └── book.js
// ├── services/
// │   └── book.js
// ├── main.js
// └── package.json

// Feature
//  app/
// ├── books/
// │   ├── controller.js
// │   ├── model.js
// │   └── route.js
// │   └── service.js
// ├── main.js
// └── package.json


import { router } from "./routes/books.js";
import express from "express";
import { logRequest } from "./middlewares/index.js";

const PORT = 8080;

const app = express();
app.use(express.json());

// app.use(logRequest);
app.use("/books", router);

app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})

