import express from "express";
import { applyLeave } from "../controllers/leave.controllers.js";

const router = express.Router();

router.post("/applyleave", applyLeave);

export default router;
