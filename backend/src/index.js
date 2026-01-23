import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./utils/db.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const joinedPath = path.join(__dirname, "../frontend/dist/index.html");

console.log("joinedPath : ", joinedPath);

const PORT = process.env.PORT || 3030;

// Making App ready for Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.use("*path", (req, res) => {
    // In Express 5 '*' is not supported use this syntax instead '*name'
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`SERVER is up and running on ${PORT}`);
  connectDB();
});
