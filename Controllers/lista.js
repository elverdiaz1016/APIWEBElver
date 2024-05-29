import { collection, getDocs, doc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { db } from '/Controllers/global.js';

async function getUserList() {
    const userCollection = collection(db, 'users');
    const userSnapshot = await getDocs(userCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return userList;
}

function createUserElement(user) {
    const userElement = document.createElement('div');
    userElement.className = 'user-element';

    const cedulaElement = document.createElement('div');
    cedulaElement.textContent = `Cédula: ${user.cedula}`;
    userElement.appendChild(cedulaElement);

    const fechaNacimientoElement = document.createElement('div');
    fechaNacimientoElement.textContent = `Fecha de Nacimiento: ${user.fecha_nacimiento}`;
    userElement.appendChild(fechaNacimientoElement);

    const direccionElement = document.createElement('div');
    direccionElement.textContent = `Dirección: ${user.direccion}`;
    userElement.appendChild(direccionElement);

    const telefonoElement = document.createElement('div');
    telefonoElement.textContent = `Teléfono: ${user.celular}`;
    userElement.appendChild(telefonoElement);

    // Botón de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = () => editUser(user);
    userElement.appendChild(editButton);

    // Botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.onclick = () => deleteUser(user.id, userElement);
    userElement.appendChild(deleteButton);

    return userElement;
}

async function deleteUser(userId, userElement) {
    try {
        await deleteDoc(doc(db, 'users', userId));
        userElement.remove();
        alert('Usuario eliminado con éxito.');
    } catch (error) {
        console.error('Error eliminando el usuario: ', error);
        alert('Error eliminando el usuario.');
    }
}

function editUser(user) {
    const newCedula = prompt('Ingrese la nueva cédula:', user.cedula);
    const newFechaNacimiento = prompt('Ingrese la nueva fecha de nacimiento:', user.fecha_nacimiento);
    const newDireccion = prompt('Ingrese la nueva dirección:', user.direccion);
    const newCelular = prompt('Ingrese el nuevo teléfono:', user.celular);

    if (newCedula && newFechaNacimiento && newDireccion && newCelular) {
        updateUser(user.id, {
            cedula: newCedula,
            fecha_nacimiento: newFechaNacimiento,
            direccion: newDireccion,
            celular: newCelular
        });
    } else {
        alert('Todos los campos son obligatorios.');
    }
}

async function updateUser(userId, updatedData) {
    try {
        const userDoc = doc(db, 'users', userId);
        await updateDoc(userDoc, updatedData);
        alert('Usuario actualizado con éxito.');
        location.reload(); // Recargar la página para mostrar los cambios
    } catch (error) {
        console.error('Error actualizando el usuario: ', error);
        alert('Error actualizando el usuario.');
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const userList = await getUserList();
    const userContainer = document.getElementById('userList');
    userList.forEach(user => {
        const userElement = createUserElement(user);
        userContainer.appendChild(userElement);
    });
});
