const { PUBLIC_DIR, SERVER_PORT } = require('../config');
const connectDB = require("./database/connection");
const express = require('express'); 
const http = require('http'); // Importa el módulo http para crear un servidor
const socketIO = require('socket.io'); // Importa Socket.io
const router = require("./routes/router");
const verifyToken = require("./routes/auth/verifyToken.js").verifySocketToken;

const app = express();
const server = http.createServer(app); // Crea un servidor HTTP con Express
const io = socketIO(server); // Inicia Socket.io con el servidor HTTP

connectDB();

app.use(router);

// Servir rutas del sitio web
app.use(express.static(PUBLIC_DIR));
app.get('*', (req, res) => {
  res.sendFile(PUBLIC_DIR + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  const authTimeout = setTimeout(() => {
      console.log(`Authentication timeout for socket ${socket.id}`);
      socket.emit('error', 'AUTHENTICATION_TIMEOUT'); 
      socket.disconnect(); 
  }, 3000); 

  socket.on('authenticate', (token) => {
      const isValid = verifyToken(token);
      
      if (!isValid) {
          socket.emit('error', 'INVALID_TOKEN');
          socket.disconnect();
      } else {
          clearTimeout(authTimeout);
          console.log('User authenticated:', socket.id);
          socket.emit('authenticated', 'User authenticated successfully');
      }
  });

  socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      clearTimeout(authTimeout); 
  });
});


// Iniciar servidor
server.listen(SERVER_PORT, () => {
    console.log('Server running ' + SERVER_PORT);
});
