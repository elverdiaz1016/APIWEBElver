import {observador, logout, auth} from "../Controllers/global.js";

observador()
const cerrar=document.getElementById('btnlogout')

async function sesion(){
    const validar=logout()
    const verificar=await validar
    .then((verificar) => {
        alert('sesion cerrada')
        window.location.href='../index.html'
      }).catch((error) => {
        alert('Sesion no cerrada')
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

window.addEventListener('DOMContentLoaded', async () => {
    cerrar.addEventListener('click',sesion)
});