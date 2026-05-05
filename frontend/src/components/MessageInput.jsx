import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an Image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="p-4 pb-6 bg-base-100/80 backdrop-blur-xl border-t border-white/10 relative">
            {/* Image Preview */}
            {imagePreview && (
                <div className="mb-4 px-2">
                    <div className="relative inline-block group">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded-2xl border border-white/10 shadow-xl"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 
                                     text-white rounded-full flex items-center justify-center 
                                     shadow-lg transition-all duration-200 hover:scale-110"
                            type="button"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2 sm:gap-3">
                {/* Main Input Container */}
                <div className="flex-1 relative">
                    <div className="flex items-center bg-base-200/80 backdrop-blur-md border border-white/10 
                      rounded-3xl px-4 sm:px-5 py-2.5 sm:py-2 focus-within:border-indigo-500/50 
                      focus-within:ring-1 focus-within:ring-indigo-500/30 transition-all duration-300">

                        <input
                            type="text"
                            className="flex-1 bg-transparent outline-none text-white placeholder-zinc-400 text-[16px] sm:text-[17px]"
                            placeholder="Type a message..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={`p-2.5 rounded-2xl transition-all hover:bg-white/10 
                ${imagePreview ? "text-emerald-400" : "text-zinc-400 hover:text-zinc-200"}`}
                        >
                            <Image size={21} />
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                {/* Send Button */}
                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center 
                   bg-gradient-to-br from-indigo-500 to-purple-600 
                   disabled:from-zinc-700 disabled:to-zinc-700 
                   rounded-2xl 
                   hover:scale-105 active:scale-95 
                   transition-all duration-200 shadow-lg
                   disabled:cursor-not-allowed disabled:shadow-none
                   flex-shrink-0"
                >
                    <Send size={22} className="text-white" />
                </button>
            </form>

            {/* Beautiful Footer Message with Framer Motion */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-center"
            >
                <p className="text-zinc-500 text-xs flex items-center justify-center gap-1.5">
                    Messages are end-to-end encrypted
                    <span className="text-emerald-400">🔒</span>
                </p>
            </motion.div>
        </div>
    );
};

export default MessageInput;