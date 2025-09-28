import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminAuth.js";

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


connectDB();


app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => res.send("🚀 Backend running..."));

const PORT = process.env.PORT
