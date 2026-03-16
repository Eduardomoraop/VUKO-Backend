const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    experience: { type: String, default: 0 },
    skills: [{ type: String }],
    role: { type: String, enum: ['candidate', 'recruiter'], default: 'candidate' }
}, { timestamps: true });

// Bloque de seguridad actualizado
UserSchema.pre('save', async function() {   
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);        
    } catch (error) {
        throw new Error('Error al hashear la contraseña');
    }
});

module.exports = mongoose.model('User', UserSchema);