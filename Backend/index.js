import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 8005;

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

// Connection pehle se diya default string hai fixed meaning . 
//Server side
io.on("connection", (socket) => {
    // console.log("What is socket : ", socket);
    console.log("Socket is active");

    // Here chat can be chacha or anything and data can be renamed as payload khana etc 
    //Listen to event
    //Client side
    socket.on("chat" , (data) => { 
        console.log("Data : ", data);
        io.emit("chat", data); // Respond to event
    })
})


httpServer.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
});
