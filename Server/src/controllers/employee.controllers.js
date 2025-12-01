import Employee from "../model/employee.model.js";

// create and update empolyee profile
const createOrUpdateEmployeeProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    cnic,
    departmentId,
    postionId,
    joinDate,
    salary,
    employeeStatus,
  } = req.body;

  try {
    // find email
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        message: "Email already exists",
        status: false,
      });
    }
    const body = {
      firstName,
      lastName,
      email,
      cnic,
      department,
      jobTitle,
      joinDate,
      salary,
      status,
    };
    const save = await Employee.create(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: false,
    });
  }
};
