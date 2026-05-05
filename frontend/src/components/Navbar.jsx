import { MessageSquare, Settings, User, LogOut, Menu, X, Sun, Moon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState('dark');

    // Initialize Theme on first load
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let initialTheme = 'dark';

        if (savedTheme === 'dark' || savedTheme === 'light') {
            initialTheme = savedTheme;
        } else if (prefersDark) {
            initialTheme = 'dark';
        }

        setTheme(initialTheme);
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }, []);

    // Toggle Theme - FIXED VERSION
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';

        // Update state
        setTheme(newTheme);

        // Save to localStorage
        localStorage.setItem('theme', newTheme);

        // Immediately apply class to <html> tag
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <header className="bg-zinc-950/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 dark:border-zinc-800 fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16">
                <div className="flex items-center justify-between h-full">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30"
                        >
                            <MessageSquare className="w-5 h-5 text-white" />
                        </motion.div>
                        <h1 className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                            SayHi
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-3">
                        {authUser ? (
                            <>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-2xl transition-all">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-2xl transition-all">
                                        <User className="w-4 h-4" />
                                        Profile
                                    </Link>
                                </motion.div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={logout}
                                    className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-zinc-900 rounded-2xl transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="px-5 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                                    Sign in
                                </Link>
                                <Link to="/signup" className="px-6 py-2 text-sm font-semibold bg-white text-zinc-900 rounded-2xl hover:bg-zinc-100 transition-all">
                                    Get Started
                                </Link>
                            </>
                        )}

                        {/* Theme Toggle Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={toggleTheme}
                            className="p-3 rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-900 
                                       text-zinc-400 hover:text-amber-300 transition-all"
                            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </motion.button>
                    </div>

                    {/* Mobile Theme Toggle */}
                    <div className="md:hidden flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={toggleTheme}
                            className="p-3 rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-900 text-zinc-400 hover:text-amber-300"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </motion.button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-zinc-400 hover:text-white"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-xl"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {authUser ? (
                                <>
                                    <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-zinc-300 hover:bg-zinc-900 rounded-2xl">
                                        <Settings className="w-5 h-5" /> Settings
                                    </Link>
                                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-zinc-300 hover:bg-zinc-900 rounded-2xl">
                                        <User className="w-5 h-5" /> Profile
                                    </Link>
                                    <button
                                        onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-zinc-900 rounded-2xl text-left w-full"
                                    >
                                        <LogOut className="w-5 h-5" /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-center text-zinc-300 hover:bg-zinc-900 rounded-2xl">
                                        Sign in
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-center bg-white text-zinc-900 font-semibold rounded-2xl hover:bg-zinc-100">
                                        Create Account
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;