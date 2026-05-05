import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
//import { signup } from "../../../backend/src/controllers/auth.controller";
// import User from "../../../backend/src/models/user.model";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) signup(formData);
    };

    return (
        <div className="min-h-screen bg-zinc-950 pt-20 pb-12 flex items-center justify-center px-4">
            <div className="w-full max-w-sm mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8, rotate: -90 }}
                        animate={{
                            scale: 1,
                            rotate: 360
                        }}
                        transition={{
                            duration: 1,
                            ease: "easeOut"
                        }}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        className="size-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 flex items-center justify-center mb-5 shadow-xl shadow-purple-500/20"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <MessageSquare className="size-8 text-white" />
                        </motion.div>
                    </motion.div>

                    <h1 className="text-2xl font-semibold text-white tracking-tight">Create Account</h1>
                    <p className="text-zinc-400 text-sm mt-1.5">Join us in a few simple steps</p>
                </div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-3xl p-8 shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400 tracking-wide">FULL NAME</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="size-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-indigo-500 rounded-2xl py-3.5 pl-11 text-white placeholder:text-zinc-500 focus:outline-none transition-all duration-200"
                                />
                            </div>
                        </div>

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

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.985 }}
                            type="submit"
                            disabled={isSigningUp}
                            className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 disabled:opacity-70 text-[15px] cursor-pointer"
                        >
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Sign In Link */}
                <div className="text-center mt-6">
                    <p className="text-zinc-500 text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SignUpPage;