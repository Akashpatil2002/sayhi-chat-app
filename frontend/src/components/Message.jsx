import { Check, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

const Message = ({ message, isOwn }) => {
    return (
        <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4 px-3`}>
            <div className={`max-w-[78%] group`}>
                <div className={`px-4 py-3 rounded-3xl text-[15.5px] leading-relaxed break-words
                    ${isOwn
                        ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-md"
                        : "bg-base-200 text-white rounded-bl-md"
                    }`}
                >
                    {message.image && (
                        <img
                            src={message.image}
                            alt="sent"
                            className="rounded-2xl max-w-[260px] mb-2 shadow-md"
                        />
                    )}
                    <p>{message.text}</p>
                </div>

                {/* Time + Status Ticks */}
                <div className={`flex items-center gap-1.5 mt-1.5 ${isOwn ? "justify-end" : "justify-start"}`}>
                    <span className="text-[10px] text-zinc-500 font-light">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>

                    {/* Ticks only for own messages */}
                    {isOwn && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {message.seen ? (
                                <CheckCheck size={17} className="text-blue-400" />      // Seen (Blue)
                            ) : message.delivered ? (
                                <CheckCheck size={17} className="text-zinc-400" />     // Delivered
                            ) : (
                                <Check size={17} className="text-zinc-400" />          // Sent
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;