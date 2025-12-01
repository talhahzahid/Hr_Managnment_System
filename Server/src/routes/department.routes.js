import express from "express";
import {
  createDepartmentAndUpdate,
  getAllDepartment,
} from "../controllers/department.controllers.js";
const router = express.Router();

router.post("/department/add", createDepartmentAndUpdate);
router.put("/department/upadte/:id", createDepartmentAndUpdate, (req, res) => {
  console.log(req, "request");
});
router.get("/department/getAll", getAllDepartment);

export default router;
