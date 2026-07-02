import app from "../app.js";
import connectDB from "../config/db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    res.status(500).json({ success: false, message: "Database connection failed" });
    return;
  }

  app(req, res);
}
