const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./sequelize'); // Reemplaza con la ubicación de tu archivo sequelize.js
const Usuario = require('./Usuario'); // Reemplaza con la ubicación de tu modelo de usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require ('cors')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta para crear un usuario
app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    const contraseñaHash = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      contraseña: contraseñaHash,
    });
    res.status(201).json({ mensaje: 'Usuario creado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el usuario' });
  }
});

// Eliminar un usuario por su ID
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const usuario = await Usuario.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      await usuario.destroy();
  
      res.json({ mensaje: 'Usuario eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
    }
  });


// Ruta para actualizar un usuario

app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contraseña } = req.body;
  
    try {
      const usuario = await Usuario.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      usuario.nombre = nombre || usuario.nombre;
      usuario.correo = correo || usuario.correo;
      usuario.contraseña = contraseña || usuario.contraseña;
  
      await usuario.save();
  
      res.json({ mensaje: 'Usuario actualizado con éxito' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
    }
  });





// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  const usuario = await Usuario.findOne({ where: { correo } });

  if (!usuario) {
    return res.status(401).json({ mensaje: 'Usuario no encontrado' });
  }

  const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

  if (!contraseñaValida) {
    return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
  }

  const token = jwt.sign({ usuarioId: usuario.id }, 'secreto', { expiresIn: '1h' });

  res.json({ token });
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`La API está escuchando en el puerto ${PORT}`);
  });
});