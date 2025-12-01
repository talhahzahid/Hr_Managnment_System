import mongoose from "mongoose";
import Counter from "./Counter.js";
import department from "./department.model.js";
const positionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    departId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

positionSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  const counter = await Counter.findByIdAndUpdate(
    { _id: "positionId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  this.id = counter.seq;
  next();
});

export default mongoose.model("Position", positionSchema);
