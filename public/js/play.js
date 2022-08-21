const socket = io();

socket.on("sendMessage", (msg) => {
    console.log("Server : ", msg);
});

socket.on("left", (msg) => console.log(msg));

socket.on("sendLocation", (location) => console.log(location));

document.querySelector("#frm").addEventListener("submit", (e) => {
    e.preventDefault();
    let message = e.target.elements.message.value;
    console.log("the value of msg is : ", message);
    socket.emit("sendMessage", message, () => {
        alert("message send");
    });
});

document.querySelector("#locShare").addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Geolocation service is not supported by the browser");
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("sendLocation", {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        });
    });
});
