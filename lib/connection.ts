import { connect, ConnectOptions } from "mongoose";

let isConnected: boolean = false;
export const connectDatabase = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }

  if (isConnected) return;

  try {
    const options: ConnectOptions = {
      dbName: "twitter-clone",
      connectTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      serverSelectionTimeoutMS: 30000, // 30 seconds
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 5, // Minimum number of connections in the pool
      autoCreate: true,
      retryWrites: true,
      w: "majority",
    };

    const connection = await connect(process.env.DATABASE_URL, options);

    isConnected = true;
    console.log("MongoDB connected successfully:", 
      connection.connection.host, 
      connection.connection.name
    );
    return connection;
  } catch (error) {
    isConnected = false;
    console.error("MongoDB connection error:", error);
    // In production, you might want to retry or throw the error
    throw error;
  }
};
