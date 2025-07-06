import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be at least 5 characters" });
    }

    const user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
          success: true,
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
        success: true,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//  this method ensures that the user's session is invalidated on logout.

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}; ///So checkAuth is just a final step to send user data after token is verified.

export const sendResetOpt = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email Needed!!" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found!!" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account verification OTP",
      text: `your OTP for resetting password is ${otp}`,
    };
    await transporter.sendMail(mailOption);
    return res.json({ success: true, message: "Otp sent to email" });
  } catch (error) {

    return res.json({ success: false, message: "Error found" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Input validation
  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }

  try {
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // Validate OTP
    if (user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP!" });
    }

    // Check if OTP is expired
    if (Date.now() > user.resetOtpExpiredAt) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired!" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear OTP fields
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpiredAt = 0;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password reset successful!" });
  } catch (error) {
    console.log("Error in resetPassword controller:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

/* 
| Step                                          | Purpose                                                |
| --------------------------------------------- | ------------------------------------------------------ |
| `resetOtp = otp`                              | Save the OTP to the DB                                 |
| `resetOtpExpiredAt = Date.now() + 15*60*1000` | Save the **future timestamp** when the OTP expires     |
| `Date.now() > resetOtpExpiredAt`              | Check if current time is beyond expiry                 |
| `resetOtp = ""`, `resetOtpExpiredAt = 0`      | Clean up the OTP so it's **no longer valid** after use |

*/
