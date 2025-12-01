import Department from "../model/department.model.js";

const createDepartmentAndUpdate = async (req, res) => {
  console.log(req);
  const id = req.params.id;
  console.log(id);
  const { title, description, location, isActive } = req.body;

  if (!title || !description || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const body = {
    title,
    description,
    location,
    isActive,
  };

  if (id) {
    const updatedDepartment = await Department.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Deparment Updated Successfully",
      data: [{ data: updatedDepartment }],
    });
  }

  // --- Create Case ---
  const createdDepartment = await Department.create(body);

  res.status(201).json({
    status: "success",
    message: "Department Created Successfully",
    data: [{ data: createdDepartment }],
  });
};

const getAllDepartment = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search;
  const status = req.query.status;
  const skip = (page - 1) * limit;

  try {
    let filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (status) {
      filter.status = status;
    }

    const getAll = await Department.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalRecords = await Department.countDocuments(filter);
    const totalPages = Math.ceil(totalRecords / limit);

    res.status(200).json({
      status: "success",
      message: "Department Fetch Successfully",
      page,
      limit,
      totalPages,
      totalRecords,
      data: getAll,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

export { createDepartmentAndUpdate, getAllDepartment };
