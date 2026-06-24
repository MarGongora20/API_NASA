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