import User from "../models/User.js";
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
    return res.status(201).json({
      message: "User created SUCCESSFULLY.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error. ", error });
  }
};
