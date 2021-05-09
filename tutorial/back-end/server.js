const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql2")
const config = require("./config.json")

app.use(cors())

app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html/help.html"));
});

app.get("/getBooks", (req, res) => {
    connection.query(
        "SELECT * FROM BOOK",
        (err, results) => {
            if(err) {
                console.log(`Error: ${err}`);
            } else if(results) {
                res.send(results)
            }
        }
    )
})

app.post("/insertBook", (req, res) => {
    if(req) {
        console.log(req.body);
        let book = req.body;
        let sql = `INSERT INTO BOOK(title, author, price, publisher) VALUES (?,?,?,?)`;
        connection.query(
            sql,
            [book.title, book.author, book.price, book.publisher],
            (err, result) => {
                if(err) {
                    console.log(err);
                }
                if(result) {
                    res.send('OK')
                }
            }
        )
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`));

