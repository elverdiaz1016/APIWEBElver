import {loginvalidation, signInWithGoogle, signInWithFacebook, recoverPassword} from "../Controllers/global.js";


const loginin = document.getElementById("login-btn");
const eventGoogle =  document.getElementById("googleLogin")
const eventFacebook = document.getElementById("facebookLogin")
const eventRecover = document.getElementById("btnRecover")

async function validar() {
    const email = document.getElementById("edtusername").value;
    const pass = document.getElementById("edtpassword").value;

    if (email.trim() === '' || pass.trim() === '') {
        alert('Por favor, completa todos los campos.');
        return; 
    }

    try {
        const validation = await loginvalidation(email, pass);
        if (email === 'admin@gmail.com' && pass === '123456789') {
            // Si las credenciales corresponden a la cuenta de administrador
            alert('Autenticación exitosa para: ' + email);
            window.location.href = '../Templates/home_admin.html';
        } else {
            // Si las credenciales corresponden a una cuenta de usuario normal
            alert('Autenticación exitosa para: ' + email);
            window.location.href = '../Templates/home.html';
        }
    } catch (error) {
        if (error.message === 'Email not verified') {
            alert('Por favor, verifica tu email antes de iniciar sesión.');
        } else {
            alert('Error: autenticación fallida.');
            console.log('Sesión ' + email + ' no validada.');
        }
    }
}






async function validarFacebook(){
    const verificar = signInWithFacebook()
    const validation = await verificar 

    if(verificar != null){
        alert("User sucessfull with Facebook")
        window.location.href = "../Templates/home.html"
    }else{
        console.log("Error: Validation Facebook")
        alert("Intente Nuevamente...")
    }
}


 
async function validarGoogle(){
    const verificar = signInWithGoogle()
    const validation = await verificar 

    if(verificar != null){
        alert("User sucessfull with Google")
        window.location.href = "../Templates/home.html"
    }else{
        console.log("Error: Validation Google")
        alert("Intente Nuevamente...")
    }
}
async function Recover(){
    const email = document.getElementById('emailRecovery').value
    if (!email) {
        document.getElementById('error-message').textContent = 'Ingrese todos los datos';
        return;
    }
    try {
        await recoverPassword(email)
        alert("Se ha enviado un correo electrónico para restablecer tu contraseña a " + email)
    } catch (error) {
        console.log(error)
        alert("Error al enviar el correo electrónico de recuperación de contraseña")
    }
}

document.addEventListener('DOMContentLoaded', async => {
    loginin.addEventListener('click', validar)
    eventGoogle.addEventListener('click', validarGoogle)
    eventFacebook.addEventListener('click', validarFacebook)
    if (eventRecover != null) {
        eventRecover.addEventListener('click', Recover)
    }
})
window.addEventListener('DOMContentLoaded', async () => {
    eventRecover.addEventListener('click', Recover);
});
