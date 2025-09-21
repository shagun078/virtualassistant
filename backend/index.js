import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
// import geminiResponse from "./gemini.js";

const app = express();

app.use(
  cors({
    origin: "https://virtualassistant-indol.vercel.app", 
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Optional test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect DB once
connectDb();

export default app;
