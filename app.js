// app.js
const express = require('express');
const connectDB = require('./db-mongo');
const Usuario = require('./modelo-usuario'); // Importar el modelo de usuario

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Definir rutas
app.get('/', (req, res) => res.send('API ---------- Corriendo en el puerto 5000'));

// Ruta para obtener todos los usuarios (Read All)
app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('*** Error en el Servidor ***');
    }
});

// Ruta para obtener un usuario por ID (Read One)
app.get('/api/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ msg: '¡¡¡Usuario NO encontrado!!!' });
        }
        res.json(usuario);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('*** Error en el Servidor ***');
    }
});

// Ruta para crear un nuevo usuario (Create)
app.post('/api/usuarios', async (req, res) => {
    const { ID, Name, Address, Email, Password } = req.body;
    try {
        let usuario = new Usuario({
            ID,
            Name,
            Address,
            Email,
            Password
        });
        await usuario.save();
        res.json(usuario);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('*** Error en el Servidor ***');
    }
});

// Ruta para actualizar un usuario por ID (Update)
app.put('/api/usuarios/:id', async (req, res) => {
    const { Name, Address, Email, Password } = req.body;
    const updatedUsuario = {
        Name,
        Address,
        Email,
        Password
    };
    try {
        let usuario = await Usuario.findByIdAndUpdate(req.params.id, updatedUsuario, { new: true });
        if (!usuario) {
            return res.status(404).json({ msg: '¡¡¡Usuario NO encontrado!!!' });
        }
        res.json(usuario);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('*** Error en el Servidor ***');
    }
});

// Ruta para eliminar un usuario por ID (Delete)
app.delete('/api/usuarios/:id', async (req, res) => {
    try {
        let usuario = await Usuario.findOneAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ msg: '¡¡¡Usuario NO encontrado!!!' });
        }
        res.json({ msg: '¡¡¡El usuario ha sido ELIMINADO exitosamente!!!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('*** Error en el Servidor ***');
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`*** El Servidor se encuentra en el puerto ${PORT} ***`));

