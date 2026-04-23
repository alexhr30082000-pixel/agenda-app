import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

  // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyDAtV-CYy3y5gUFD7ZCwy6Gg4QjE69BRNg",
  authDomain: "contactos-94dcc.firebaseapp.com",
  projectId: "contactos-94dcc",
  storageBucket: "contactos-94dcc.firebasestorage.app",
  messagingSenderId: "406550694941",
  appId: "1:406550694941:web:2a185d4d89749b2f134af4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// REGISTRO
window.registrar = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Usuario registrado correctamente");
    window.location.href = "index.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
};

// LOGIN
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login exitoso");
    window.location.href = "agenda.html"; // redirige al CRUD
  } catch (error) {
    alert("Error: " + error.message);
  }
};