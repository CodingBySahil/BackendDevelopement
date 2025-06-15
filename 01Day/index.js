let http = require("http");
let server = http.createServer((req,res)=>{
    // res.end("<h1>Hello my first Node.js server! </h1>");
    // adding diffrent route according to node.js documentation
    let newsData={
        status:200,
        data:[
            {
                id:1,
                title:"News 1",
                description:"News 1 description"
            },
            {
                id:2,
                title:"News 2",
                description:"News 2 description"
            },
            {
                id:3,
                title:"News 3",
                description:"News 3 description"
            }
        ]
    }
    if(req.url==="/") {
        res.end("<h1>Home Page</h1>");
    }else if(req.url==="/about") {
        res.end("<h1>About Page</h1>");
    }else if(req.url==="/news") {
        res.end(JSON.stringify(newsData));
    }

});

server.listen("8000")