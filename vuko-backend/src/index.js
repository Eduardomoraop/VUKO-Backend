// 1. Importación de librerías
const express = require('express');
const cors = require('cors'); 
require('dotenv').config();
const connectDB = require('./utils/database.js');
const userRoutes = require('./routes/userRoutes.js');

// 2. Inicio de la app
const app = express(); 
connectDB();          


// 3. Ejecutamos los middlewares (Configuraciones globales)
app.use(cors({
    origin: '*', 
    allowedHeaders: ['Content-Type', 'x-auth-token'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// 4. Rutas
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Bienvenido a la API de VUKO.ai',
        author: 'Eduardo Morao'
    });
});

// 5. Arranque del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor de VUKO.ai en marcha: http://localhost:${PORT}`);
});