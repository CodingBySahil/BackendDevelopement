const mongoose = require("mongoose");

const userEnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const UserEnquiryModel = mongoose.model("UserEnquiry", userEnquirySchema);
module.exports = UserEnquiryModel;
