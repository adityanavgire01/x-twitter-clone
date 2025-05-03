import { connect, ConnectOptions } from "mongoose";

let isConnected: boolean = false;
export const connectDatabase = async () => {
  if (!process.env.DATABASE_URL) {
    return console.error("database not connected");
  }

  if (isConnected) return;

  try {
    const options: ConnectOptions = {
      dbName: "twitter-clone",
      autoCreate: true,
    };

    await connect(process.env.DATABASE_URL, options);

    isConnected = true;
    console.log("Connected successfully");
  } catch (error) {
    console.log("error from database", error);
  }
};
