const contactSchema = require("../models/contactSchema");

const uploadContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await contactSchema.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({ message: "contact uploaded successfully" });
  } catch (error) {
    console.error("Error uploading contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactSchema.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleContact = async (req, res) => {
  try {
    const contact = await contactSchema.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getContactByName = async (req, res) => {
  try {
    const contacts = await contactSchema.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts by name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedContact = await contactSchema.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, message },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res
      .status(200)
      .json({ message: "Contact updated successfully", updatedContact });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const deletedContact = await contactSchema.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  uploadContact,
  getAllContacts,
  getSingleContact,
  getContactByName,
  updateContact,
  deleteContact,
};
