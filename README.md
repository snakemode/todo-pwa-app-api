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

The API will return, and expect the following JSON:

[
    { value: "My item" },
    { value: "My other item" },
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

    res.header('content-type', 'application/json');
    res.send([
        { value: "My item" },
        { value: "My other item" },
    ]);

});
```

- We can now look at this in our browser and see that we've got a webserver that can send JSON data to our browsers!
    - Visit http://localhost:3000/todo to see.