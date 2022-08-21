const socket = io();

document.getElementById("frm").addEventListener("submit", (e) => {
    e.preventDefault();
    let msg = e.target[0].value;
    socket.emit("sendMessage", msg, (val) => {
        console.log("this is error", val);
    });
});

socket.on("message", (msg) => {
    console.log("msg", msg);
});

socket.on("sendMessage", (msg) => {
    console.log(msg);
});
