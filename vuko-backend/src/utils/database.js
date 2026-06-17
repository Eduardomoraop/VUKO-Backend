const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ VUKO.ai conectado a la DB: ${db.connection.name}`);
  } catch (error) {
    console.error('❌ Error en la conexión:', error.message);
    process.exit(1);
  }
};


module.exports = connectDB;