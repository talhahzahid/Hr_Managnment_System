import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    cnic: { type: String, required: true },
    departmentId: { type: String, required: true },
    positionId: { type: String, required: true },
    joinDate: { type: Date, default: Date.now },
    employeeStatus: {
      type: String,
      enum: ["active", "terminate", "leave"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
