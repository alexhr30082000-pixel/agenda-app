import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// CONFIG FIREBASE (pon la tuya)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO",
  projectId: "TU_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// REGISTRO
document.getElementById("btnRegister").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("mensaje").textContent = "Usuario creado ✅";
    })
    .catch(error => {
      document.getElementById("mensaje").textContent = error.message;
    });
});

// LOGIN
document.getElementById("btnLogin").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "agenda.html"; // 🔥 REDIRECCIÓN
    })
    .catch(error => {
      document.getElementById("mensaje").textContent = "Error: " + error.message;
    });
});