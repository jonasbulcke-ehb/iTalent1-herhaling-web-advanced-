const express = require("express")
const app = express();
const port = 1337
const path = require("path");
const cors = require("cors");
const fs = require("fs")

const bodyParser = require("body-parser")

const urlencodedParser = bodyParser.urlencoded({extended : false})
const jsonParser = bodyParser.json();

app.use(cors())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/info.html"))
})

app.get("/getDishes" ,(req, res) => {
    fs.readFile("public/dishes.json", "utf-8", (err, data) => {
        if(err) {
            console.log(`Error: ${err}`);
        } else {
            let dishes = JSON.parse(data).dishes;
            res.send(dishes);
        }
    })
})

app.get("/getDish", (req, res) => {
    fs.readFile("public/dishes.json", "utf-8", (err, data) => {
        if(err) {
            console.log(`Error ${err}`);
        } else {
            let dishes = JSON.parse(data).dishes;
            let id = req.query.id;
            if(!id) {
                console.log("Required id-parameter is missing!")
                res.send("Required id-parameter is missing!")
            } else if(id < 0 || id > dishes.length || isNaN(id)) {
                console.log("Invalid id!");
                res.send("Invalid id!");
            } else {
                res.send(dishes.filter(dish => dish.id == id));
            }
        }
    })
})

app.post("/saveNewDish", jsonParser, (req, res) => {
    let dish = req.body;
    console.log(dish);
    if(dish.price && dish.name) {
        fs.readFile("public/dishes.json", "utf-8", ((err, data) => {
            if(err) {
                console.log(`Error: ${err}`);
            } else {
                let dishes = JSON.parse(data);
                let obj = {
                    id : ++dishes.dishes.length,
                    name: dish.name,
                    price : dish.price
                }
                dishes.dishes.push(obj);
                dishes.dishes = dishes.dishes.filter(Object)
                console.log(dishes.dishes)
                fs.writeFile("public/dishes.json", JSON.stringify(dishes), err => console.log(`Error: ${err}`));
                res.redirect("/getDishes");
            }
        }))
    }
    else {
        console.log("Invalid dish!")
    }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));