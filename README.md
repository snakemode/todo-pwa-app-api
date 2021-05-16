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
    - explain express to students

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

- Type NPM run start
    - watch as webserver starts and console logs
    - visit it in a browser on http://localhost:3000;

- Yay, we have a webserver, EVERYTHING on the web is served from web servers.
- APIs are just web servers that return data, rather than web pages.