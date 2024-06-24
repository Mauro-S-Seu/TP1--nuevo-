// modelo-usuario.js
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = Usuario = mongoose.model('usuarios', UsuarioSchema);
