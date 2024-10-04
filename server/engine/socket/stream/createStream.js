const Stream = require("../../../models/Stream.js");

module.exports = (socket, io) => {
  socket.on("createStream", async (data) => {
    try {
      const TITLE = data.title || "";
      const TYPE = data.type || "SOLO";
      const SIZE = data.size || 1;
      const HOST = socket.user_id;
      const CATEGORY = data.category || "#fun";

      const existingStream = await Stream.findOne({
        streamer: HOST,
        endTime: null,
      });

      if (existingStream) {
        return socket.emit("error", "ALREADY_STREAMING");
      }

      const streamersMap = new Map();
      streamersMap.set(1, HOST);

      // Crear un nuevo stream
      const newStream = new Stream({
        type: TYPE,
        streamer: HOST,
        streamSize: SIZE,
        streamers: streamersMap,
        title: TITLE,
        category: CATEGORY,
      });

      await newStream.save();

      // Emitir evento de éxito y notificar al cliente el streamKey
      socket.emit("streamCreated", {
        message: "STREAM_CREATED",
        streamKey: newStream.streamKey,
      });
    } catch (error) {
      socket.emit("error", "ERROR: " + error);
    }
  });
};
