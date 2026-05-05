// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:5173"]
//     },
// });

// export function getReceiverSocketId(userId) {
//     return userSocketMap[userId];
// }

// const userSocketMap = {};

// io.on("connection", (socket) => {
//     console.log("A user connected", socket.id);

//     const userId = socket.handshake.query.userId;
//     if(userId) userSocketMap[userId] = socket.id

//     io.emit("getOnlineUsers",Object.keys(userSocketMap));

//     socket.on("disconnect", () => {
//         console.log("A user disconnected", socket.id);
//         delete userSocketMap[userId];
//         io.emit("getOnlinneUsers", Object.keys(userSocketMap));
//     });
// });

// export { io, app, server };


import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// ✅ REQUIRED FOR RENDER (cookies + proxy)
app.set("trust proxy", 1);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://sayhi-chat-app.vercel.app" // ✅ ADD THIS (production frontend)
        ],
        credentials: true, // ✅ REQUIRED for cookies
    },
    transports: ["websocket"], // ✅ IMPORTANT (Render + Vercel stability)
});

// 🔥 store userId -> socketId
const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// ✅ OPTIONAL BUT IMPORTANT (auth safety)
io.use((socket, next) => {
    const userId = socket.handshake.query.userId;

    if (!userId) {
        return next(new Error("Unauthorized"));
    }

    socket.userId = userId;
    next();
});

io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // 🔥 send online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // =====================================================
    // 🔥 MESSAGE SEND (REAL TIME)
    // =====================================================
    socket.on("sendMessage", (message) => {
        const receiverSocketId = userSocketMap[message.receiverId];

        if (receiverSocketId) {
            // receiver ko message bhejo
            io.to(receiverSocketId).emit("receiveMessage", {
                ...message,
                delivered: true,
            });

            // sender ko confirm karo (double tick)
            socket.emit("messageDelivered", message._id);
        }
    });

    // =====================================================
    // 🔥 SEEN LOGIC
    // =====================================================
    socket.on("markAsSeen", ({ senderId }) => {
        const senderSocketId = userSocketMap[senderId];

        if (senderSocketId) {
            io.to(senderSocketId).emit("messagesSeen", {
                senderId,
            });
        }
    });

    // =====================================================
    // 🔥 DISCONNECT
    // =====================================================
    socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);

        if (userId) {
            delete userSocketMap[userId];
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };
