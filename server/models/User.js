const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Función para generar un UID de 12 dígitos numéricos
function generateUID() {
    return Math.floor(Math.random() * 1e12).toString().padStart(12, '0');
}


const userSchema = new mongoose.Schema({
    uid: { 
        type: String, 
        required: true, 
        unique: true, 
        default: generateUID // Genera automáticamente un UID único de 12 dígitos numéricos
    },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    level: { type: Number, default: 1 }, // Nivel de usuario
    currentExperience: { type: Number, default: 0 }, // Experiencia actual del usuario
    dailyCheckIn: [{
        date: { type: Date, default: Date.now }, // Fecha del check-in diario
        reward: { type: Number, default: 0 } // Recompensa obtenida en el check-in
    }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    subscription: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Referencia al usuario que sigue
            startTime: { type: Date, default: Date.now }, // Fecha de inicio de la suscripción
            level: { type: String, enum: ['basic', 'pro', 'unlimited'], required: true } // Nivel de la suscripción
        }
    ],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    coins: { type: Number, default: 0 }, // Moneda interna para enviar como regalos
    diamonds: { type: Number, default: 0 }, // Ganancias en diamantes
    inventory: {
        welcomeEntrance: { type: String, default: 'default' }, // Equipamiento de llegada al stream
        streamFrame: { type: String, default: 'default' }, // Marco de stream
        chatBubbleFrame: { type: String, default: 'default' }, // Marco de burbuja de chat
        gifts: [{type: String}], // Regalos en inventario
        iWelcomeEntrance: [{ type: String }], // Inventario de entradas al stream
        iStreamFrame: [{ type: String }], // Inventario de marcos de stream
        iChatBubbleFrame: [{ type: String }] // Inventario de marcos de burbuja de chat
    },
    totalEarnings: { type: Number, default: 0 },
    totalSpends: { type: Number, default: 0 },
    lastOnline: { type: Date , default: Date.now},
    accLevel: {type: Number , default: 1}, // 0- banned , 1-regular , 2-moderator , 3-admin
    createdAt: { type: Date, default: Date.now }
});

// Método para hash de contraseña
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
