import express from "express"
import controller from "../controllers/books.js"

export const router = express.Router();

router.get("/books", controller.getBooksByFilter);
router.post("/books", controller.createBook);
router.put("/books/:id", controller.updateBook);
router.delete("/books/:id", controller.deleteBook);