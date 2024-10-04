const createStream = require("./stream/createStream.js");

module.exports = (socket, io) => {
    createStream(socket , io);
};
