import { Book } from "./books.js";
import { synchronizeDatabase } from "./config.js";
import { Op } from "sequelize";

import express from "express";

const app = express();
app.use(express.json());


// The method will be async because we will use await keyword to call synchronizeDatabase so we can wait the syncronization process
const server = app.listen(8080, async () => {
    try {
        // this method will synchronize the models 
        await synchronizeDatabase();
        console.log("Server started on 8080");
    } catch (err) {
        console.log("Error with the db connection");
        // on error close the application
        server.close();
    }
})


app.post('/books', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/books', async (req, res) => {

    // the query params key-value pairs are mapped to a JS object
    const query = req.query;
    // extract all the fields of the Book entity
    const entityKeys = Object.keys(Book.getAttributes());

    // remove a the "id" property from query object
    delete query.id;

    // get all properties 
    const whereCondition = Object.keys(query)
        .filter(key => entityKeys.includes(key)) // only keep the wanted properties
        .map(key => {
            // if the searched key is title or author partial match can return an entity
            if (key === "title" || key === "author") {
                return { [key]: { [Op.like]: `%${query[key]}%` } };
            }
            // for everything else we want equality
            return { [key]: query[key] }
        })

    // return all Books
    const books = await Book.findAll({
        attributes: ['id', 'title', 'author', 'year', 'pages'], // return these attributes
        where: whereCondition // based on this condition (eg. {title : "Something", pages: 123} )
    });

    return res.send(books);
})

app.get('/books/:id', async (req, res) => {
    const id = req.params.id;

    // return the first instance that has the specified id
    const book = await Book.findOne({
        where: {
            id: id
        }
    })

    res.send(book);
})

app.put('/books/:id', async (req, res) => {
    const id = req.params.id;
    const updatedBook = req.body;

    const book = await Book.findOne({
        where: {
            id: id
        }
    })

    if (!!book) {
        delete book.id;

        book.set({
            ...updatedBook
        })

        await book.save();
        return res.sendStatus(204)
    }

    return res.status(404).send({ message: "book not found" });
})

app.delete('/books/:id', async (req, res) => {
    await Book.destroy({
        where: {
            id: req.params.id
        }
    })

    res.sendStatus(204)
})