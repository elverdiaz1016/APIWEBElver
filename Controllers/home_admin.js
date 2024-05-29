import { observador, logout, auth, User_Register } from "./global.js"; 

observador();

const cerrar = document.getElementById('btnlogout');
const addUserButton = document.getElementById("addUserButton"); 
const mostrar = document.getElementById("mostrar_usuario");

async function sesion() {
    const validar = logout();
    const verificar = await validar
    .then((verificar) => {
        alert('Sesión cerrada');
        window.location.href = '../index.html';
    }).catch((error) => {
        alert('Sesión no cerrada');
    });
}

document.addEventListener('DOMContentLoaded', function() {
  const deleteButton = document.getElementById('deleteAccount');

  if (deleteButton) {
      deleteButton.addEventListener('click', function() {
          // Confirmación de eliminación de cuenta
          const confirmation = confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.');

          // Si el usuario confirma que quiere eliminar su cuenta
          if (confirmation) {
              const user = auth.currentUser;

              // Eliminar el usuario
              user.delete()
                  .then(() => {
                      // Si la eliminación es exitosa, redirigir al usuario a la página de inicio de sesión o a otra página relevante
                      alert('¡Tu cuenta ha sido eliminada correctamente!');
                      window.location.href = '../index.html';
                  })
                  .catch((error) => {
                      // Manejar errores
                      console.error('Error al eliminar la cuenta:', error);
                      alert('Hubo un error al intentar eliminar tu cuenta. Por favor, inténtalo de nuevo más tarde.');
                  });
          }
      });
  }
});

async function addUser() {
    const cedula = document.getElementById("newUserCedula").value;
    const fullname = document.getElementById("newUserFullname").value;
    const birthdate = document.getElementById("newUserBirthdate").value;
    const address = document.getElementById("newUserAddress").value;
    const phone = document.getElementById("newUserPhone").value;
    const email = document.getElementById("newUserEmail").value;
    const password = document.getElementById("newUserPassword").value;

    if (email.trim() === '' || password.trim() === '') {
        alert('Por favor, completa todos los campos.');
        return; 
    }

    try {
        const user = await User_Register(cedula, fullname, birthdate, address, phone, email, password);
        alert('Usuario agregado exitosamente: ' + email);

        // Vaciar los campos del formulario después de agregar el usuario
        document.getElementById("newUserCedula").value = '';
        document.getElementById("newUserFullname").value = '';
        document.getElementById("newUserBirthdate").value = '';
        document.getElementById("newUserAddress").value = '';
        document.getElementById("newUserPhone").value = '';
        document.getElementById("newUserEmail").value = '';
        document.getElementById("newUserPassword").value = '';

    } catch (error) {
        console.error(error);
        alert('Error al agregar el usuario.');
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    cerrar.addEventListener('click', sesion);
    addUserButton.addEventListener('click', addUser); 
});
