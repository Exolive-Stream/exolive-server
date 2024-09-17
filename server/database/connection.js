
const mongoose = require('mongoose'); 
const { MONGO_URI, DEV } = require('../../config');

const connectDB = async () => {
    try {
      DEV && console.log('MONGO_URI', MONGO_URI);
        const conn = await mongoose.connect(MONGO_URI, { });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Salir del proceso con fallo
    }
};

module.exports = connectDB;
