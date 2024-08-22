const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String, required: true }, // Contenido del post
    media: [{ type: String }], // URLs de imágenes o videos adjuntos
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Autor del post
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Usuarios que han dado like
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Comentarios en el post
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
