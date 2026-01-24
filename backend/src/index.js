import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./utils/db.js";
import authRoute from "./routes/authRoute.js";

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3030;

// MAking app to serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist/")));

  // In Express 5 '*' is not supported use this syntax instead '*name'
  app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`SERVER is up and running on ${PORT}`);
  connectDB();
});
