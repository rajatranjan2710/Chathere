import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { getusers } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/getusers", protectedRoute, getusers);

export default userRouter;
