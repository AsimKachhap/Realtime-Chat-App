import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { updateUser } from "../controllers/user.js";
const router = express.Router();

router.put("/:id", protectRoute, updateUser);

export default router;
