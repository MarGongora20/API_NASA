let apodActual= null;

let hoy = new Date().toISOString().split("T")[0]
let boton = document.getElementById("btn-search")
let boton2 = document.getElementById("btn-today")


document.getElementById("apod-date").max = hoy

boton.addEventListener("click", function() {
    let fecha = document.getElementById("apod-date").value

    if (fecha === "") {
        error.textContent = "Por favor selecciona una fecha"
        return
    }

    if (fecha > hoy) {
        error.textContent = "No puedes seleccionar una fecha futura"
        return
    }
    
    error.textContent = ""
})

boton2.addEventListener("click", function(){
    document.getElementById("apod-date").value = hoy
})



const favorito = document.getElementById("btn-favorite");
favorito.addEventListener("click", guardarFavorito);

function guardarFavorito() {
    if (!apodActual) {
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
        alert("Guardado en favoritos");
    }
}

function cargarFavoritos() {
    const lista = document.getElementById("favorites-list");
    lista.innerHTML = "";
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    
    favoritos.forEach(function(apod) {
        const li = document.createElement("li");
        li.textContent = `${apod.date} - ${apod.title}`;
        li.addEventListener("click", function() {
            mostrarAPOD(apod);
            apodActual = apod;
        });
        lista.appendChild(li);
    });
}

cargarFavoritos();

