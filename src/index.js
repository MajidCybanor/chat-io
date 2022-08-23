require("dotenv").config();
const path = require("path");
const express = require("express");
const http = require("http");
const socket = require("socket.io");

const { users, addUser, removeUser, getUserRoom } = require("./utils");

const publicDirectory = path.join(__dirname, "../public");
const port = process.env.port || 3000;

const app = express();
app.use(express.static(publicDirectory));
const server = http.createServer(app);
const socketio = socket(server, {
    cors: "*",
});

socketio.on("connect", (socket) => {
    console.log("we have new connect with id ", socket.id);

    socket.on("addUser", (name, room) => {
        console.log("hit on add add user");
        try {
            addUser(socket.id, name, room);
            socket.join(room);
            socket.broadcast
                .to(room)
                .emit("welcome", `${name} has joined the room`);
            socket.emit("sendMessage", `Welcomes ${name}`);
            console.log("add user success");
        } catch (e) {
            console.log(e);
            socket.emit("sendMessage", e);
        }
    });

    socket.on("sendMessage", (msg) => {
        let room = getUserRoom(socket.id);
        console.log(room);
        socket.to(room).emit("sendMessage", msg);
    });

    socket.on("disconnect", () => {
        let room = getUserRoom(socket.id);
        removeUser(socket.id);
        socket.to(room).emit("sendMessage", room);
    });
});

server.listen(port, () => {
    console.log("the server is up on port ", port);
});
