"use client";
import { useEffect, useState } from "react";
import { DigimonData } from "@/types/interfaces";
import DigimonCard from "@/components/DigimonCard";

interface IProps {
  data: DigimonData[];
}

export function SearchBar({ data }: IProps) {
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
        return digimon.name.toLowerCase().includes(name.toLowerCase());
      });

      setFilteredDigimons(filteredData);
      return;
    } else {
      setFilteredDigimons(digimons);
    }
  }, [level, name, digimons]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-24 ">
      <div className="flex flex-wrap gap-4 justify-center">
        <input
          className="p-4  border-red-400 border-2"
          type="text"
          placeholder="Pesquise pelo Digimon "
          onChange={(e) => {
            //.log(e.target.value);
            setName(e.target.value);
          }}
        />

        <select
          name=""
          id=""
          className="px-4 py-5"
          onChange={(e) => {
            //console.log(e.target.value);
            // console.log(digimons);
            setLevel(e.target.value);
          }}
        >
          <option value="Todos">Todos</option>
          <option value="Rookie">Rookie</option>
          <option value="Champion">Champion</option>
          <option value="Ultimate">Ultimate</option>
          <option value="Mega">Mega</option>
          <option value="Training">Training</option>
          <option value="In Training">In Training</option>
          <option value="Fresh">Fresh</option>
          <option value="Armor">Armor</option>
        </select>
      </div>

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
