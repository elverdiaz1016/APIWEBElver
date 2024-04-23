// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';

import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics();
export const auth = getAuth(app)

// Metod de inicio de sesion
export const loginvalidation=(email, password)=>
signInWithEmailAndPassword(auth, email, password)


export const everification= ()=> 
sendEmailVerification(auth.currentUser)//datos de autenticacion



export const logout=()=>signOut(auth)



export const User_Register= (email,password)=>
createUserWithEmailAndPassword(auth,email,password)


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
