let apodActual= null;

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