import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectdb from "./src/db/database.js";
import dotenv from "dotenv";
import authRouter from "./src/routes/user.routes.js";
import leaveRouter from "./src/routes/leave.routes.js";
import path from "path";
import departmentRouter from "./src/routes/department.routes.js";
import positionRouter from "./src/routes/position.routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("dist"));
// Root route
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

// API Routes
app.use("/api/v3", authRouter);
app.use("/api/v4", leaveRouter);
app.use("/api/v4", departmentRouter);
app.use("/api/v4", positionRouter);
// const num = 12
// const res = Math.abs(num)
// console.log(res)
const getDaysDifference = (startDate, endDate) => {
  const start = new Date(startDate);
  console.log(start, "startData");
  const end = new Date(endDate);
  console.log(end, "endDate");
  const diffTime = Math.abs(end - start);
  console.log(diffTime);
  return;
  // Dinon ki ginti (shamil dinon ke saath)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
};
console.log(getDaysDifference("2025-10-08", "2025-10-10 "));
// Catch-all route for SPA
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

// Start server after DB connection
(async () => {
  try {
    await connectdb();
    app.listen(port, () => {
      console.log(`🚀 SERVER IS RUNNING ON PORT ${port}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();
