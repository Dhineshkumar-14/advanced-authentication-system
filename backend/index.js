import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRouter from "./routes/auth.route.js";

const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/auth", authRouter);

app.listen(PORT, (req, res) => {
  console.log("Sever Started Successfully at http://localhost:" + PORT);
  connectDB();
});
