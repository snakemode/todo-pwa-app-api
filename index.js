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
    const userId = req.headers["userid"];
    const dataFileName = `./data.${userId}.json`;

    if (!userId) {
        res.statusCode = 401;
        res.end();
        return;
    }

    let savedData = [];

    if (fs.existsSync(dataFileName)) {
        const fileData = fs.readFileSync(dataFileName, { encoding: "utf-8" });
        savedData = JSON.parse(fileData);
    }

    res.json(savedData);
});

app.post('/todo', (req, res) => {
    const userId = req.headers["userid"];
    const dataFileName = `./data.${userId}.json`;

    if (!userId) {
        res.statusCode = 401;
        res.end();
        return;
    }

    fs.writeFileSync(dataFileName, JSON.stringify(req.body));
    res.end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});