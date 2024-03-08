import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectToDB } from "./db/db";
import { todoRoutes } from "./routes/todos";

const app = express();

dotenv.config(); // this is for reading .env file
app.use(cors()); // this is for development only
app.use(express.json()); // this is for parsing json body
app.use(todoRoutes);
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Hello from server!"));

app.listen(PORT, () => {
  connectToDB();
  console.log(`⚡Server is running here 👉 https://localhost:${PORT}`);
});
