import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || ''; // Ensure this is set in your .env file

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    // If a connection is already established, return the cached connection
    return cached.conn;
  }

  if (!cached.promise) {
    // If no connection promise exists, create a new one
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB");
      return mongoose;
    });
  }

  try {
    // Await the connection promise and cache the connection
    cached.conn = await cached.promise;
  } catch (error) {
    // If the connection fails, log the error and throw it
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }

  return cached.conn;
}

export default connectDB;