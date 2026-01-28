import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  const targetUserId = req.params.id;
  const token = req.cookies["jwt"];
  if (!token) {
    return res.status(401).json({
      message: "No Token found.",
    });
  }
  const currentUser = jwt.decode(token, process.env.JWT_SECRET);
  if (currentUser.id !== targetUserId) {
    return res.status(404).json({
      message: "FORBIDDEN; You cannot update other's details.",
    });
  }
  next();
};
