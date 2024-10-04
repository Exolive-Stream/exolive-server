const mongoose = require('mongoose');
const crypto = require('crypto');

// Genera un stream_key único
function generateStreamKey() {
    return crypto.randomBytes(16).toString('hex');
}

const streamSchema = new mongoose.Schema({
    type: {type: String , default: 'SOLO'}, // Tipos de stream (SOLO, SOLO_AUDIO, VS, MULTI, etc.)
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario que está streameando
    startTime: { type: Date, default: Date.now }, // Hora de inicio del stream
    endTime: { type: Date }, // Hora de fin del stream
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Usuarios viendo el stream
    streamers: { 
        type: Map, 
        of: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
      }, 
      streamSize: { type: Number, default: 1 },
    title: { type: String, required: true }, // Título del stream
    chat: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Autor del mensaje
            message: { type: String, required: true }, // Contenido del mensaje
            timestamp: { type: Date, default: Date.now } // Marca de tiempo del mensaje
        }
    ], // Historial de chat durante el stream
    category: { type: String }, // Categoría del stream
    earnings: { type: Number, default: 0 }, // Ganancias durante el stream
    streamKey: { type: String, default: generateStreamKey}, // Clave del stream para RTMP
    streamId: { type: String, default: () => crypto.randomBytes(8).toString('hex') }, // stream_id único
    status: { 
        type: String, 
        enum: ['active', 'ended', 'waiting'], 
        default: 'waiting' // Estado del stream
    }, // Estado del stream RTMP (activo, terminado, en espera)
    resolution: { type: String, default: '720p' }, // Resolución del stream (puede ser '720p', '1080p', etc.)
    bitrate: { type: Number, default: 2500 } // Tasa de bits del stream
});

module.exports = mongoose.model('Stream', streamSchema);
