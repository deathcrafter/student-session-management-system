import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import studentRouter from "./routes/student";
import deanRouter from "./routes/dean";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/student", studentRouter);
app.use("/dean", deanRouter);

app.get("/", (_req, res) => {
  res.json({
    uptime: process.uptime(),
  });
});

mongoose.connect("mongodb://localhost:27017/student-portal").then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT || 3341, () => {
    console.log("Server listening on port: " + process.env.PORT || 3341);
  });
});
