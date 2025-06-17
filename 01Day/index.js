// let http = require("http");
// let server = http.createServer((req, res) => {
//   let newsData = {
//     status: 200,
//     data: [
//       {
//         id: 1,
//         title: "News 1",
//         description: "News 1 description",
//       },
//       {
//         id: 2,
//         title: "News 2",
//         description: "News 2 description",
//       },
//       {
//         id: 3,
//         title: "News 3",
//         description: "News 3 description",
//       },
//     ],
//   };
//   if (req.url === "/") {
//     res.end("<h1>Home Page</h1>");
//   } else if (req.url === "/about") {
//     res.end("<h1>About Page</h1>");
//   } else if (req.url === "/news") {
//     res.end(JSON.stringify(newsData));
//   }
// });

// server.listen("8000");

const express = require("express");
const { checkPassword, checkToken } = require("./checkTokenMiddleware");
const app = express();

require("dotenv").config();

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello express as a first use");
});

// News data object
const newsData = {
  status: 200,
  data: [
    { id: 1, title: "News 1", description: "News one description" },
    { id: 2, title: "News 2", description: "News two description" },
    { id: 3, title: "News 3", description: "News three description" },
  ],
};

// GET: send news data
app.get("/news", checkPassword, checkToken, (req, res) => {
  res.send(newsData);
});

// POST: receive query data
app.post("/querydata", (req, res) => {
  const userData = req.query;
  console.log("Query data:", userData);
  res.send({ status: 201, msg: "User data from query", user: userData });
});

// POST: receive body data (JSON)
app.post("/bodydata", (req, res) => {
  const userData = req.body;
  console.log("Body data:", userData);
  res.send({ status: 201, msg: "User data from body", user: userData });
});

// POST: receive data from route param
app.post("/param/:id", (req, res) => {
  const ID = req.params.id;
  console.log("Param ID:", ID);
  res.send({ status: 201, msg: "User data from param id", user: ID });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
