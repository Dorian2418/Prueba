const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('APP', 'sa', '123456789qwe', {
  host: 'localhost', // Cambia esto si tu base de datos está en un servidor remoto
  dialect: 'mssql',
  define: {
    timestamps: false, // Si no necesitas timestamps en tus modelos
  },
});

module.exports = sequelize;