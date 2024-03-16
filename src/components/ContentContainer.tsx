"use client";
import { useEffect, useState } from "react";
import { DigimonData } from "@/types/interfaces";
import DigimonCard from "@/components/DigimonCard";
import SearchBar from "./SearchBar";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface IProps {
  data: DigimonData[];
}

export function ContentContainer({ data }: IProps) {
  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<string>("Todos");
  const [digimons, setDigimons] = useState<DigimonData[]>([]);
  const [filteredDigimons, setFilteredDigimons] = useState<DigimonData[]>([]);

  const [selectedDigimon, setSelectedDigimon] = useState<DigimonData | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<boolean>(false);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
    <>
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
                            onClick={() => {
                              setSelectedDigimon(digimon);
                              openModal();
                              console.log(digimon);
                            }}
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
                            onClick={() => {
                              setSelectedDigimon(digimon);
                              openModal();
                              console.log(digimon);
                            }}
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
                              onClick={() => {
                                setSelectedDigimon(digimon);
                                openModal();
                                console.log(digimon);
                              }}
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
                                onClick={() => {
                                  setSelectedDigimon(digimon);
                                  openModal();
                                  console.log(digimon);
                                }}
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <DigimonCard
                      name={selectedDigimon?.name ?? "Digimon"}
                      imgUrl={selectedDigimon?.img ?? "/imgs/404.png"}
                      level={selectedDigimon?.level ?? "Desconhecido"}
                    />
                  </Dialog.Title>

                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Fechar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
