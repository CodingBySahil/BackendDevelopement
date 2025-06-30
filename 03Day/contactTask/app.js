import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve CSS

// Routes
app.get("/", (req, res) => {
  res.send(`
    <div style="text-align:center; font-family:sans-serif">
      <h2>Welcome to the Contact Task App</h2>
      <a href="/contact" style="color:#007bff;text-decoration:underline">Go to Contact Form</a>
    </div>
  `);
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

app.post("/showcontactdetails", (req, res) => {
  const { name, email, contact, message } = req.body;
  res.send(`
    <div style="font-family: Arial; max-width: 600px; margin: auto; padding: 30px;">
      <h2>Hi ${name}, welcome!</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact Number:</strong> ${contact}</p>
      <p><strong>Your Message:</strong><br>${message}</p>
      <a href="/contact" style="color:#007bff;">← Back to Form</a>
    </div>
  `);
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
