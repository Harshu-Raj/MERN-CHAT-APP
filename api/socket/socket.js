const { Server } = require("socket.io");

const onlineUsers = [];

// Function to add or update a user
const addUser = (user, socketId) => {
    console.log("Adding user:", user, "with socket ID:", socketId);
    const existingUserIndex = onlineUsers.findIndex((item) => item._id === user._id);

    if (existingUserIndex !== -1) {
        onlineUsers[existingUserIndex].socketId = socketId;
    } else {
        user.socketId = socketId;
        onlineUsers.push(user);
    }

    console.log("Updated Online Users:", onlineUsers);
};

// Function to remove user when they disconnect
const removeUser = (socketId) => {
    const userIndex = onlineUsers.findIndex((item) => item.socketId === socketId);
    if (userIndex !== -1) {
        onlineUsers.splice(userIndex, 1);
    }
};

// Initialize socket.io
const socketInit = (server) => {
    const io = new Server(server, {
        cors: { origin: "http://localhost:5173" },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("ADD_USER", (user) => {
            addUser(user, socket.id);
            io.emit("USER_ADDED", onlineUsers);
            console.log("Online Users:", onlineUsers);
        });

        socket.on("SEND_MSG", (msg) => {
            console.log("Received message from client:", msg);

            if (!msg.receiverId) {
                console.error("Error: Received message is missing receiverId!", msg);
                return;
            }

            const receiver = onlineUsers.find(user => user._id === msg.receiverId);
            console.log("Receiver found on server:", receiver);

            if (!receiver || !receiver.socketId) {
                console.error("Error: Receiver not found or socket ID missing!", msg.receiverId);
                return;
            }

            console.log(`Sending message to: ${receiver.socketId}`);
            io.to(receiver.socketId).emit("RECEIVED_MESSAGE", msg);
        });

        socket.on("disconnect", () => {
            console.log("User Disconnected:", socket.id);
            removeUser(socket.id);
            io.emit("USER_ADDED", onlineUsers);
        });
    });
};

module.exports = socketInit;
