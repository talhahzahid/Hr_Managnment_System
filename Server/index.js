import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectdb from "./src/db/database.js";
import dotenv from "dotenv";
import authRouter from "./src/routes/user.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

// API Routes
app.use("/api/v3", authRouter);

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
