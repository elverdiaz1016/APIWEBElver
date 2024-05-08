import { User_Register, everification } from "../Controllers/global.js";


const agregar = document.getElementById('btnadd')

function validarContraseña(contraseña) {
    // Debe contener al menos un número
    const tieneNumero = /\d/.test(contraseña);
    // Debe contener al menos una letra mayúscula
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    // Debe contener al menos un carácter especial
    const tieneCaracterEspecial = /[!@#$%^&*]/.test(contraseña);
    // Debe tener al menos 8 caracteres de longitud
    const tieneLongitudValida = contraseña.length >= 8;

    return tieneNumero && tieneMayuscula && tieneCaracterEspecial && tieneLongitudValida;
}

async function registrar()
{
    if (window.verificar  === true) {
    const email = document.getElementById("edtusername").value;
    const pass= document.getElementById("edtpassword").value;


    if (!validarContraseña(contraseñaInput)) {
        alert("La contraseña debe contener al menos un número, una letra mayúscula, un carácter especial como (!@#$%^&*) y tener al menos 8 caracteres de longitud.");
        return;
    }
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
}

window.addEventListener('DOMContentLoaded', async () => {
    agregar.addEventListener('click', registrar);
});