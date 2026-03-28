import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to local MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;