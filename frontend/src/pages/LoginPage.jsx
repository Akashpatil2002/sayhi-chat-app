import { useState } from "react";
import { motion } from 'framer-motion';
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import AuthImagePattern from "../components/AuthImagePattern";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login, isLogginIn, setAuthUser } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    };

    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLogin = useGoogleLogin({
        flow: "auth-code",

        onSuccess: async (codeResponse) => {
            try {
                setIsGoogleLoading(true);

                const res = await axiosInstance.post("/auth/google", {
                    code: codeResponse.code,
                });

                console.log("LOGIN SUCCESS:", res.data);

                // ✅ FIXED
                setAuthUser(res.data);

                toast.success("Google Login Success");

                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 200);

            } catch (error) {
                console.log("API ERROR:", error.response?.data);
                toast.error("Google login failed");
            } finally {
                setIsGoogleLoading(false);
            }
        },

        onError: (err) => {
            console.log("GOOGLE SDK ERROR:", err);
        },
    });


    return (
        <div className="min-h-screen bg-zinc-950 pt-20 pb-12 flex items-center justify-center px-4">
            <div className="w-full max-w-sm mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1
                        }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        className="relative size-14 flex items-center justify-center mb-5"
                    >

                        {/* Outer Pulse Ring */}
                        <motion.div
                            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            className="absolute size-14 rounded-2xl bg-purple-500/30 blur-md"
                        />

                        {/* Rotating Gradient Border */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-violet-600"
                        >
                            <div className="w-full h-full rounded-2xl bg-base-100"></div>
                        </motion.div>

                        {/* Main Box */}
                        <div className="relative size-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 flex items-center justify-center shadow-xl shadow-purple-500/20">

                            {/* Icon Animation */}
                            <motion.div
                                animate={{
                                    y: [0, -4, 0],
                                    rotate: [0, 6, -6, 0]
                                }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                            >
                                <MessageSquare className="size-8 text-white" />
                            </motion.div>

                        </div>
                    </motion.div>

                    <h1 className="text-2xl font-semibold text-white tracking-tight">Welcome Back</h1>
                    <p className="text-zinc-400 text-sm mt-1.5">Sign in to continue</p>
                </div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-3xl p-8 shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400 tracking-wide">EMAIL ADDRESS</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-indigo-500 rounded-2xl py-3.5 pl-11 text-white placeholder:text-zinc-500 focus:outline-none transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400 tracking-wide">PASSWORD</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-indigo-500 rounded-2xl py-3.5 pl-11 pr-12 text-white placeholder:text-zinc-500 focus:outline-none transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-indigo-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex items-center justify-between">

                            {/* Google Login */}
                            <button
                                type="button"
                                onClick={() => handleGoogleLogin()} // ✅ clean trigger
                                disabled={isGoogleLoading}
                                className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors group cursor-pointer disabled:opacity-50"
                            >
                                {isGoogleLoading ? (
                                    <span>Signing in...</span>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" viewBox="0 0 48 48">
                                            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.8 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.4-.4-3.5z" />
                                            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 5.1 29.3 3 24 3 16.1 3 9.2 7.4 6.3 14.7z" />
                                            <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.5-5.3l-6.2-5.1C29.2 36.5 26.7 37.5 24 37.5c-5.3 0-9.8-3.6-11.4-8.5l-6.5 5C9 40.6 15.9 45 24 45z" />
                                            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.6-6 7.3l6.2 5.1C39.9 37 45 30.9 45 24c0-1.2-.1-2.4-.4-3.5z" />
                                        </svg>

                                        <span className="group-hover:underline">
                                            Login with Google
                                        </span>
                                    </>
                                )}
                            </button>

                            {/* Forgot Password */}
                            <Link
                                to="/forgot-password"
                                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                            >
                                Forgot password?
                            </Link>

                        </div>

                        {/* Sign In Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.985 }}
                            type="submit"
                            disabled={isLogginIn}
                            className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 disabled:opacity-70 text-[15px] cursor-pointer"
                        >
                            {isLogginIn ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Signup Link */}
                <div className="text-center mt-6">
                    <p className="text-zinc-500 text-sm">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                        >
                            Create account
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;