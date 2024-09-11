module.exports = (socket) => {
    // Escuchar la solicitud de unirse a una sala
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} se unió a la sala: ${roomId}`);

    // Notificar a otros usuarios en la sala que un nuevo usuario se ha unido
    socket.to(roomId).emit("user-joined", socket.id);
  });

  // Manejar señales de WebRTC
  socket.on("signal", (data) => {
    // Transmitir la señal a todos los usuarios en la sala excepto al que envió la señal
    socket.to(data.roomId).emit("signal", {
      signalData: data.signalData,
      sender: socket.id,
    });
  });
}