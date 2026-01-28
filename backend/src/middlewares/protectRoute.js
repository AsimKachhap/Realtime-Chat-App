import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, resizeBy, next) => {
  const targetUserId = req.params.id;
  const token = req.cookies["jwt"];
  if (!token) {
    return res.status(401).json({
      message: "No Token found.",
    });
  }
  const currentUser = jwt.decode(token, process.env.JWT_SECRET);
  console.log(currentUser);
  next();
};
