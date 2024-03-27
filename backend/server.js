import path from "path";
import express from "express";

import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";

//importing database
import database from "./database/database.js";

//express app
// const ap = express();

// dotenv configuration
config("./.env");

const __dirname = path.resolve();

const PORT = process.env.PORT;

// using middlewares
app.use(express.json()); // to parse incomming requests from json payload
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // You may need this if your frontend sends credentials (e.g., cookies)
  })
);

//importing routes
import AuthRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import userRouter from "./routes/user.router.js";

app.use("/api/v1", messageRouter);
app.use("/api/v1", AuthRouter);
app.use("/api/v1", userRouter);

app.use(express.static(path.join(__dirname, "/frontend/build")));
//for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// test route
app.get("/", (req, res) => {
  res.send("Working!!!");
});

// server start
server.listen(PORT, () => {
  console.log(`server connected on ${PORT}`);
});

database();
