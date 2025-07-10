import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully");
    } else {
      console.log("MongoDB already connected, reusing...");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Propagate error instead of exiting
  }
};

export const disconnectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log("MongoDB disconnected successfully");
    } else {
      console.log("MongoDB already disconnected or not connected");
    }
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error; // Propagate error instead of exiting
  }
};