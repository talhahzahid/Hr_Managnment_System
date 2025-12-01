import express from "express";
import {
  createPositionAndUpdate,
  getAllPosition,
} from "../controllers/postion.controllers.js";
const router = express.Router();

router.post("/position/add", createPositionAndUpdate);
router.put("/position/upadte/:id", createPositionAndUpdate, (req, res) => {
  console.log(req, "request");
});
router.get("/position/getAll", getAllPosition, (req, res) => {
  console.log(req);
});

export default router;
