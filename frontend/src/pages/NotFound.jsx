import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">

                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 flex justify-center"
                >
                    <div className="relative">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>

                        {/* Small 404 badge */}
                        <div className="absolute -top-2 -right-2 bg-zinc-800 text-xs text-zinc-300 px-2 py-0.5 rounded-md border border-zinc-700">
                            404
                        </div>
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-3xl font-semibold text-white mb-2">
                        Page not found
                    </h1>

                    <p className="text-zinc-400 text-sm leading-relaxed">
                        The page you’re looking for doesn’t exist or has been moved.
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 bg-white text-zinc-900 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-zinc-100 transition"
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center cursor-pointer justify-center gap-2 border border-zinc-700 text-zinc-300 text-sm px-5 py-2.5 rounded-xl hover:bg-zinc-900 hover:text-white transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go back
                    </button>
                </motion.div>

                {/* Footer */}
                <p className="text-zinc-500 text-xs mt-10">
                    Need help? Contact support.
                </p>

            </div>
        </div>
    );
};

export default NotFound;