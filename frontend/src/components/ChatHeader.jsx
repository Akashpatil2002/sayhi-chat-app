import { X, MoreVertical } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    const isOnline = onlineUsers.includes(selectedUser?._id);

    return (
        <div className="h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">

                {/* Back Button (Mobile) */}
                <button
                    onClick={() => setSelectedUser(null)}
                    className="lg:hidden p-2 -ml-2 text-zinc-400 hover:text-white transition-colors"
                >
                    <X size={22} />
                </button>

                {/* User Avatar */}
                <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-zinc-800">
                        <img
                            src={selectedUser.profilePic || "/avatar.png"}
                            alt={selectedUser.fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Online Status */}
                    {isOnline && (
                        <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-zinc-950" />
                    )}
                </div>

                {/* User Info */}
                <div>
                    <h3 className="font-semibold text-white text-lg tracking-tight">
                        {selectedUser.fullName}
                    </h3>
                    <p className={`text-sm flex items-center gap-1.5 ${isOnline ? 'text-emerald-400' : 'text-zinc-500'}`}>
                        <span className={`inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-zinc-600'}`} />
                        {isOnline ? "Online now" : "Offline"}
                    </p>
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 hover:bg-zinc-900 rounded-2xl text-zinc-400 hover:text-white transition-all"
                >
                    <MoreVertical size={20} />
                </motion.button>

                {/* Close Chat Button (Desktop) */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedUser(null)}
                    className="hidden lg:flex p-3 hover:bg-zinc-900 rounded-2xl text-zinc-400 hover:text-white transition-all"
                >
                    <X size={20} />
                </motion.button>
            </div>
        </div>
    );
};

export default ChatHeader;