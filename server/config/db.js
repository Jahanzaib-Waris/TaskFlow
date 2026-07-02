import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const connection = await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;

  console.log(`MongoDB Connected: ${connection.connection.host}`);

  return connection;
};

export default connectDB;
