module.exports = (socket ,io) => {
  require("./socket/stream.js")(socket , io);
  require("./socket/signal.js")(socket);
};
