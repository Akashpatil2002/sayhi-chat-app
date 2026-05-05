import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();

    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = showOnlineOnly
        ? users.filter(user => onlineUsers.includes(user._id))
        : users;

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    fixed top-[90px] z-50 
                    bg-gradient-to-br from-base-200 to-base-300 
                    backdrop-blur-xl border border-white/10
                    p-3 rounded-2xl shadow-2xl shadow-black/30
                    hover:scale-110 active:scale-95
                    transition-all duration-300
                    ${isOpen ? "left-64" : "left-3"}
                    lg:hidden
                `}
            >
                {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-md z-30 lg:hidden"
                />
            )}

            {/* Stylish Sidebar */}
            <aside
                className={`
                    fixed lg:static z-40 
                    top-16 lg:top-0 h-[calc(100%-4rem)]
                    left-0 w-72
                    bg-gradient-to-b from-base-100/95 to-base-200/95 
                    backdrop-blur-2xl 
                    border-r border-white/10
                    shadow-2xl shadow-black/40
                    transform transition-all duration-500 ease-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                    flex flex-col overflow-hidden
                `}
            >
                {/* Header */}
                <div className="border-b border-white/10 p-6 backdrop-blur-md bg-base-100/50">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                            <Users className="size-5 text-white" />
                        </div>
                        <span className="font-semibold text-xl tracking-tight text-white">
                            Contacts
                        </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                        <label className="cursor-pointer flex items-center gap-2.5 group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={showOnlineOnly}
                                    onChange={(e) => setShowOnlineOnly(e.target.checked)}
                                    className="peer sr-only"
                                />
                                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full 
                                              peer peer-checked:bg-indigo-600 transition-all duration-300"></div>
                                <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full 
                                              peer-checked:translate-x-5 transition-all duration-300"></div>
                            </div>
                            <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                                Online only
                            </span>
                        </label>

                        <span className="text-xs px-3 py-1.5 bg-white/5 rounded-full text-zinc-400 border border-white/10">
                            {onlineUsers.length - 1} online
                        </span>
                    </div>
                </div>

                {/* Users List */}
                <div className="overflow-y-auto flex-1 py-3 px-3 space-y-1 custom-scrollbar">
                    {filteredUsers.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => {
                                setSelectedUser(user);
                                setIsOpen(false);
                            }}
                            className={`
                                w-full p-3 flex items-center gap-4 
                                rounded-2xl mx-auto
                                hover:bg-white/10 active:bg-white/5
                                transition-all duration-200 group
                                ${selectedUser?._id === user._id
                                    ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 ring-1 ring-indigo-500/30 shadow-inner"
                                    : "hover:shadow-md"
                                }
                            `}
                        >
                            {/* Avatar */}
                            <div className="relative flex-shrink-0">
                                <img
                                    src={
                                        user.profilePic
                                            ? user.profilePic.startsWith("http")
                                                ? user.profilePic.replace("=s96-c", "=s400-c")
                                                : `http://localhost:5001${user.profilePic}`
                                            : "/avatar.png"
                                    }
                                    alt={user.fullName}
                                    onError={(e) => {
                                        console.log("Image failed:", user.profilePic);
                                        e.target.src = "/avatar.png";
                                    }}
                                    className="size-14 object-cover rounded-2xl border border-white/10 shadow-lg 
               group-hover:scale-105 transition-transform duration-300"
                                />

                                {onlineUsers.includes(user._id) && (
                                    <span className="absolute bottom-1 right-1 size-4 bg-green-500 rounded-full 
                   ring-2 ring-base-100 shadow-lg shadow-green-500/50" />
                                )}
                            </div>

                            {/* User Info */}
                            <div className="text-left min-w-0 flex-1">
                                <div className="font-medium text-white text-[17px] truncate group-hover:text-indigo-200 transition-colors">
                                    {user.fullName}
                                </div>
                                <div className={`text-sm mt-0.5 flex items-center gap-1.5 ${onlineUsers.includes(user._id) ? "text-green-400" : "text-zinc-500"}`}>
                                    {onlineUsers.includes(user._id) ? (
                                        <>
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            Online
                                        </>
                                    ) : "Offline"}
                                </div>
                            </div>
                        </button>
                    ))}

                    {filteredUsers.length === 0 && (
                        <div className="text-center text-zinc-400 py-12">
                            <div className="text-4xl mb-3">🤔</div>
                            <p className="text-sm">No users found</p>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;