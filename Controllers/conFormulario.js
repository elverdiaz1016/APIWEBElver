import { loginvalidation } from "../Controllers/global.js";

const caja = document.getElementById("Form");

caja.addEventListener('submit',(e) => {
    
    const email = caja["edtusername"].value;
    const pass = caja["edtpassword"].value;
    
    const verificar = loginvalidation(email, pass);
    //const validation = await verificar;
    if (validation != null) {
        alert('Autenticación exitosa para: ' + email);
        window.location.href = '../Templates/home.html';
    } else {
        alert('Error: autenticación fallida.');
        console.log('Sesión ' + email + ' no validada.');
    }

});
// {


//     if (email.trim() === '' || pass.trim() === '') {
//         alert('Por favor, completa todos los campos.');
//         return; 
//     }

//     const verificar = loginvalidation(email, pass);
//     const validation = await verificar;

//     if (validation != null) {
//         alert('Autenticación exitosa para: ' + email);
//         window.location.href = '../Templates/home.html';
//     } else {
//         alert('Error: autenticación fallida.');
//         console.log('Sesión ' + email + ' no validada.');
//     }
// }
// caja.addEventListener('DOMContentLoaded', async () => {
//     loginin.addEventListener('click', validar);
// });
