const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
  },
  correo: {
    type: DataTypes.STRING,
    unique: true,
  },
  contraseña: {
    type: DataTypes.STRING,
  },
});

module.exports = Usuario;