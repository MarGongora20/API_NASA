import { ENV } from "./config.js";

export async function getImageOfTheDay() {
    try {
        const response = await fetch(`${ENV.BASE_URL}?api_key=${ENV.API_KEY}`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo imagen de NASA:", error);
        throw error;
    }
}

export async function getImageByDate(date) {
    try {
        const response = await fetch(`${ENV.BASE_URL}?api_key=${ENV.API_KEY}&date=${date}`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error obteniendo imagen para la fecha ${date}:`, error);
        throw error;
    }
}

