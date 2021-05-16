const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/todo', (req, res) => {

    res.header('content-type', 'application/json');
    res.send([
        { value: "My item" },
        { value: "My other item" },
    ]);

});

app.post('/todo', (req, res) => {

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});