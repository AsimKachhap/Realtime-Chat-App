import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { sendOnboardingEmail } from "../helpers/emailHandler.js";

// SIGNUP
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are reqiured." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email adddress." });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    const token = generateToken({ id: user._id });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const onboardingEmailStatus = await sendOnboardingEmail(
      "Chatify",
      user.email,
      user.name,
      "Welcome to Chatify",
    );
    return res.status(201).json({
      message: "User created SUCCESSFULLY.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error. ", error });
  }
};

// LOG IN

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and Password are required." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid Credentials.",
      });
    }

    const token = generateToken({ id: user._id });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User Logged in SUCCESSFULLY.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log("Error in Login Controller.", error);
    res.status(500).json({
      message: "Internal Server error.",
    });
  }
};

// LOGOUT

export const logout = async (req, res) => {
  res.clearCookie("jwt", {
    // Always match original cookie settings to avoid gotchas
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({
    message: "Logged out SUCCESSFULLY.",
  });
};
