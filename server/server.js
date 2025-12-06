import express from "express";
import cors from "cors";
import { connectDB } from "./config.js";
import promiseRoutes from "./routes/promiseRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api/promises", promiseRoutes);

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
