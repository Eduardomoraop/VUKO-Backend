const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

// 1. IMPORTACIÓN DE CONTROLADORES
// LoginUser
const { registerUser, getUsers, loginUser, getVukoAdvice, updateUser, deleteUser } = require('../controllers/userController');  
    
   

// 1.1 Importacion  del middleware
const {validateJWT} = require('../middleware/auth.js');
const{fieldValidator} = require('../middleware/fieldValidator.js')

// 2. DEFINICIÓN DE RUTAS

// GET: Obtener la lista de todos los usuarios (útil para pruebas)
router.get('/', validateJWT, getUsers);

// GET: Obtener consejo de la IA personalizado
router.get('/advice', validateJWT, getVukoAdvice);

// POST: Validacion de usuario 
router.post('/register',
    [
        //Validamos que los datos lleguen bien antes de tocar la BD o la IA 
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Debes insertar un  correo electronico valido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min:6}),
        check('career', 'Profesion requerida').not().isEmpty(),
        fieldValidator
    ],
    registerUser
);

// POST: Login de usuario
// Esta es la ruta que recibirá el email/password y devolverá el JWT
router.post('/login',
    [
        check('email','Debes insertar un correo electronico valido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min:6}),
        fieldValidator
    ],
    loginUser
);

// PUT: Actualizar perfil del usuario logueado
router.put('/update', 
    [
         validateJWT,
         check('name', 'El nombre es obligatorio').not().isEmpty(),
         check('career', 'Profesion requerida').not().isEmpty(),
         fieldValidator
    ],    
    updateUser
);

// DELETE: Borrar cuenta del usuario logeado
router.delete('/delete', validateJWT, deleteUser);

// 3. EXPORTACIÓN
module.exports = router;