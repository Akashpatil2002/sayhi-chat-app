import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// const BASE_URL = "http://localhost:5001"
const BASE_URL = "https://sayhi-chat-app.onrender.com"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    // ✅ ADD THIS
    setAuthUser: (user) => set({ authUser: user }),

    // checkAuth: async () => {
    //     try {
    //         const res = await axiosInstance.get("/auth/check");

    //         console.log("CHECK AUTH RESPONSE:", res.data);

    //         if (res.data?._id) {
    //             set({ authUser: res.data });
    //             get().connectSocket();
    //         } else {
    //             set({ authUser: null });
    //         }

    //     } catch (error) {
    //         if (error.response?.status !== 401) {
    //             console.log("Error in checkAuth:", error);
    //         }
    //         set({ authUser: null });
    //     } finally {
    //         set({ isCheckingAuth: false });
    //     }
    // },
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({ authUser: res.data });

        } catch (error) {
            set({ authUser: null }); // 🔥 always logout if no cookie
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIng: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIng: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/ath/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io("https://sayhi-chat-app.onrender.com", {
            withCredentials: true,      // ✅ MUST
            transports: ["websocket"],  // ✅ MUST
            query: {
                userId: authUser._id,
            },
        });

        socket.connect();

        set({ socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }
}));

// checkAuth: async () => {
//     try {
//         const res = await axiosInstance.get("/auth/check");
//         set({ authUser: res.data?._id ? res.data : null });
//         console.log("CHECK AUTH RESPONSE:", res.data);
//         get().connectSocket();
//     } catch (error) {
//         if (error.response?.status !== 401) {
//             console.log("Error in checkAuth:", error);
//         }
//         set({ authUser: null });
//     } finally {
//         set({ isCheckingAuth: false });
//     }
// },

