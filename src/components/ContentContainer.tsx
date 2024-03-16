"use client";
import { useEffect, useState } from "react";
import { DigimonData } from "@/types/interfaces";
import DigimonCard from "@/components/DigimonCard";
import SearchBar from "./SearchBar";

interface IProps {
  data: DigimonData[];
}

export function ContentContainer({ data }: IProps) {
  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<string>("Todos");
  const [digimons, setDigimons] = useState<DigimonData[]>([]);
  const [filteredDigimons, setFilteredDigimons] = useState<DigimonData[]>([]);

  useEffect(() => {
    setDigimons(data);
  }, [data]);

  useEffect(() => {
    if (name) {
      const filteredData = digimons.filter((digimon) => {
        if (level !== "Todos") {
          return (
            digimon.name.toLowerCase().includes(name.toLowerCase()) &&
            digimon.name[0].toLocaleLowerCase() === name[0].toLocaleLowerCase()
          );
        }
        return (
          digimon.name.toLowerCase().includes(name.toLowerCase()) &&
          digimon.name[0].toLocaleLowerCase() === name[0].toLocaleLowerCase()
        );
      });

      setFilteredDigimons(filteredData);
      return;
    } else {
      setFilteredDigimons(digimons);
    }
  }, [level, name, digimons]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-24 bg-orange-400 ">
      <SearchBar setName={setName} setLevel={setLevel} />

      <ul className="flex flex-wrap lg:grid lg:grid-cols-3 gap-5 mx-auto ">
        {filteredDigimons.map((digimon) => {
          if (level === "Todos") {
            return (
              <DigimonCard
                key={digimon.name}
                name={digimon.name}
                imgUrl={digimon.img}
                level={digimon.level}
              />
            );
          }

          if (digimon.level === level) {
            return (
              <DigimonCard
                key={digimon.name}
                name={digimon.name}
                imgUrl={digimon.img}
                level={digimon.level}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}
