import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const generatedToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return generatedToken;
};
