const Admin = require("../model/adminModal");
const Task = require("../model/tasksModal");
const User = require("../model/userModal");

const getAdminInfo = async (req, res) => {
  try {
    const data = await Admin.findById(req.user._id).select(
      "name userName email createdAt"
    );
    const tasksCount = await Task.countDocuments({Created_By: req.user._id})
    const userCount = await User.countDocuments({created_by: req.user._id})
    
    return res.status(200).json({data, tasksCount, userCount});
  } catch (err) {
    return res
      .status(404)
      .json({ message: "No admin Info found.", status: false });
  }
};

const getUserinfo = async (req, res) => {
  try {
    console.log(req.user._id)
    const data = await User.findById({_id: req.user._id});
    console.log(data, "datadata")
    res
      .status(200)
      .json({
        message: "User data successfully found.",
        status: true,
        user: data,
      });
  } catch (err) {
    res.status(500).json({ message: "Failed to get user data", status: false });
  }
};

exports.getUserinfo = getUserinfo;
exports.getAdminInfo = getAdminInfo;
