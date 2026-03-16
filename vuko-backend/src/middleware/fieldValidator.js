const {validationResult} = require('express-validator');

const fieldValidator = (req, resp, next) =>{
   
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return resp.status(400).json({
            ok: false,
            errors: errors.mapped
        });
    }
    
    next();
};

module.exports ={
    fieldValidator
};