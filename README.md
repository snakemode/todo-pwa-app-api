# pwa-app-api
An API built for a teaching class


# How this is built

(Notes for teaching session)

- install node!

- create a new directory
- change directory so you're inside your directory

- npm init
    - Add some descriptive text

- create index.js - your server entry point
    - add console.log("Hello world");

- open package.json and look at tasks
    - add task "start" - contents "node index.js"

- go to the command line
    - type: npm run start

- Notice node runs your javascript file!
    - writes "Hello world" to the console.
    - Explain that node is a javascript runtime for general programs
    - You can write anything in node, and what we're going to do to build our API is run a webserver
    - Explain what a webserver is

- Lets make it a web server

- add dependencies
    - npm install express --save
    - npm install body-parser --save
    - npm install nodemon --save-dev
    - explain express to students
    - explain that nodemon restarts your node application whenever we change a file

Replace index.js with express hello world:

```js
const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
```

- Edit npm run start to
    - nodemon index.js

- Type NPM run start
    - watch as webserver starts and console logs
    - visit it in a browser on http://localhost:3000;

- Yay, we have a webserver, EVERYTHING on the web is served from web servers.
- APIs are just web servers that return data, rather than web pages.

- Let's design our API!

Our HTTP API is going to be a webserver that looks like this:

GET - /todos - returns todo list
POST - /todos - saves whole todo list.

The API will return, and expect the following JSON array:

[
    { "value": "My item" },
    { "value": "My other item" },
]

We're going to use a `HTTP header` to supply an `apiKey` (to let you access the API) and an `accountId` (so you know which list you're saving).
`GET` and `POST` are both `HTTP Request Methods` - part of the `Hyper Text Transfer protocol` - or `HTTP` for short.

- Adding our todo apis

Let's add our two API endpoints to our index.js file:

```js
app.get('/todo', (req, res) => {

});

app.post('/todo', (req, res) => {

});
```

This is how you add a new `route` in `express.js` - we're telling the framework to respond to HTTP requests for `get` and `post` to `/todo`.
When those requests are received by the webserver, the code in the arrow function will be executed.
We're provided with the `req` and `res` JavaScript objects.
Req contains information from the incoming request, and res is the "response object" that we can add data to to send it back to the caller (often a users browser!).

- Let's update our GET function to return some hard-coded "todo" items

```js
app.get('/todo', (req, res) => {
    res.json([
        { "value": "My item" },
        { "value": "My other item" },
    ]);
});
```

- We can now look at this in our browser and see that we've got a webserver that can send JSON data to our browsers!
    - Visit http://localhost:3000/todo to see.

- Instead of just having a hardcoded variable to return todo items to our users, lets move our data to a variable that lives in the memory of our webserver.

```js
let  savedData = [
    { "value": "My item" },
    { "value": "My other item" },
];

app.get('/todo', (req, res) => {
    res.json(savedData);
});
```

- By moving our code into a variable, we can make our GET api a little simpler

- Now let's add our POST api
    - First, add a require for body-parser on line 2
    - add an app.use for bodyParser to enable body parsing after our port definition.

```js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
```

- We're now setup to receive json data

```js
app.post('/todo', (req, res) => {
    savedData = req.body;
    res.end();
});
```

- This function will take ANY json posted to it, and assign it to our savedData variable.
- If we post data to our /todo endpoint with the content-type of application/json, it'll be saved in memory.

- This is kind of "fine" for a demo, but obviously only supports a single todo list!
- The data also vanishes whenever we restart the server!

- Let's use our local file system to store data instead.
- Instead of storing everything in memory let's use the node "fs" package to store our data in a file, and load it from a file.

- We'll need to add a require for another node built in package called 'fs' - short for "file system".

```js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;
```

- Now we can read and save to files on our computer.

```js
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
```

- Here we're saving a file to the `file system` called `data.json`, and we're "stringifying" it to save - converting it to text, and "parsing it" converting it back to JavaScript objects - when we load it.

This is cool, because our data now survives us restarting the server!
- In a real application, we'd probably use a database or some other kind of storage to store our data.

- If we have multiple users, we might want to use a HTTP header to tell them appart
    - Headers are commonly used to add things like API keys for authentication
    - In our example, we'll support multiple users by adding a HTTP header to identify our user.
    - We'll modify the GET function to look for a header
    - We'll modify the POST function to save to a file using that header value as it's name.

```js

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
    console.log(req.headers);
    const dataFileName = `./data.${userId}.json`;

    if (!userId) {
        res.statusCode = 401;
        res.end();
        return;
    }

    fs.writeFileSync(dataFileName, JSON.stringify(req.body));
    res.end();
});
```

- We're now trying to read `userid` from the headers collection, and our APIs will only work if a `userid` is present.

- We're also going to save to a data file per user, so users can have their own todo lists!