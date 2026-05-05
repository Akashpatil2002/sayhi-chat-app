import { MessageSquare } from "lucide-react";

const MessageSkeleton = () => {
    const skeletonMessages = Array(6).fill(null);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-base-100/50">
            {skeletonMessages.map((_, idx) => (
                <div
                    key={idx}
                    className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                    <div className={`max-w-[75%] flex ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"} gap-3`}>

                        {/* Avatar Skeleton */}
                        {idx % 2 === 0 && (
                            <div className="flex-shrink-0">
                                <div className="skeleton w-9 h-9 rounded-2xl" />
                            </div>
                        )}

                        <div className="space-y-2">
                            {/* Name / Time Skeleton */}
                            <div className={`flex items-center gap-2 ${idx % 2 === 0 ? "" : "justify-end"}`}>
                                <div className="skeleton h-3 w-20 rounded" />
                                <div className="skeleton h-3 w-10 rounded" />
                            </div>

                            {/* Message Bubble Skeleton */}
                            <div className={`
                                skeleton 
                                h-16 sm:h-14 
                                w-[180px] sm:w-[220px] 
                                rounded-3xl
                                ${idx % 2 === 0 ? "rounded-bl-none" : "rounded-br-none"}
                            `} />

                            {/* Small time skeleton */}
                            <div className={`flex ${idx % 2 === 0 ? "" : "justify-end"}`}>
                                <div className="skeleton h-2.5 w-12 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Optional Center Text */}
            <div className="flex justify-center mt-10 opacity-40">
                <MessageSquare size={28} />
            </div>
        </div>
    );
};

export default MessageSkeleton;