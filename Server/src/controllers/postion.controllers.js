import mongoose from "mongoose";
import Position from "../model/position.model.js";
import { get } from "http";

const createPositionAndUpdate = async (req, res) => {
  const id = req.params.id;
  const { departId, title, description, isActive } = req.body;

  if (!departId || !title || !description) {
    return res
      .status(400)
      .json({ status: false, message: "All fields are required" });
  }

  const body = { departId, title, description, isActive };

  try {
    // update case
    if (id) {
      const updatedPosition = await Position.findOneAndUpdate(
        { id: id },
        body,
        { new: true, runValidators: true }
      );

      if (!updatedPosition) {
        return res.status(404).json({ message: "Position not found" });
      }

      return res.status(200).json({
        status: "success",
        message: "Position Updated Successfully",
        data: { data: updatedPosition },
      });
    }

    // create case
    const createPosition = await Position.create(body);

    return res.status(200).json({
      status: "success",
      message: "Position Created Successfully",
      data: { data: createPosition },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const getAllPosition = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const search = req.query.search || "";
  const skip = (page - 1) * limit;
  try {
    let filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    console.log(filter);
    const getAll = await Position.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    console.log(getAll);
    const totalRecords = await Position.countDocuments();
    console.log(totalRecords, "total records");
    const totalPage = Math.ceil(totalRecords / limit);
    console.log(totalPage, "totalPage");
    res.status(200).json({
      status: "success",
      message: "Position Fetch Successfully",
      totalRecords,
      totalPage,
      data: getAll,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export { createPositionAndUpdate, getAllPosition };
