import { User_Register, everification } from "../Controllers/global.js";


const agregar = document.getElementById('btnadd')

async function registrar()
{
    const email = document.getElementById("edtusername").value;
    const pass= document.getElementById("edtpassword").value;


    if (email.trim() === '' || pass.trim() === '') {
        alert('Por favor, completa todos los campos.');
        return; 
    }

    const verificar = User_Register(email, pass);
    const validation = await verificar;
    // const esperar = await ;

    if (validation != null) {
        everification()
        alert('Register sucessfull: ' + email);
        window.location.href = '../index.html';
    } else {
        alert('Error: Register no sucessfull.');
        console.log('Sesión ' + email + ' no validada.');
    }
}


window.addEventListener('DOMContentLoaded', async () => {
    agregar.addEventListener('click', registrar);
});
