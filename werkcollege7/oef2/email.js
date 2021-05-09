const axios = require("axios");
const fs = require("fs")

axios.get("https://jsonplaceholder.typicode.com/comments")
    .then(response => {
        //console.log(response.data);

        let emails = response.data.map(comment => comment.email);
        writeToFile(emails);
    })
    .catch(error => {
        console.log(`Error: ${error}`);
    });

let writeToFile = (list) => {
    let obj = {
        source : "JSONPlaceholder",
        content : "emails from comments",
        emails: list
    };
    fs.writeFile("emails.json", JSON.stringify(obj), "utf-8", err => err ? console.log(`Error: ${err}`) : console.log("file successfully created"));
}