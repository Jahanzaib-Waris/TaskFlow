import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";


dotenv.config();

connectDB();

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("TaskFlow API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});