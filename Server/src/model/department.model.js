import mongoose from "mongoose";
import Counter from "./Counter.js";

const departmentSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

departmentSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  const counter = await Counter.findByIdAndUpdate(
    { _id: "departId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  this.id = counter.seq;
  next();
});

export default mongoose.model("Department", departmentSchema);
