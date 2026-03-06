
// Importacion de librerias 

const express = require ('express');
const cors = require ('cors');
require ('dotenv').config();
const connectDB = require ('./utils/database.js');
const userRoutes = require ('./routes/userRoutes.js');


// Inicio de la app

const app = express()
connectDB();

// Ejecutamos los middlewares
app.use(cors()); 
app.use(express.json());

// Ruta de prueba 

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Bienvenido a la API de VUKO.ai',
        author: 'Eduardo Morao'
    });
});

// Configuramos el puerto y el arranque 

const PORT = process.env.PORT || 4000;

app.listen (PORT, () => {
    console.log(`🚀 Servidor de VUKO.ai en marcha: http://localhost:${PORT}`);
    
});


