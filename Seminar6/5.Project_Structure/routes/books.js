// Routes (app/routes/*.js)

// Purpose: Map HTTP method + path → controller function.

// Define:
// Route paths (e.g., /, /:id, /search)
// HTTP methods (get, post, put, patch, delete)
// Route-level middleware (auth, validation, rate limit)
// Mounting point in main.js (e.g., app.use("/books", bookRouter))

// Avoid: Business logic, DB calls, heavy data shaping.

import express from "express";
import * as bookController from "../controllers/books.js"
import { logRequest } from "../middlewares/index.js";


export const router = express.Router()
// creates a router instance— a self-contained “mini-app” with its own routes and middleware stack.
// You use it to group related endpoints (by feature or resource) and then mount them under a base path in your main app.

//router.use(logRequest)

router.get("/", bookController.getBooks) // express injects the params when executing the function
router.get("/random", bookController.getRandomBook)
router.get("/search", bookController.searchBook)
router.get("/:id", bookController.getById)

router.post("/create", bookController.create)