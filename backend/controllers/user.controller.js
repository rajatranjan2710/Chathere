import { User } from "../models/user.model.js";

export const getusers = async (req, res) => {
  // console.log("hitting this api");
  try {
    // console.log("code here");

    const loggedInUser = req.user._id;
    if (!loggedInUser) {
      return res.status(404).json("No user found");
    }

    const filteredusers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    if (!filteredusers) {
      return res.status(404).json({
        error: "Somethig unexpected happened",
      });
    }

    const filteredusersSize = filteredusers.length;

    res.status(200).json({
      message: "All user fetched",
      filteredusers,
      filteredusersSize,
    });
  } catch (error) {
    console.log("error in getuser controller ", error.message);
    res.status(500).json({});
  }
};
