let http = require("http");
let server = http.createServer((req,res)=>(
    res.end("<h1>Hello my first Node.js server! </h1>")
));

server.listen("8000")