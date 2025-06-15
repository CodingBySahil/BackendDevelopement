let http = require("http");
let server = http.createServer((req,res)=>{
    // res.end("<h1>Hello my first Node.js server! </h1>");
    // adding diffrent route according to node.js documentation
    if(req.url==="/") {
        res.end("<h1>Home Page</h1>");
    }else if(req.url==="/about") {
        res.end("<h1>About Page</h1>");
    }else if(req.url==="/news") {
        res.end("<h1>News Page</h1>");
    }

});

server.listen("8000")