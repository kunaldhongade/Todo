import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

dotenv.config();

export const connectToDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {} as ConnectOptions);
  console.log("Connected to DB");
};
