const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar variables del archivo .env

// Crear conexión con Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Opcional: Ocultar logs en consola
    }
);

// Verificar conexión
sequelize.authenticate()
    .then(() => console.log('✅ Conexión a la base de datos establecida correctamente.'))
    .catch(err => console.error('❌ Error al conectar con la base de datos:', err));

module.exports = sequelize;
