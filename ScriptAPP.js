document.addEventListener('DOMContentLoaded', () => {
    const formAPP = document.getElementById('formAPP');
    

    // Manejar el envío del formulario para crear un usuario
    formAPP.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(formAPP);

      try {
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Usuario creado con éxito');

          // Actualizar la lista de usuarios después de crear uno
         
        } else {
          alert('Error al crear el usuario');
        }
      } catch (error) {
        console.error(error);
        alert('Error al crear el usuario');
      }
    });

    // Función para obtener y mostrar la lista de usuarios
   
}); 


