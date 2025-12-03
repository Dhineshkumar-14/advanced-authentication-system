import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use(express.json());
const PORT = process.env.PORT || 5003;

app.use("/auth", authRouter);

app.listen(PORT, (req, res) => {
  console.log("Sever Started Successfully at http://localhost:" + PORT);
  connectDB();
});
