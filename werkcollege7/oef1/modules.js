import { readFile, mkdir, writeFile } from "fs";

readFile("boardgames.json", "utf-8", (err, data) => {
    console.log("Error: " + err);
    let boardgames = JSON.parse(data);
    //console.log(data);
    for(let id in boardgames) {
        let boardgame = boardgames[id];
        let fileName = `boardgames/${id}.json`;
        mkdir("boardgames", (err) => {
            if(err) {
                console.log(`Error: ${err}`);
            } else {
                console.log("Directory created")
            }
        });
        writeFile(fileName, JSON.stringify(boardgame), "utf-8", (err) => {
            if(err) {
                console.log(`Error: ${err}`);
            } else {
                console.log(`${fileName} successfully created`);
            }
        });
    }
});

















