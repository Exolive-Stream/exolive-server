const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    streamer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario que está streameando
    startTime: { type: Date, default: Date.now }, // Hora de inicio del stream
    endTime: { type: Date }, // Hora de fin del stream
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Usuarios viendo el stream
    title: { type: String, required: true }, // Título del stream
    category: { type: String }, // Categoría del stream
    earnings: { type: Number, default: 0 }, // Ganancias durante el stream
});

module.exports = mongoose.model('Stream', streamSchema);
