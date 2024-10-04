const RTMP_PORT = 1935;
const NodeMediaServer = require("node-media-server");
const Stream = require("../../models/Stream.js");
const config = require("./config.js");
const io = require('../../server.js');

const nms = new NodeMediaServer(config);

// Evento que se dispara antes de publicar un stream
nms.on("prePublish", async (id, StreamPath, args) => {
  const session = nms.getSession(id);
  const streamKey = StreamPath.split("/").pop(); // Obtiene el streamKey de la URL RTMP

  // Verifica si ya existe un stream activo con el mismo streamKey
  const activeSessions = nms.sessions;
  let streamInUse = false;

  activeSessions.forEach((s) => {
    if (s.isPublishing && s.publishStreamPath.includes(streamKey)) {
      streamInUse = true;
    }
  });

  if (streamInUse) {
    session.reject(); 
  }

  // Busca el stream en la base de datos usando el streamKey
  const stream = await Stream.findOne({ streamKey });
  if (!stream && streamKey != "testsk666") {
    console.log("Invalid streamKey, rejecting connection...");
    session.reject();
    return;
  }
});


nms.on('postPublish', async (id, StreamPath, args) => {
  const session = nms.getSession(id);
  const streamKey = StreamPath.split('/').pop(); // Obtén el streamKey de la URL RTMP

  console.log(`Stream ${streamKey} publicado correctamente.`);
  const stream = await Stream.findOne({streamKey});
  // Actualiza la base de datos para marcar que el stream está activo
  if(!stream) return session.reject();
  stream.status = "active";
  stream.startTime = new Date.now();
  await stream.save();
  const usocket =  io.users[stream.host];
  if(!usocket) return session.reject();

  usocket.emit("streamStarted" , "STREAM_STARTED");
  usocket.join(stream.streamId);
  io.to(stream.streamId).emit("message" , "Bienvenido al stream...");
});


module.exports = () => {
  nms.run();
};
