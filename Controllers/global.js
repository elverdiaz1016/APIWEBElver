// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js';

import { 
  getFirestore,
  collection, 
  addDoc,
  
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js'

import { 
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  sendPasswordResetEmail
 } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyADakIX3iZLkwNQKixN31dUI3B9MqDPg8k",
  authDomain: "apiweb2024-881f4.firebaseapp.com",
  projectId: "apiweb2024-881f4",
  storageBucket: "apiweb2024-881f4.appspot.com",
  messagingSenderId: "511632820085",
  appId: "1:511632820085:web:8b33dffe81d4f5547f353c",
  measurementId: "G-ZPKYXXVFXJ"
};
//facebook
export const facebookProvider = new FacebookAuthProvider();
//Google
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const analytics = getAnalytics();
export const auth = getAuth(app)

document.addEventListener('DOMContentLoaded', function() {
  const Login = document.getElementById('Login');
  if (Login) {
      Login.addEventListener('click', function(e) {
        signInWithRedirect(auth, googleProvider);

        getRedirectResult(auth)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
      
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
      });
  }
});

// Metod de inicio de sesion
export const loginvalidation = async (email, password) => {
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Si las credenciales corresponden a la cuenta de administrador, no verificar el correo electrónico
      if (email === 'admin@gmail.com' && password === '123456789') {
          return user;
      } else if (user.emailVerified) {
          return user;
      } else {
          throw new Error('Email not verified');
      }
  } catch (error) {
      console.error(error);
      throw error; // Lanza el error para que pueda ser capturado en validar()
  }
}




export const everification= ()=> 
sendEmailVerification(auth.currentUser)//datos de autenticacion



export const logout=()=>signOut(auth)



export const User_Register = (cedula, nombre_completo, fecha_nacimiento, direccion, celular, email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      return addDoc(collection(db, "users"), {
        cedula,
        nombre_completo,
        fecha_nacimiento,
        direccion,
        celular,
        email
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  
      // ..
    });



export const signInWithGoogle = () => 
    signInWithPopup(auth, googleProvider);

export const signInWithFacebook = () => 
    signInWithPopup(auth, facebookProvider);

export const recoverPassword = (email) => 
    sendPasswordResetEmail(auth, email);


export function observador(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid)
    } else {
      window.location.href='../index.html'
    }
  });
  
}

export async function mostrarUsuarios() {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  const userCollection = collection(db, 'users');
  const userSnapshot = await getDocs(userCollection);
  userSnapshot.docs.forEach((doc) => {
    const userData = doc.data();
    const li = document.createElement('li');
    li.textContent = `Cédula: ${userData.cedula}, Nombre: ${userData.nombre_completo}, Fecha de Nacimiento: ${userData.fecha_nacimiento}, Dirección: ${userData.direccion}, Celular: ${userData.celular}, Email: ${userData.email}`;
    userList.appendChild(li);
  });
}

export {db}; 