const User = require('../models/User');
const { getCareerAdvice } = require('../services/aiService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, resp) => {
    try {
        console.log("Cuerpo recibido:", req.body);

        const { name, email, password, career, experience, skills } = req.body;
        const newUser = new User({ name, email, password, career, experience, skills });

        await newUser.save();

        let aiAdvice = "Generando consejo...";
        try {
            aiAdvice = await getCareerAdvice(newUser);
        } catch (iaError) {
            console.log("Error en IA:", iaError.message);
        }

        const userObject = newUser.toObject();
        delete userObject.password;

        resp.status(201).json({
            ok: true,
            user: userObject,
            vukoAdvice: aiAdvice
        });

    } catch (error) {
        console.error("ERROR EN REGISTRO:", error);

        resp.status(400).json({
            ok: false,
            message: error.message || "Error desconocido en el servidor"
        });
    }
};

const getUsers = async (req, resp) => {
    try {
        const users = await User.find();
        resp.status(200).json({ ok: true, users });
    } catch (error) {
        resp.status(500).json({ ok: false, message: 'Error al obtener usuarios' });
    }
};

const loginUser = async (req, resp) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(404).json({ ok: false, message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return resp.status(401).json({ ok: false, message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        resp.status(200).json({
            ok: true,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.log("EL ERROR REAL ES:", error);
        resp.status(500).json({ ok: false, message: "Error en el proceso de login" });
    }
};

const updateUser = async (req, resp) => {
    try {
        const uid = req.uid;

        const { name, career, experience, skills } = req.body;

        const userUpdated = await User.findByIdAndUpdate(uid, { name, career, experience, skills }, { returnDocument: 'after' });

        if (!userUpdated) {
            return resp.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }

        resp.json({ ok: true, message: 'Perfil actualizado con exito', user: userUpdated });

    } catch (error) {
        console.log("ERROR EN UPDATE:", error);
        resp.status(500).json({ ok: false, message: 'Error al actualizar usuario' });
    }
}

const deleteUser = async (req, resp) => {
    try {
        const uid = req.uid;
        await User.findByIdAndDelete(uid);

        resp.json({ ok: true, message: 'Usuario eliminado correctamente de VUKO.ai' });

    } catch (error) {
        resp.status(500).json({ ok: false, message: 'Error al eliminar usuario' });
    }
}

const getVukoAdvice = async (req, resp) => {
    try {
        const uid = req.uid;

        const user = await User.findById(uid);
        if (!user) {
            return resp.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }

        const aiAdvice = await getCareerAdvice(user);

        resp.status(200).json({
            ok: true,
            message: aiAdvice,

        });

    } catch (error) {
        console.log("Error en getVukoAdvice:", error);
        resp.status(500).json({
            ok: false,
            message: 'No se pudo generar el consejo'
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
