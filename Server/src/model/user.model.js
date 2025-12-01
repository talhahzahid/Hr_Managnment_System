import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
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
      default: 15,
    },
    casualLeaveBalance: {
      type: Number,
      default: 10,
    },
    sickLeaveBalance: {
      type: Number,
      default: 20,
    },
    role: {
      type: String,
      required: true,
      enum: ["staff", "hr", "admin"],
      default: "staff",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  const counter = await Counter.findByIdAndUpdate(
    { _id: "userId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.id = counter.seq;

  next();
});

export default mongoose.model("User", userSchema);
