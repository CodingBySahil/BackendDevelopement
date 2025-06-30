import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static CSS

// Routes
app.get("/", (req, res) => {
  res.send("<h2>Welcome to the Express App</h2><p><a href='/htmlFile'>View HTML Page</a></p>");
});

app.get("/htmlFile", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "htmlFile.html"));
});

app.get("/renderForm", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "form.html"));
});

app.post("/addition", (req, res) => {
  const { num1, num2 } = req.body;
  const sum = parseFloat(num1) + parseFloat(num2);
  res.send(`
    <div style="text-align:center; font-family:sans-serif">
      <h2>The sum is: ${sum}</h2>
      <a href="/renderForm">Go back</a>
    </div>
  `);
});

// Server Start
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
