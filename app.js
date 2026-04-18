import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const db = getFirestore(app);

let contactos = [];

// 🔹 ESPERAR A QUE CARGUE TODO
document.addEventListener("DOMContentLoaded", () => {

  // BOTONES
  const btnRegistro = document.getElementById("btnRegistro");
  const btnAdmin = document.getElementById("btnAdmin");

  btnRegistro.addEventListener("click", () => {
    mostrarSeccion("registro");
  });

  btnAdmin.addEventListener("click", () => {
    mostrarSeccion("admin");
  });

  // FORMULARIO
  const form = document.getElementById("formulario");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contacto = {
      nombre: document.getElementById("nombre").value,
      telefono: document.getElementById("telefono").value,
      correo: document.getElementById("correo").value,
      direccion: document.getElementById("direccion").value
    };

    await addDoc(collection(db, "contactos"), contacto);

    form.reset();
    cargarContactos();
    alert("Contacto guardado");
  });

  // BUSCADOR
  document.getElementById("busqueda").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    const filtrados = contactos.filter(c =>
      c.nombre.toLowerCase().includes(texto)
    );

    mostrarContactos(filtrados);
  });

  cargarContactos();
});

// 🔹 CAMBIAR SECCIÓN
function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(sec => {
    sec.classList.remove("activa");
  });

  document.getElementById(id).classList.add("activa");
}

// 🔹 CARGAR
async function cargarContactos() {
  const snapshot = await getDocs(collection(db, "contactos"));

  contactos = [];

  snapshot.forEach(docu => {
    contactos.push({ id: docu.id, ...docu.data() });
  });

  mostrarContactos(contactos);
}

// 🔹 MOSTRAR
function mostrarContactos(lista) {
  const cont = document.getElementById("lista");
  cont.innerHTML = "";

  lista.forEach(c => {
    const div = document.createElement("div");
    div.className = "contacto";

    div.innerHTML = `
      <strong>${c.nombre}</strong><br>
      ${c.telefono}<br>
      ${c.correo}<br>
      ${c.direccion}<br>
      <button data-id="${c.id}" class="editar">Editar</button>
      <button data-id="${c.id}" class="eliminar">Eliminar</button>
    `;

    cont.appendChild(div);
  });

  // EVENTOS EDITAR Y ELIMINAR
  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", async () => {
      await deleteDoc(doc(db, "contactos", btn.dataset.id));
      cargarContactos();
    });
  });

  document.querySelectorAll(".editar").forEach(btn => {
    btn.addEventListener("click", async () => {

      const nuevoNombre = prompt("Nuevo nombre:");
      const nuevoTelefono = prompt("Nuevo teléfono:");
      const nuevoCorreo = prompt("Nuevo correo:");
      const nuevaDireccion = prompt("Nueva dirección:");

      await updateDoc(doc(db, "contactos", btn.dataset.id), {
        nombre: nuevoNombre,
        telefono: nuevoTelefono,
        correo: nuevoCorreo,
        direccion: nuevaDireccion
      });

      cargarContactos();
    });
  });
}