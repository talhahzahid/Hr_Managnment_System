import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    annualLeaveBalance: {
      type: Number,
      default: 0,
    },
    casualLeaveBalance: {
      type: Number,
      default: 0,
    },
    sickLeaveBalance: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      required: true,
      enum: ["staff", "manager", "ceo"],
      default: "staff",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
