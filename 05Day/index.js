const express = require("express");
let UserEnquiryModel = require("./models/userEnquiry"); 
const mongoose = require("mongoose");
const app = express();

// dotenv configuration
require("dotenv").config();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.send("Welcome to the User Enquiry API");
  } catch (error) {
    console.error("Error fetching welcome message:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/enquirylist", async (req, res) => {
  try {
    // Simulating database retrieval logic
    const enquiries = await UserEnquiryModel.find({});
    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/enquiryinsert", async (req, res) => {
  try {
    // Simulating database insertion logic
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userEnquiry = await UserEnquiryModel.create({
      name: name,
      email: email,
      phone: phone,
    });
    
    res.send("Enquiry Inserted Successfully");

    res.status(201).json({ message: "Enquiry inserted successfully" });
  } catch (error) {
    console.error("Error inserting enquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/enquirydelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEnquiry = await UserEnquiryModel.deleteOne({ _id: id });
    if (deletedEnquiry.deletedCount === 0) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/enquiryupdate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedEnquiry = await UserEnquiryModel.updateOne(
      { _id: id },
      { name, email, phone }
    );
    // Check if the update was successful
    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res
      .status(200)
      .json({ message: "Enquiry updated successfully", updatedEnquiry });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if connection fails
  });
