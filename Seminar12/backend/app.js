import express from "express"
import { Book, syncDB } from "./model/books.js";
import { Op } from "sequelize";
import { router as bookRouter } from "./routers/books.js";
import cors from 'cors'
const PORT = 8080

//1. Create the server
const app = express();


//2. Add middleware to specify body format
app.use(express.json())
app.use(cors())
app.use("/api", bookRouter)

//#region 
//1. Define an endpoint that gets books filtered by specific attributes or all the books in the DB if queries is missing
// app.get("/books", async (req, res) => {

//     const filters = req.query;
//     const attributes = Object.keys(Book.getAttributes())

//     delete filters.id;

//     console.log(Object.keys(filters)
//         .filter(x => attributes.includes(x)))

//     const whereCondition = Object.keys(filters)
//         .filter(x => attributes.includes(x))
//         .map(
//             key => {
//                 if (key === "title" || key === "author") {
//                     return { [key]: { [Op.like]: `%${filters[key]}%` } }
//                 }
//                 return { key: filters[key] }
//             }
//         );

//     const books = await Book.findAll({
//         attributes: ['id', 'title', 'author', 'year', 'pages'],
//         where: whereCondition
//     })


//     // const title = req.query.title;
//     // let books = [];
//     // if (title) {
//     //     books = await Book.findOne({
//     //         where: {
//     //             title: { [Op.eq]: title }
//     //         }
//     //     })
//     // } else {
//     //     books = await Book.findAll();

//     // }
//     return res.send(books);
// })


// //2. Define an endpoint that creates a new book
// app.post("/books", async (req, res) => {
//     try {
//         const book = await Book.create(req.body);
//         res.status(201).json(book);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// })

// //3. Define an endpoint that updates a book 
// app.put("/books/:id", async (req, res) => {
//     try {
//         const bookToUpdate = await Book.findByPk(req.params.id)
//         if (!bookToUpdate) {
//             return res.status(404).json({ message: "Book not found" })
//         }
//         const updatedBook = req.body;

//         delete bookToUpdate.id

//         bookToUpdate.set({
//             ...updatedBook
//         })

//         await bookToUpdate.save();

//         return res.sendStatus(204);
//     } catch (err) {
//         return res.status(500).json({ message: "Something went wrong" })
//     }
// })

// app.delete("/books/:id", async (req, res) => {
//     try {
//         const book = await Book.findOne({
//             where: { id: req.params.id }
//         })

//         await book.destroy();

//         res.sendStatus(204);

//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// })

//#endregion

//1. Start the app on a specific port
app.listen(PORT, async () => {
    try {
        await syncDB();
        console.log("Server is listening on port", PORT);
    } catch (err) {
        console.error("Failed to start server:", err);
    }
})