import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://sayhi-chat-app.onrender.com/api",
  withCredentials: true, // ✅ MUST
});