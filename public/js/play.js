const socketio = io();

console.log("from the play scritp");

const joinForm = document.getElementById("form-username");
const chatForm = document.getElementById("form-message");

joinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let room = e.target.elements.room.value;
    let username = e.target.elements.username.value;
    socketio.emit("addUser", username, room);
});

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let message = e.target.elements.message.value;
    socketio.emit("sendMessage", message);
});

socketio.on("sendMessage", (val) => console.log(val));

socketio.on("welcome", (val) => console.log(val));

socketio.on("disconnect", (val) => console.log(" >>> ", val));
