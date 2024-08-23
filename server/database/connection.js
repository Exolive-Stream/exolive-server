const mongoose = require('mongoose');
require('dotenv').config(); // Para cargar las variables de entorno desde un archivo .env

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Salir del proceso con fallo
    }
};

module.exports = connectDB;
