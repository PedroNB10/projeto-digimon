import { getDigimons } from "./actions";
import { DigimonData } from "@/types/interfaces";
import { ContentContainer } from "@/components/ContentContainer";
import Image from "next/image";

export default async function Home() {
  const data: DigimonData[] = await getDigimons();
  console.log(data);

  return (
    <>
      <div className="w-screen flex items-center justify-center bg-blue-900 ">
        <header className="max-w-screen-xl bg-blue-900 h-36 flex items-center justify-around  px-10 gap-10">
          {/* <h1 className="text-4xl text-white text-center font-digimon absolute hidden md:relative md:flex animate-typing">
            Seja bem-vindo ao mundo dos Digimons
          </h1> */}
          <div className="flex items-center relative gap-5  justify-start w-full">
            <Image
              src="/imgs/digimon-logo.png"
              alt="digimon"
              width={200}
              height={200}
              className=""
            />
            <h1 className="hidden md:flex animate-typing overflow-hidden font-digimon md:whitespace-nowrap border-r-4 border-r-white pr-5 text-xl text-white font-bold  ">
              Seja bem-vindo ao mundo dos Digimons
            </h1>
          </div>
        </header>
      </div>

      <section className="flex flex-col items-center  py-10  bg-orange-400 ">
        <ContentContainer data={data} />
      </section>
    </>
  );
}
