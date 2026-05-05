import { MessageSquare, Heart } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-6 bg-gradient-to-br from-base-100 to-base-200/30 relative overflow-hidden">

            <div className="max-w-xs text-center space-y-6">

                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex justify-center"
                >
                    <div className="relative">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 
                                      flex items-center justify-center border border-white/10 shadow-xl">
                            <MessageSquare className="w-10 h-10 text-indigo-400" />
                        </div>
                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-1 -right-1 w-7 h-7 bg-pink-500/10 rounded-2xl 
                                     flex items-center justify-center border border-pink-400/30"
                        >
                            <Heart className="w-4 h-4 text-pink-400" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-white tracking-tight"
                >
                    Welcome to SayHi!
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-zinc-400 text-[15px] leading-relaxed"
                >
                    Select a conversation from the sidebar to start chatting
                </motion.p>

                {/* Decorative Emojis */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center gap-5 text-3xl opacity-30 mt-4"
                >
                    <span>👋</span>
                    <span>💬</span>
                    <span>✨</span>
                </motion.div>

            </div>

            {/* Footer Message */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-8 text-center"
            >
                <p className="text-zinc-500 text-sm flex items-center justify-center gap-1.5">
                    Made with <span className="text-red-500">❤️</span> for meaningful talks
                </p>
            </motion.div>
        </div>
    );
};

export default NoChatSelected;