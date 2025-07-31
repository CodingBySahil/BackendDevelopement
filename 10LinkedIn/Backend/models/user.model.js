import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,

    },
    lastName: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
      unique: true,
      lowercase:true
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    headline: {
      type: String,
      default: "",
    },
    skills: [{ type: String }],
    education: [
      {
        college: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
      },
    ],
    location: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    experience: [
      {
        title: { type: String },
        company: { type: String },
        description: { type: String },
      },
    ],
    connection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
export default User;
