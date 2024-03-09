import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized- No token found",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }

    const user = await User.findById(decode.userId);
    // console.log(user);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error in protected route", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
