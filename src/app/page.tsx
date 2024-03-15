"use client";
import { useEffect } from "react";
import { DigimonData } from "./types/interfaces";

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://digimon-api.vercel.app/api/digimon"
      );
      console.log(response.status);
      const data: DigimonData[] = await response.json();
    }

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
