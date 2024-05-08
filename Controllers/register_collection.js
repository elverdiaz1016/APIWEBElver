import { AddData } from "../Controllers/global.js";

const registro = document.getElementById('btnreg')

async function register() {
    const name = document.getElementById("edtname").value;
    const apellido= document.getElementById("edtapellido").value;
    const fecha= document.getElementById("edtdate").value;

    const verificar = AddData(name, apellido, fecha);
        const validation = await verificar;
    
    if (validation != null) {
        
        alert ('register sucessfull '+name)
        window.location.href= 'regCollection.html'
    } else {
        alert('Error: Register no sucessfull.');
        console.log('Sesión ' + nombre + ' no validada.');
    }
    


    
}
window.addEventListener('DOMContentLoaded', async () => {
    registro.addEventListener('click', register);
});
