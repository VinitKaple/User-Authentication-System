import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  const userId = req.user?._id; 

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "userId is required" });
  }

  try {
    const user = await userModel.findById(userId).select("name email");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: { name: user.name } });
  } catch (error) {
    console.log("Error in getUserData controller:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
