
const express = require("express")

const port = 8080;
const app = express();

app.use(express.static('./public'))


app.get("/hello", function (req, res) {
    res.send("Hello there!")
})



app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})