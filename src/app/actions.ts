"use server";

export async function getDigimons() {
    const response = await fetch("https://digimon-api.vercel.app/api/digimon");
   
    return response.json();
    }

