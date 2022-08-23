require("dotenv").config();
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const path = require("path");
const cors = require("cors");
const { ALL } = require("dns");

const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "../public");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socket(server, {
    cors: { origin: "*" },
});

app.use(express.static(publicDirectory));

io.on("connect", (socket) => {
    // on Connection
    console.log("new client has connected to the server");
    socket.emit("sendMessage", "welcome New User", () => {
        console.log("the welome message is delivered");
    });
    ///////////////////////////////////////
    //
    //
    ///////////////////////////////////////

    socket.on("disconnect", () => {
        socket.broadcast.emit("left", "User has left...");
    });

    socket.on("sendMessage", (message, callBack) => {
        socket.broadcast.emit("sendMessage", message);
        callBack();
    });

    ///////////////////////////////////////
    //
    //
    ///////////////////////////////////////

    socket.on("sendLocation", (locData) => {
        socket.broadcast.emit(
            "sendLocation",
            `http://google.com/maps?q=${locData.lat},${locData.lon}`
        );
        console.log(locData);
    });
});

// app.listen(PORT, () => {
server.listen(PORT, () => {
    console.log("Server is up and waiting for requests on port : ", PORT);
});
