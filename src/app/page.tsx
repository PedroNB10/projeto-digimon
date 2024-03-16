import { getDigimons } from "./actions";
import { DigimonData } from "@/types/interfaces";
import { ContentContainer } from "@/components/ContentContainer";

export default async function Home() {
  const data: DigimonData[] = await getDigimons();
  console.log(data);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <ContentContainer data={data} />
    </main>
  );
}
