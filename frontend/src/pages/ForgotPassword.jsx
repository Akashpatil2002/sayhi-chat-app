import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) return toast.error("Email is required");

        try {
            setLoading(true);

            await axiosInstance.post("/auth/forgot-password", { email });

            toast.success("Reset link sent to your email");

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black px-4">

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-3xl p-8 shadow-2xl"
            >

                {/* 🔥 Animated Icon */}
                <div className="flex justify-center mb-6 relative">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="size-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg"
                    >
                        <Mail className="text-white size-7" />
                    </motion.div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-white text-center">
                    Forgot Password
                </h2>

                <p className="text-zinc-400 text-sm text-center mt-2 mb-6">
                    Enter your email to receive a reset link
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email Input */}
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-zinc-500 size-5" />
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-700 focus:border-indigo-500 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-500 focus:outline-none transition-all duration-200"
                        />
                    </div>

                    {/* Button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 disabled:opacity-70 cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="size-5 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            "Send Reset Link"
                        )}
                    </motion.button>

                </form>

                {/* Footer */}
                <p className="text-zinc-500 text-sm text-center mt-6">
                    Remember your password?{" "}
                    <Link to="/login" className="text-indigo-400 hover:underline">
                        Login
                    </Link>
                </p>

            </motion.div>
        </div>
    );
};

export default ForgotPassword;