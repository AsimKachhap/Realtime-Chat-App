import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbInstance = await mongoose.connect(process.env.MONGODB_URI);
    const host = dbInstance.connection.host;
    console.log("SUCCESFULLY connected to MONGODB Database. Host: ", host);
  } catch (error) {
    console.log("MONGODB Connection FAILED");
    process.exit(1);
  }
};

export default connectDB;
