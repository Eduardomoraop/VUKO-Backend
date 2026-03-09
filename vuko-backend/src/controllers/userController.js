const User = require('../models/User');
const { getCareerAdvice } = require('../services/aiService'); 
const bcrypt= require ('bcrypt');
const jwt = require ('jsonwebtoken');

// Función para registrar usuario
const registerUser = async (req, resp) => {
    try {
        const newUser = new User(req.body);

        // 1. LLAMADA A LA IA:
        const aiAdvice = await getCareerAdvice(newUser);

        // 2. GUARDADO:
        // Aquí se activa el middleware de Bcrypt que pusimos en el Modelo y se guarda en MongoDB.
        await newUser.save();

        // 3. RESPUESTA DINÁMICA:
        // Agregamos 'vukoAdvice' al JSON de respuesta para verlo en Postman.
        resp.status(201).json({ 
            ok: true, 
            user: newUser,
            vukoAdvice: aiAdvice 
        });

    } catch (error) {
        resp.status(400).json({ ok: false, msg: error.message });        
    }    
};

// Funcion para obtener todos los usuarios
const getUsers = async (req, resp) => {
    try {
        const users = await User.find();
        resp.status(200).json({ ok: true, users });
    } catch (error) {        
        resp.status(500).json({ ok: false, msg: 'Error al obtener usuarios' });        
    }
};

// Funcion para login de usuarios
const loginUser =async (req,resp) => {
    try {
        const {email, password} = req.body;

        //Verificamos si existe el usuario
        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(404).json({ ok: false, msg: "Usuario no encontrado" });
        }

        //Verificamos si la contraseña coincide con el hash de la DB
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            return resp.status(401).json({ok: false, msg: 'contraeña incorrecta'});
        }

        //Generamos el token (JWT) 
        const token= jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        );

        resp.status(200).json({
            ok:true,
            user: {
                name:user.name,
                email: user.email,
                role: user.role
            },
            token
        });
    
    } catch (error) {
        console.log("EL ERROR REAL ES:", error); 
        resp.status(500).json({ ok: false, msg: "Error en el proceso de login" });
    }
};

// Funcion para Actualizar usuario
// Funcion para Actualizar usuario
const updateUser = async (req, resp) => { // Usamos 'resp' para ser consistentes
    try {
        // IMPORTANTE: Verifica si en tu middleware usaste 'uid' o 'id'
        const uid = req.uid || req.id; 
        
        const { password, email, ...campos } = req.body;
        
        // Usamos findByIdAndUpdate con la opción moderna
        const userUpdated = await User.findByIdAndUpdate(uid, campos, { returnDocument: 'after' });

        if (!userUpdated){
            return resp.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
        }

        // Cambiamos 'res' por 'resp'
        resp.json({ ok: true, msg: 'Perfil actualizado con exito', user: userUpdated });
        
    } catch (error) {
        console.log("ERROR EN UPDATE:", error); // Esto te dirá el fallo exacto en la terminal
        resp.status(500).json({ ok: false, msg: 'Error al actualizar usuario' });
    }
}
//Funcion para borrar usuario 
const deleteUser = async (req, resp) => {
    try {
        const uid = req.uid;
        await User.findByIdAndDelete(uid);

        resp.json({ok: true, msg: 'Usuario eliminado correctamente de VUKO.ai'});

    } catch (error) {
        resp.status(500).json({ ok: false, msg: 'Error al eliminar usuario'});
    }    
}

//Funcion para para consejo de baja demanda
const getVukoAdvice = async (req, resp) =>{
    try {
        const uid = req.uid; //Extraemos el ID que dejo ek middleware en la peticion

        const user = await User.findById(uid); //Buscamos el usuario para tener la info actualizada
        if (!user){
            return resp.status(404).json({ok: false, msg: 'Usuario no encontrado'});
        }

       //Llamada al servicio de la IA (Reutilizacion de la logica)
       
        const aiAdvice = await getCareerAdvice(user); //Pasamos el objeto 'user' completo como se hace en el registro

        resp.status(200).json({
            ok: true,
            msg: 'Consejo generado con exito',
            vukoAdvice: aiAdvice
        });

    } catch (error) {
        console.log("Error en getVukoAdvice:", error);
        resp.status(500).json({
            ok: false,
            msg: 'No se pudo generar el consejo'
        });                
    }
}

module.exports = {
    registerUser,
    getUsers,
    loginUser,
    getVukoAdvice,
    updateUser,
    deleteUser
};