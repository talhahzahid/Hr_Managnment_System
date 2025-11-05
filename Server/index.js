import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectdb from "./src/db/database.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});

(async () => {
  try {
    await connectdb();
    app.listen(port, () => {
      console.log(`SERVER IS RUNNING ON PORT ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();
