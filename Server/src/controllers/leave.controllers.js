import Leave from "../model/leave.model.js";
import User from "../model/user.model.js";

// Calculate days difference function
const getDaysDifference = (startDate, endDate) => {
  // Convert string dates to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate difference in milliseconds
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
};

export const applyLeave = async (req, res) => {
  const { userId, leaveType, reason, startDate, endDate } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }

    const daysRequested = getDaysDifference(startDate, endDate);

    let currentBalance = 0;
    let balanceField = "";

    switch (leaveType) {
      case "Annual":
        currentBalance = user.annualLeaveBalance;
        balanceField = "annualLeaveBalance";
        break;
      case "Casual":
        currentBalance = user.casualLeaveBalance;
        balanceField = "casualLeaveBalance";
        break;
      case "Sick":
        currentBalance = user.sickLeaveBalance;
        balanceField = "sickLeaveBalance";
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid leave type", status: false });
    }

    if (daysRequested > currentBalance) {
      return res
        .status(400)
        .json({ message: "Insufficient leave balance", status: false });
    }

    // Create leave record
    const newLeave = await Leave.create({
      userId,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    // Update user's leave balance
    // user[balanceField] -= daysRequested;
    // await user.save();

    return res.status(201).json({
      message: "Leave applied successfully",
      leave: newLeave,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

export const approveLeave = async (req, res) => {
    
};
