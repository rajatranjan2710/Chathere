import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

//importing database
import database from "./database/database.js";

//express app
const app = express();

// dotenv configuration
config("./.env");

const PORT = process.env.PORT;

// using middlewares
app.use(express.json()); // to parse incomming requests from json payload
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// test route
app.get("/", (req, res) => {
  res.send("Working!!!");
});

// server start
app.listen(PORT, () => {
  console.log(`server connected on ${PORT}`);
});

database();

//importing routes
import AuthRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import userRouter from "./routes/user.router.js";

app.use("/api/v1", messageRouter);
app.use("/api/v1", AuthRouter);
app.use("/api/v1", userRouter);
