const { request } = require('express')
const jwt = require ('jsonwebtoken'); //Importamos la libreria

const validateJWT = (req, resp, next) =>{
    // Buscamos el token en los headers de la peticion
    const token = req.header('x-auth-token');

    // Si no hay token no lo dejamos pasar
    if(!token){
        return resp.status(401).json({
            ok: false,
            msg: 'Acceso denegado, no se proporciono un token'
        });
    }
    
    try {
        // Verificamos que el token se valido con nuestra clave secreta
        const {id, role} = jwt.verify(token, process.env.JWT_SECRET);

        // Guardamos los datos del usuario en la peticion request (req) para que las funciones siguientes sepan quien es
        req.uid = id;
        req.urole = role;

        next(); // ¡Todo bien!, que siga la ejecucion

    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token no valido o expirado'
        });
    }
};

module.exports = {validateJWT};