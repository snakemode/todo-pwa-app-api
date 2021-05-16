const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/todo', (req, res) => {
    let savedData = [];

    if (fs.existsSync("./data.json")) {
        const fileData = fs.readFileSync("./data.json", { encoding: "utf-8" });
        savedData = JSON.parse(fileData);
    }

    res.json(savedData);
});

app.post('/todo', (req, res) => {
    fs.writeFileSync("./data.json", JSON.stringify(req.body));
    res.end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});