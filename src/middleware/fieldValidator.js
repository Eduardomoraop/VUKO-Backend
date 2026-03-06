const {validationResult} = require('express-validator');

const fieldValidator = (req, resp, next) =>{
    //Revisar si hay errores de validacion
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return resp.status(400).json({
            ok: false,
            errors: errors.mapped
        });
    }


    //Si no hay errores, pasar al siguiente nivel (del controlador)
    next();

};

module.exports ={
    fieldValidator
};