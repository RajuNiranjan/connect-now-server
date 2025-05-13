import mongoose from "mongoose";
import { COLLECTION_NAME, DB_URI } from "../utils/env.js";

const connectDB = async () => {
  try {
    if (!DB_URI) {
      throw new Error("DB_URI is not defined in environment variables");
    }

    const connectionString = `${DB_URI}`;
    console.log("Attempting to connect to database...");

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Successfully connected to database");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit with failure
  }
};

connectDB();
