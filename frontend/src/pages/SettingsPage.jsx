import { useThemeStore } from "../store/useThemeStore";
import { Palette } from "lucide-react";

const SettingsPage = () => {
    const { theme, themes, setTheme } = useThemeStore();

    const themeColors = {
        light: "bg-white text-black",
        dark: "bg-gray-900 text-white",
        cupcake: "bg-pink-200 text-pink-900",
        bumblebee: "bg-yellow-300 text-yellow-900",
        emerald: "bg-emerald-500 text-white",
        corporate: "bg-blue-600 text-white",
        synthwave: "bg-purple-900 text-purple-200",
        retro: "bg-orange-300 text-orange-900",
        cyberpunk: "bg-yellow-300 text-black",
        valentine: "bg-pink-600 text-white",
        halloween: "bg-orange-900 text-orange-100",
        garden: "bg-green-400 text-green-900",
        forest: "bg-green-900 text-green-100",
        aqua: "bg-cyan-400 text-cyan-900",
        lofi: "bg-gray-200 text-gray-800",
        pastel: "bg-pink-300 text-pink-800",
        fantasy: "bg-blue-400 text-blue-900",
        wireframe: "bg-gray-400 text-gray-900",
        black: "bg-black text-white",
        luxury: "bg-amber-900 text-amber-100",
        dracula: "bg-purple-950 text-purple-200",
        cmyk: "bg-cyan-500 text-white",
        autumn: "bg-orange-600 text-orange-100",
        business: "bg-blue-900 text-blue-100",
        acid: "bg-green-500 text-white",
        lemonade: "bg-yellow-400 text-yellow-900",
        night: "bg-blue-950 text-blue-100",
        coffee: "bg-amber-800 text-amber-100",
        winter: "bg-blue-200 text-blue-900",
        dim: "bg-gray-700 text-gray-200",
        nord: "bg-slate-600 text-slate-100",
        sunset: "bg-orange-500 text-orange-100",
    };

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <div className="flex items-center gap-2 mb-6 mt-10">
                            <Palette className="size-6" />
                            <h1 className="card-title text-2xl">Settings</h1>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-4">Choose Your Theme</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {themes.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`p-3 rounded-lg font-medium transition-all ${
                                            themeColors[t]
                                        } ${
                                            theme === t
                                                ? "ring-2 ring-primary ring-offset-2 scale-105"
                                                : "hover:scale-102"
                                        }`}
                                    >
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="divider my-6"></div>

                        <div className="text-sm text-base-content/70">
                            <p>
                                <strong>Current Theme:</strong> {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </p>
                            <p className="mt-2">
                                Your theme preference is automatically saved and will be applied when you return.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;