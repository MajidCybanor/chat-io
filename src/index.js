const express = require("express");
const path = require("path");
const http = require("http");
const socket = require("socket.io");
const { emit } = require("process");

const publicDirectoryPath = path.join(__dirname, "../public");

const port = 3000;
const app = express();
const server = http.createServer(app); // this is done internally by express but here we need to do manually in order to get server object that we can pass to the socket and now we need to listen for server create instead of app crated from express
const io = socket(server);

app.use(express.static(publicDirectoryPath));

let val = 0;

io.on("connect", (socket) => {
    console.log("coneected");
    socket.emit("message", "welcome");

    socket.on("sendMessage", (value, callB) => {
        // testing callBack
        // if (true) {
        //     return callB("returned ");
        // }

        io.emit("sendMessage", value);
    });
});

// app.listen(port, () => {
server.listen(port, () => {
    console.log("the app is u p and running on ", port);
});
