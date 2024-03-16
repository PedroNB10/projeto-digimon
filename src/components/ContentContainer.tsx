"use client";
import { useEffect, useState } from "react";
import { DigimonData } from "@/types/interfaces";
import DigimonCard from "@/components/DigimonCard";
import SearchBar from "./SearchBar";
import Image from "next/image";

interface IProps {
  data: DigimonData[];
}

export function ContentContainer({ data }: IProps) {
  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<string>("Todos");
  const [digimons, setDigimons] = useState<DigimonData[]>([]);
  const [filteredDigimons, setFilteredDigimons] = useState<DigimonData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    setDigimons(data);
  }, [data]);

  useEffect(() => {
    setFilteredDigimons([]);
    if (name) {
      const filteredData = digimons.filter((digimon) => {
        if (level !== "Todos") {
          return (
            digimon.name.toLowerCase().includes(name.toLowerCase()) &&
            digimon.name[0].toLocaleLowerCase() ===
              name[0].toLocaleLowerCase() &&
            digimon.level === level
          );
        } else {
          return (
            digimon.name.toLowerCase().includes(name.toLowerCase()) &&
            digimon.name[0].toLocaleLowerCase() === name[0].toLocaleLowerCase()
          );
        }
      });

      setFilteredDigimons(filteredData);
      setLoading(false);
      return;
    } else {
      if (level === "Todos") {
        setFilteredDigimons(digimons);
        setLoading(false);
        return;
      }

      const filteredData = digimons.filter((digimon) => {
        if (level === digimon.level) {
          return digimon;
        }
      });

      setFilteredDigimons(filteredData);
      setLoading(false);
    }
  }, [level, name, digimons, showMore]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <SearchBar setName={setName} setLevel={setLevel} />

      {loading ? (
        <>
          <div
            className="inline-block h-20 w-20 my-44 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          ></div>
        </>
      ) : (
        <>
          {filteredDigimons.length === 0 ? (
            <>
              <h1 className="text-3xl font-bold text-red-900 text-center">
                Nenhum digimon com esse nome foi encontrado :(
              </h1>

              <div className="w-full h-96 flex items-center justify-center">
                <Image
                  src={"/imgs/Culumon_triste.gif"}
                  alt="404"
                  height={300}
                  width={300}
                  className="w-auto h-auto"
                  unoptimized
                />
              </div>
            </>
          ) : (
            <>
              <ul className="flex flex-wrap lg:grid lg:grid-cols-3 gap-5 mx-auto px-4 items-center justify-center ">
                {filteredDigimons.map((digimon, index) => {
                  if (showMore) {
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
                  } else {
                    if (index < 3) {
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
                          <>
                            <DigimonCard
                              key={digimon.name}
                              name={digimon.name}
                              imgUrl={digimon.img}
                              level={digimon.level}
                            />
                          </>
                        );
                      }
                    }
                  }
                })}
              </ul>
              {!showMore && filteredDigimons.length > 3 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md "
                >
                  Mostrar Mais
                </button>
              )}

              {showMore && filteredDigimons.length > 3 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="bg-red-900 text-white px-4 py-2 rounded-md fixed -translate-x-1/2 left-1/2 bottom-10"
                >
                  Mostrar Menos
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
