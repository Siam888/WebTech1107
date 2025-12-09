// const http = require("http");
// const { URL } = require("url");
// const random = require("random")


// These won't work if type is module

import books from "./books.js";
import http from "http";
import { URL } from "url"
import random from "random";


http
    .createServer(async (req, res) => {
        const url = new URL(req.url, "http://localhost");

        if (url.pathname === "/random" && req.method === "GET") {
            const randomBook = random.int(0, books.length - 1);
            res.write(JSON.stringify({ record: books[randomBook] }));
            res.end();
        } else {
            res.write(JSON.stringify({ records: books }));

        }
    })
    .listen(8080, () => {
        console.log("Server running at http://localhost:8080");
    });
