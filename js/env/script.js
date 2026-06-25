import { getImageByDate } from "./service.js";

export let apodActual = null;

export function setApodActual(data) {
    apodActual = data;
}

let hoy = new Date().toISOString().split("T")[0];
let boton = document.getElementById("btn-search");
let boton2 = document.getElementById("btn-today");
const error = document.getElementById("error-message");

if (document.getElementById("apod-date")) {
    document.getElementById("apod-date").max = hoy;
}

if (boton) {
    boton.addEventListener("click", function() {
        let fecha = document.getElementById("apod-date").value;

        if (fecha === "") {
            if (error) error.textContent = "Por favor selecciona una fecha";
            return;
        }

        if (fecha > hoy) {
            if (error) error.textContent = "No puedes seleccionar una fecha futura";
            return;
        }
        
        if (error) error.textContent = "";
    });
}

if (boton2) {
    boton2.addEventListener("click", function(){
        document.getElementById("apod-date").value = hoy;
    });
}

document.addEventListener("click", function (event) {
    if (event.target && event.target.id === "btn-favorite") {
        guardarFavorito();
    }
});

function guardarFavorito() {
    if (!apodActual) {
        alert("No hay información cargada para guardar.");
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const existe = favoritos.some(function (item){
        return item.date === apodActual.date;
    });

    if (!existe) {
        favoritos.push(apodActual);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        cargarFavoritos();
        alert("🚀 ¡Guardado en favoritos!");
    } else {
        alert("Esta imagen ya está en tus favoritos.");
    }
}

export function cargarFavoritos() {
    const lista = document.getElementById("favorites-list");
    if (!lista) return;
    lista.innerHTML = "";
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    
    favoritos.forEach(function(apod) {
        const li = document.createElement("li");
        li.textContent = `${apod.date} - ${apod.title}`;
        
        li.addEventListener("click", function() {
            mostrarAPOD(apod);
            apodActual = apod;
            document.getElementById("apod-date").value = apod.date;
        });
        lista.appendChild(li);
    });
}

export function mostrarAPOD(data) {
    if (!data) return;

    document.getElementById("apod-title").textContent = data.title;
    document.getElementById("apod-date-display").textContent = `Fecha: ${data.date}`;
    document.getElementById("apod-explanation").textContent = data.explanation;

    const mediaContainer = document.getElementById("apod-media");
    
    const mediaHtml = data.media_type === "image" 
        ? `<img src="${data.url}" alt="${data.title}" class="responsive-img">`
        : `<iframe src="${data.url}" frameborder="0" allowfullscreen class="responsive-video"></iframe>`;
    
    mediaContainer.innerHTML = mediaHtml;
}

cargarFavoritos();
