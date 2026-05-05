import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);

            set({ messages: [...messages, res.data] });

            // 🔥 SOCKET EMIT (ADD THIS)
            const socket = useAuthStore.getState().socket;
            socket.emit("sendMessage", res.data);

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        // 🔥 EXISTING (keep it)
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage],
            });
        });

        // ===============================
        // 🔥 ADD THIS (Delivered)
        // ===============================
        socket.on("messageDelivered", (messageId) => {
            set((state) => ({
                messages: state.messages.map((msg) =>
                    msg._id === messageId
                        ? { ...msg, delivered: true }
                        : msg
                ),
            }));
        });

        // ===============================
        // 🔥 ADD THIS (Seen)
        // ===============================
        socket.on("messagesSeen", ({ senderId }) => {
            set((state) => ({
                messages: state.messages.map((msg) =>
                    msg.senderId === senderId
                        ? { ...msg, seen: true }
                        : msg
                ),
            }));
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;

        socket.off("newMessage");

        // 🔥 ADD THESE
        socket.off("messageDelivered");
        socket.off("messagesSeen");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));