// db-mongo.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/datos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('*** MongoDB - Está conectado a la Base de Datos ***');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

