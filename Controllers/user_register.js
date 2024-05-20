import { User_Register, everification } from "../Controllers/global.js";


const agregar = document.getElementById('btnadd')


async function registrar() {
    const cedula = document.getElementById("cedula").value;
    const nombre_completo = document.getElementById("nombre").value;
    const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    const direccion = document.getElementById("direccion").value;
    const celular = document.getElementById("celular").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirmemail").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;


    if (!cedula || !nombre_completo || !fecha_nacimiento || !direccion || !celular || !email || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }


    if (email !== confirmEmail) {
        alert('Los emails no coinciden.');
        return;
    }

    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');
        return;
    }

    const verificar = User_Register(cedula, nombre_completo, fecha_nacimiento, direccion, celular, email, password);
    const validation = await verificar;

    if (validation != null) {
        everification();
        alert('Usuario Registrado ' + email);
        window.location.href = '../index.html';
    } else {
        alert('Error: No se pudo registrar');
        console.log('Sesión ' + email + ' no validada.');
    }
}




window.addEventListener('DOMContentLoaded', async () => {
    agregar.addEventListener('click', registrar);
});