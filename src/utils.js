const users = [];

const addUser = (id, name, room) => {
    const exists = users.find(
        (user) => user.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) throw "USER EXISTS";
    users.push({
        id,
        name: name.toLocaleLowerCase(),
        room: room.toLocaleLowerCase(),
    });
};

const removeUser = (id) => {
    const index = users.find((user) => user.id === id);
    if (index < 0) throw "USER NOT FOUND";
    return users.splice(index, 1);
};

const getUserRoom = (id) => {
    let x = users.find((user) => user.id === id);
    if (x) return x.room;
};

module.exports = {
    users,
    getUserRoom,
    addUser,
    removeUser,
};
