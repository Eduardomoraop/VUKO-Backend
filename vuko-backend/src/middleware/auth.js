const { request } = require('express')
const jwt = require ('jsonwebtoken'); 

const validateJWT = (req, resp, next) =>{    
    const token = req.header('x-auth-token');
    
    if(!token){
        return resp.status(401).json({
            ok: false,
            msg: 'Acceso denegado, no se proporciono un token'
        });
    }
    
    try {        
        const {id, role} = jwt.verify(token, process.env.JWT_SECRET);
       
        req.uid = id;
        req.urole = role;

        next(); 

    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token no valido o expirado'
        });
    }
};

module.exports = {validateJWT};