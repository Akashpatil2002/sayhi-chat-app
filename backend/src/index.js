import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js"

import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT;

// 🔥 ADD THIS (Render ke liye cookie fix)
app.set("trust proxy", 1);

// ✅ Added body size limit (Fix for PayloadTooLargeError)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

// ❌ WRONG: "/login" mat daalo
// app.use(cors({
//     origin: "https://sayhi-chat-app.vercel.app/login",
//     credentials: true,
// }));

// ✅ FIXED CORS
app.use(cors({
    origin: "https://sayhi-chat-app.vercel.app", // ✅ ONLY DOMAIN
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});