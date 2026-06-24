import { getImageByDate, getImageOfTheDay } from "./js/service.js";

const apodContent = document.getElementById("apod-content");
const btnSearch = document.getElementById("btn-search");

btnSearch.addEventListener("click", async () => {
    const date = document.getElementById("apod-date").value;
    const today = new Date().toISOString().split("T")[0];

    if (date > today) {
        alert("La fecha no puede ser mayor a hoy.");
        return;
    }

    const data = await getImageByDate(date);
    renderApodByDate(data);
});

const data = await getImageOfTheDay();
renderApod(data);

function renderApod(data) {

    const media =
        data.media_type === "image"
            ? `<img
                src="${data.url}"
                alt="${data.title}"
                class="responsive-img"
              >`
            : `<video
                src="${data.url}"
                controls
                style="max-width: 100%; max-height: 500px;"
                class="responsive-video"
              ></video>`;

    apodContent.innerHTML = `
        <h2>${data.title}</h2>

        <p class="date-text">
            Fecha: ${data.date}
        </p>

        <div>
            ${media}
        </div>

        <div class="actions">
            <button id="btn-favorite" class="btn-fav">
                ⭐ Guardar en Favoritos
            </button>
        </div>

        <div class="apod-description">
            <h3>Explicación Científica</h3>
            <p>${data.explanation}</p>
        </div>
    `;
}

function renderApodByDate(data) {

    apodContent.innerHTML = `
        <div class="card border-primary shadow">

            <div class="card-header bg-primary text-white">
                <h3 class="mb-0">Imagen Histórica de la NASA</h3>
            </div>

            <div class="card-body">

                <div class="text-center mb-3">
                    <span class="badge bg-dark fs-6">
                        ${data.date}
                    </span>
                </div>

                <h2 class="text-center mb-4">
                    ${data.title}
                </h2>

                <img
                    src="${data.url}"
                    alt="${data.title}"
                    class="img-fluid rounded shadow-sm mb-4"
                >

                <div class="alert alert-info">
                    <h5>Explicación</h5>
                    <p class="mb-0">
                        ${data.explanation}
                    </p>
                </div>

                <div class="text-center mt-3">
                    <button
                        id="btn-favorite"
                        class="btn btn-success"
                    >
                        ⭐ Agregar a Favoritos
                    </button>
                </div>

            </div>
        </div>
    `;
}